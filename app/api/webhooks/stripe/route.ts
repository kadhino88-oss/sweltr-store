import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { TIERS } from "@/lib/data";
import { createCjOrder, payCjOrder } from "@/lib/cj";

// Nécessaire pour que Stripe puisse vérifier la signature du webhook
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripeClient();

  if (!stripe || !webhookSecret) {
    console.error(
      `Webhook Stripe non configuré : ${!stripe ? "STRIPE_SECRET_KEY manquante" : "STRIPE_WEBHOOK_SECRET manquante"}.`,
    );
    return NextResponse.json({ error: "Webhook Stripe non configuré." }, { status: 503 });
  }

  if (!sig) {
    return NextResponse.json({ error: "Signature Stripe manquante." }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Signature webhook Stripe invalide :", getStripeErrorDetails(err));
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // On récupère la session complète pour avoir l'adresse de livraison
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["customer_details"],
    });

    const tierId = fullSession.metadata?.tierId;
    const tier = TIERS.find((t) => t.id === tierId);

    if (!tier) {
      console.error(`Kit inconnu pour la session ${session.id} (tierId: ${tierId})`);
      return NextResponse.json({ received: true });
    }

    if (!tier.cjItems || tier.cjItems.length === 0) {
      console.error(
        `Aucun produit CJ configuré pour le kit "${tier.name}". Remplis cjItems dans lib/data.ts. Commande Stripe ${session.id} NON transmise à CJ — traite-la manuellement.`
      );
      return NextResponse.json({ received: true });
    }

    const shipping = (fullSession as any).shipping_details || (fullSession as any).shipping;
    const address = shipping?.address;
    const customer = fullSession.customer_details;

    if (!address) {
      console.error(`Pas d'adresse de livraison pour la session ${session.id}.`);
      return NextResponse.json({ received: true });
    }

    const countryCode = address.country as string;

    const order = await createCjOrder(
      {
        orderNumber: session.id,
        shippingCustomerName: shipping?.name || customer?.name || "Client SWELTR",
        shippingCountryCode: countryCode,
        shippingProvince: address.state || address.city || "",
        shippingCity: address.city || "",
        shippingAddress: address.line1 || "",
        shippingAddress2: address.line2 || "",
        shippingZip: address.postal_code || "",
        shippingPhone: customer?.phone || "",
        email: customer?.email || "",
      },
      tier.cjItems
    );

    console.log(`Commande CJ créée pour ${session.id} : ${order.orderId}`);

    // Sécurité : le paiement automatique du solde CJ ne se déclenche que si
    // CJ_AUTO_PAY=true. Sinon la commande reste "en attente" côté CJ, à
    // valider manuellement dans MyCJ le temps que tu sois en confiance.
    if (process.env.CJ_AUTO_PAY === "true") {
      await payCjOrder(order.orderId);
      console.log(`Commande CJ ${order.orderId} payée automatiquement.`);
    } else {
      console.log(
        `CJ_AUTO_PAY désactivé — commande ${order.orderId} créée mais non payée. Valide-la manuellement dans MyCJ.`
      );
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`Erreur lors du traitement de la commande ${session.id} :`, err.message);
    // On renvoie quand même 200 pour éviter que Stripe ne réessaie en boucle ;
    // l'erreur est loguée pour un traitement manuel de rattrapage.
    return NextResponse.json({ received: true, warning: err.message });
  }
}
