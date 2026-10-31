import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createHash } from "node:crypto";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { TIERS } from "@/lib/data";
import { createCjOrder, findCjOrderByOrderNumber, payCjOrder } from "@/lib/cj";

// Stripe doit recevoir le corps brut pour vérifier la signature du webhook.
export const runtime = "nodejs";

function webhookResponse(status = 200) {
  return NextResponse.json(
    { received: status === 200 },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

// CJ limite orderNumber à 50 caractères. Un hash déterministe reste stable entre les retries.
function getCjOrderNumber(stripeSessionId: string) {
  const digest = createHash("sha256").update(stripeSessionId).digest("hex").slice(0, 40);
  return `SWELTR-${digest}`;
}

function webhookRetryResponse(error: string) {
  // Ne pas acquitter un paiement si la commande fournisseur n'a pas pu être préparée.
  // Stripe pourra retenter après correction de la configuration.
  return NextResponse.json(
    { error },
    { status: 503, headers: { "Cache-Control": "no-store" } },
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

    if (session.metadata?.productType === "thermal-underwear") {
      const destination = session.metadata.destinationCountry;
      const variantId = session.metadata.thermalVariantId;
      const expectedCurrency = destination === "FR" ? "eur" : destination === "CH" ? "chf" : "";
      const expectedAmount = 3990;
      if (!variantId || !expectedCurrency || session.currency !== expectedCurrency || session.amount_total !== expectedAmount) {
        console.error("Montant, devise ou variante thermique incohérents pour la session " + session.id);
        return webhookRetryResponse("Paiement thermique incohérent : commande fournisseur suspendue.");
      }
      const shipping = session.shipping_details;
      const address = shipping?.address;
      if (!address?.country || !address.line1 || !address.city || !address.postal_code) return webhookRetryResponse("Adresse de livraison incomplète : commande fournisseur en attente.");
      if ((destination === "FR" && address.country !== "FR") || (destination === "CH" && address.country !== "CH")) return webhookRetryResponse("Le pays de livraison ne correspond pas au paiement. Vérification requise.");
      const cjOrderNumber = getCjOrderNumber(session.id);
      const existingOrder = await findCjOrderByOrderNumber(cjOrderNumber);
      const order = existingOrder ?? await createCjOrder({
        orderNumber: cjOrderNumber,
        shippingCustomerName: shipping?.name || session.customer_details?.name || "Client SWELTR",
        shippingCountryCode: address.country,
        shippingProvince: address.state || address.city || "",
        shippingCity: address.city,
        shippingAddress: address.line1,
        shippingAddress2: address.line2 || "",
        shippingZip: address.postal_code,
        shippingPhone: session.customer_details?.phone || "",
        email: session.customer_details?.email || "",
      }, [{ vid: variantId, quantity: 1 }]);
      if (!order?.orderId) return webhookRetryResponse("Commande fournisseur non confirmée.");
      console.log("Commande thermique CJ " + (existingOrder ? "retrouvée" : "créée") + " pour " + session.id + " : " + order.orderId);
      if (process.env.CJ_AUTO_PAY === "true" && existingOrder) {
        console.warn("Commande CJ " + order.orderId + " retrouvée après retry : paiement automatique ignoré pour éviter un double débit. Vérification MyCJ requise.");
      } else if (process.env.CJ_AUTO_PAY === "true" && !order.shipmentOrderId) {
        console.error("Paiement thermique CJ bloqué : shipmentOrderId absent pour " + order.orderId + ".");
      } else if (process.env.CJ_AUTO_PAY === "true") {
        try { await payCjOrder(order.shipmentOrderId!); console.log("Commande thermique CJ payée automatiquement : " + order.orderId); }
        catch (error: unknown) { console.error("Paiement fournisseur non confirmé pour " + order.orderId + " :", getStripeErrorDetails(error)); }
      } else { console.log("CJ_AUTO_PAY désactivé — commande thermique " + order.orderId + " créée mais non payée."); }
      return webhookResponse();
    }

    const tier = TIERS.find((item) => item.id === session.metadata?.tierId);
    if (!tier) {
      console.error(`Kit inconnu pour la session Stripe ${session.id}. Traitement requis.`);
      return webhookRetryResponse("Kit inconnu : traitement de commande en attente de correction.");
    }

    // Défense en profondeur : ne jamais créer de commande fournisseur si le montant
    // ou la devise de la session payée ne correspondent pas au kit configuré côté serveur.
    const expectedAmount = Math.round(tier.price * 100);
    if (session.currency !== "chf" || session.amount_total !== expectedAmount) {
      console.error(
        `Montant/devise incohérents pour la session Stripe ${session.id} : devise=${session.currency}, montant=${session.amount_total}. Traitement requis.`,
      );
      return webhookRetryResponse("Montant du paiement incohérent : commande fournisseur suspendue.");
    }

    if (!tier.cjItems?.length) {
      console.error(
        `Aucun produit CJ configuré pour le kit "${tier.name}". Commande Stripe ${session.id} à traiter.`,
      );
      return webhookRetryResponse("Produits fournisseur non configurés pour ce kit.");
    }

    const shipping = session.shipping_details;
    const address = shipping?.address;
    if (!address?.country || !address.line1 || !address.city || !address.postal_code) {
      console.error(
        `Adresse de livraison incomplète pour la session Stripe ${session.id}. Traitement manuel requis.`,
      );
      return webhookRetryResponse("Adresse de livraison incomplète : commande fournisseur en attente.");
    }

    // Le webhook applique aussi la limite CH/FR : une adresse inattendue ne part
    // jamais chez le fournisseur, même si une session était créée hors du checkout normal.
    if (address.country !== "CH" && address.country !== "FR") {
      console.error(
        `Pays de livraison non autorisé pour la session Stripe ${session.id} : ${address.country}.`,
      );
      return webhookRetryResponse("Pays de livraison non pris en charge : commande fournisseur suspendue.");
    }

    // La référence stable permet de retrouver une commande créée lors d'une tentative
    // précédente dont la réponse réseau aurait été perdue. Si la recherche CJ échoue,
    // on échoue fermé et Stripe retentera plutôt que de risquer un doublon.
    const cjOrderNumber = getCjOrderNumber(session.id);
    const existingOrder = await findCjOrderByOrderNumber(cjOrderNumber);
    const order = existingOrder ?? await createCjOrder(
      {
        orderNumber: cjOrderNumber,
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

    console.log(`${existingOrder ? "Commande CJ existante retrouvée" : "Commande CJ créée"} pour la session Stripe ${session.id} (référence fournisseur ${cjOrderNumber}) : ${order.orderId}`);

    // Le paiement CJ dépense le solde réel. Il reste désactivé sauf opt-in explicite.
    // Une commande retrouvée après retry n'est jamais payée automatiquement : son état
    // de paiement peut être inconnu, donc on évite tout risque de second débit.
    if (process.env.CJ_AUTO_PAY === "true" && existingOrder) {
      console.warn(
        `Commande CJ ${order.orderId} retrouvée après une nouvelle tentative. Paiement automatique ignoré par sécurité ; vérifier son statut dans MyCJ.`,
      );
    } else if (process.env.CJ_AUTO_PAY === "true" && !order.shipmentOrderId) {
      console.error(`Paiement CJ bloqué : shipmentOrderId absent pour ${order.orderId}. Vérification manuelle requise.`);
    } else if (process.env.CJ_AUTO_PAY === "true") {
      try {
        await payCjOrder(order.shipmentOrderId!);
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
