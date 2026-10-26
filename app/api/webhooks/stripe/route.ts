import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { TIERS } from "@/lib/data";
import { createCjOrder, payCjOrder } from "@/lib/cj";

// Stripe doit recevoir le corps brut pour vérifier la signature du webhook.
export const runtime = "nodejs";

function webhookResponse(status = 200) {
  return NextResponse.json(
    { received: status === 200 },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripeClient();

  if (!stripe || !webhookSecret) {
    console.error(
      `Webhook Stripe non configuré : ${!stripe ? "STRIPE_SECRET_KEY manquante" : "STRIPE_WEBHOOK_SECRET manquante"}.`,
    );
    return NextResponse.json(
      { error: "Webhook Stripe non configuré." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error: unknown) {
    console.error("Signature webhook Stripe invalide :", getStripeErrorDetails(error));
    return NextResponse.json(
      { error: "Signature invalide." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (event.type !== "checkout.session.completed") {
    return webhookResponse();
  }

  const eventSession = event.data.object as Stripe.Checkout.Session;

  try {
    // Relire la session depuis Stripe permet de travailler avec l'état de paiement
    // et les coordonnées de livraison actuels, plutôt qu'avec le seul événement.
    const session = await stripe.checkout.sessions.retrieve(eventSession.id);

    if (session.payment_status !== "paid") {
      console.warn(
        `Session Stripe ${session.id} terminée mais non payée (statut : ${session.payment_status}). Aucune commande CJ créée.`,
      );
      return webhookResponse();
    }

    const tier = TIERS.find((item) => item.id === session.metadata?.tierId);
    if (!tier) {
      console.error(`Kit inconnu pour la session Stripe ${session.id}.`);
      // Erreur de configuration non transitoire : alerte dans les logs, pas de boucle de retry.
      return webhookResponse();
    }

    if (!tier.cjItems?.length) {
      console.error(
        `Aucun produit CJ configuré pour le kit "${tier.name}". Commande Stripe ${session.id} à traiter manuellement.`,
      );
      return webhookResponse();
    }

    const shipping = session.shipping_details;
    const address = shipping?.address;
    if (!address?.country || !address.line1 || !address.city || !address.postal_code) {
      console.error(
        `Adresse de livraison incomplète pour la session Stripe ${session.id}. Traitement manuel requis.`,
      );
      return webhookResponse();
    }

    // Une erreur transitoire CJ doit recevoir un 5xx : Stripe réessaiera le webhook.
    // Le numéro de commande CJ reste la session Stripe pour faciliter le rapprochement.
    const order = await createCjOrder(
      {
        orderNumber: session.id,
        shippingCustomerName:
          shipping?.name || session.customer_details?.name || "Client SWELTR",
        shippingCountryCode: address.country,
        shippingProvince: address.state || address.city || "",
        shippingCity: address.city,
        shippingAddress: address.line1,
        shippingAddress2: address.line2 || "",
        shippingZip: address.postal_code,
        shippingPhone: session.customer_details?.phone || "",
        email: session.customer_details?.email || "",
      },
      tier.cjItems,
    );

    if (!order?.orderId) {
      console.error(`CJ n'a retourné aucun identifiant pour la session Stripe ${session.id}.`);
      return NextResponse.json(
        { error: "Commande fournisseur non confirmée." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.log(`Commande CJ créée pour la session Stripe ${session.id} : ${order.orderId}`);

    // Le paiement CJ dépense le solde réel. Il reste désactivé sauf opt-in explicite.
    if (process.env.CJ_AUTO_PAY === "true") {
      try {
        await payCjOrder(order.orderId);
        console.log(`Commande CJ ${order.orderId} payée automatiquement.`);
      } catch (error: unknown) {
        // Ne pas demander à Stripe de rejouer la création : la commande CJ existe déjà.
        // Le paiement doit être vérifié et repris manuellement dans MyCJ.
        console.error(
          `La commande CJ ${order.orderId} existe, mais son paiement automatique a échoué. Vérification manuelle requise :`,
          getStripeErrorDetails(error),
        );
      }
    } else {
      console.log(
        `CJ_AUTO_PAY désactivé — commande ${order.orderId} créée mais non payée. Valide-la manuellement dans MyCJ.`,
      );
    }

    return webhookResponse();
  } catch (error: unknown) {
    console.error(
      `Échec transitoire de traitement du webhook Stripe pour la session ${eventSession.id} :`,
      getStripeErrorDetails(error),
    );
    // Stripe retentera sur une réponse 5xx. Vérifier la commande CJ par son orderNumber
    // avant toute relance manuelle afin d'éviter une éventuelle création en double.
    return NextResponse.json(
      { error: "Traitement fournisseur temporairement indisponible." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
