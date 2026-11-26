import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { SHIPPING_COUNTRIES } from "@/lib/shipping-countries";
import { normalizeStoreOrder, storeOrderItems, storeOrderTotalCents } from "@/lib/kit-order";
import { CjOrderPreparationRejectedError, CjPaymentRejectedError, createCjOrder, findCjOrderByOrderNumber, getCjOrderNumber, isCjOrderPaid, payCjOrder, prepareCjOrderForPayment } from "@/lib/cj";
import { createStoreShippingQuote } from "@/lib/shipping-quote";
import { isCjAutoPaymentReady } from "@/lib/fulfillment-readiness";

// Stripe doit recevoir le corps brut pour vérifier la signature du webhook.
export const runtime = "nodejs";

function webhookResponse(status = 200) {
  return NextResponse.json(
    { received: status === 200 },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}


function webhookRetryResponse(error: string) {
  // Ne pas acquitter un paiement si la commande fournisseur n'a pas pu être préparée.
  // Stripe pourra retenter après correction de la configuration.
  return NextResponse.json(
    { error },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

function getPaymentIntentId(session: Stripe.Checkout.Session): string | null {
  const paymentIntent = session.payment_intent;
  return typeof paymentIntent === "string" ? paymentIntent : paymentIntent?.id ?? null;
}

async function releaseCustomerPayment(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  idempotencyKey: string,
): Promise<"authorization_released" | "refunded" | "not_captured"> {
  const paymentIntentId = getPaymentIntentId(session);
  if (!paymentIntentId) {
    if (session.payment_status === "paid") throw new Error("Session payée sans PaymentIntent : remboursement à vérifier.");
    return "not_captured";
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status === "requires_capture") {
    await stripe.paymentIntents.cancel(paymentIntentId, {}, { idempotencyKey });
    return "authorization_released";
  }
  if (paymentIntent.status === "succeeded") {
    await stripe.refunds.create({ payment_intent: paymentIntentId }, { idempotencyKey });
    return "refunded";
  }
  if (paymentIntent.status === "canceled" || paymentIntent.status === "requires_payment_method") {
    return "not_captured";
  }
  throw new Error(`État Stripe ${paymentIntent.status} non terminal : paiement à réconcilier.`);
}

async function captureCustomerPayment(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
): Promise<void> {
  const paymentIntentId = getPaymentIntentId(session);
  if (!paymentIntentId) throw new Error("PaymentIntent absent : capture client impossible.");

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status === "succeeded") return;
  if (paymentIntent.status !== "requires_capture") {
    throw new Error(`Capture Stripe bloquée : statut ${paymentIntent.status}.`);
  }
  if (
    !Number.isInteger(session.amount_total)
    || paymentIntent.currency !== session.currency
    || paymentIntent.amount !== session.amount_total
    || paymentIntent.amount_capturable < (session.amount_total ?? 0)
  ) {
    throw new Error("Montant autorisé insuffisant ou devise incohérente : capture Stripe bloquée.");
  }

  const captured = await stripe.paymentIntents.capture(
    paymentIntentId,
    { amount_to_capture: session.amount_total! },
    { idempotencyKey: `sweltr-capture-${session.id}` },
  );
  if (captured.status !== "succeeded") {
    throw new Error(`Stripe n’a pas confirmé la capture client (statut ${captured.status}).`);
  }
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

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return webhookResponse();
  }

  const eventSession = event.data.object as Stripe.Checkout.Session;

  try {
    // Relire la session depuis Stripe permet de travailler avec l'état de paiement
    // et les coordonnées de livraison actuels, plutôt qu'avec le seul événement.
    const session = await stripe.checkout.sessions.retrieve(eventSession.id);
    const paymentIntentId = getPaymentIntentId(session);
    const paymentIntent = paymentIntentId
      ? await stripe.paymentIntents.retrieve(paymentIntentId)
      : null;
    const paymentAuthorized = paymentIntent?.status === "requires_capture";

    if (session.payment_status !== "paid" && !paymentAuthorized) {
      console.warn(
        `Session Stripe ${session.id} sans paiement encaissé ni autorisation capturable (session : ${session.payment_status}, PaymentIntent : ${paymentIntent?.status || "absent"}). Aucune commande fournisseur créée.`,
      );
      return webhookResponse();
    }

    const releaseAndAcknowledge = async (idempotencyKey: string, retryMessage: string) => {
      try {
        const disposition = await releaseCustomerPayment(stripe, session, idempotencyKey);
        console.warn(`Paiement client ${disposition} pour ${session.id} : la commande fournisseur ne peut pas continuer.`);
        return webhookResponse();
      } catch (error: unknown) {
        console.error(`Libération ou remboursement Stripe requis pour ${session.id} :`, getStripeErrorDetails(error));
        return webhookRetryResponse(retryMessage);
      }
    };

    if (session.metadata?.productType === "thermal-underwear") {
      if (!isCjAutoPaymentReady()) {
        return releaseAndAcknowledge(
          `sweltr-fulfillment-disabled-${session.id}`,
          "Traitement fournisseur non prêt : libération du paiement à confirmer.",
        );
      }
      const destination = session.metadata.destinationCountry;
      const variantId = session.metadata.thermalVariantId;
      const expectedCurrency = destination === "FR" ? "eur" : "chf";
      const expectedAmount = 3990;
      if (!variantId || !expectedCurrency || session.currency !== expectedCurrency || session.amount_total !== expectedAmount) {
        console.error("Montant, devise ou variante thermique incohérents pour la session " + session.id);
        return releaseAndAcknowledge(`sweltr-thermal-invalid-${session.id}`, "Paiement thermique incohérent : libération à confirmer.");
      }
      const shipping = session.collected_information?.shipping_details;
      const address = shipping?.address;
      if (!address?.country || !address.line1 || !address.city || !address.postal_code) {
        return releaseAndAcknowledge(`sweltr-thermal-address-${session.id}`, "Adresse thermique invalide : libération à confirmer.");
      }
      if (address.country !== destination || !(SHIPPING_COUNTRIES as readonly string[]).includes(address.country)) {
        return releaseAndAcknowledge(`sweltr-thermal-country-${session.id}`, "Pays thermique invalide : libération à confirmer.");
      }
      const cjOrderNumber = getCjOrderNumber(session.id);
      const existingOrder = await findCjOrderByOrderNumber(cjOrderNumber);
      if (existingOrder && isCjOrderPaid(existingOrder.orderStatus)) {
        await captureCustomerPayment(stripe, session);
        return webhookResponse();
      }
      if (existingOrder && !["CREATED", "IN_CART", "UNPAID"].includes((existingOrder.orderStatus || "").toUpperCase())) {
        return webhookRetryResponse("Statut de commande fournisseur non confirmé.");
      }
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
      let shipmentOrderId = order.shipmentOrderId;
      let cjPayId: string | undefined;
      try {
        const prepared = await prepareCjOrderForPayment(order.orderId, shipmentOrderId);
        shipmentOrderId = prepared.shipmentOrderId;
        cjPayId = prepared.payId;
      } catch (error: unknown) {
        console.error("Préparation de la commande thermique CJ incomplète :", getStripeErrorDetails(error));
        if (error instanceof CjOrderPreparationRejectedError) {
          return releaseAndAcknowledge(
            `sweltr-thermal-cj-blocked-${session.id}`,
            "CJ ne peut pas confirmer le contenu de cette commande : libération à vérifier.",
          );
        }
        return webhookRetryResponse("Commande créée chez le fournisseur mais confirmation CJ incomplète. Nouvelle tentative nécessaire.");
      }
      console.log("Commande thermique CJ " + (existingOrder ? "retrouvée" : "créée") + " pour " + session.id + " : " + order.orderId);
      if (process.env.CJ_AUTO_PAY === "true" && !shipmentOrderId) {
        console.error("Paiement thermique CJ bloqué : shipmentOrderId absent pour " + order.orderId + ".");
        return webhookRetryResponse("Identifiant de paiement fournisseur absent : vérification requise.");
      } else if (process.env.CJ_AUTO_PAY === "true") {
        try {
          await payCjOrder(shipmentOrderId!, cjPayId);
          const paidOrder = await findCjOrderByOrderNumber(cjOrderNumber);
          if (!paidOrder || !isCjOrderPaid(paidOrder.orderStatus)) {
            return webhookRetryResponse("CJ n’a pas encore confirmé le paiement de la commande thermique.");
          }
          await captureCustomerPayment(stripe, session);
          console.log("Commande thermique CJ payée et paiement client capturé : " + order.orderId);
          return webhookResponse();
        }
        catch (error: unknown) {
          console.error("Paiement fournisseur non confirmé pour " + order.orderId + " :", getStripeErrorDetails(error));
          try {
            const currentOrder = await findCjOrderByOrderNumber(cjOrderNumber);
            if (currentOrder && isCjOrderPaid(currentOrder.orderStatus)) {
              await captureCustomerPayment(stripe, session);
              return webhookResponse();
            }
            if (error instanceof CjPaymentRejectedError && currentOrder?.orderStatus?.toUpperCase() === "UNPAID") {
              return releaseAndAcknowledge(
                `sweltr-cj-unpaid-${session.id}`,
                "Le paiement fournisseur est refusé : libération du paiement client à confirmer.",
              );
            }
          } catch (verificationError: unknown) {
            console.error("État CJ ou libération du paiement thermique non confirmé :", getStripeErrorDetails(verificationError));
          }
          return webhookRetryResponse("Paiement fournisseur non confirmé : nouvelle vérification nécessaire.");
        }
      }
      return releaseAndAcknowledge(
        `sweltr-thermal-payment-disabled-${session.id}`,
        "Paiement fournisseur désactivé : libération du paiement client à confirmer.",
      );
    }

    let storeOrder = null;
    if (session.metadata?.cartItems) {
      try {
        storeOrder = normalizeStoreOrder({ items: JSON.parse(session.metadata.cartItems) });
      } catch {
        storeOrder = null;
      }
    } else {
      storeOrder = normalizeStoreOrder({
        tierId: session.metadata?.tierId,
        quantity: session.metadata?.quantity || 1,
      });
    }
    if (!storeOrder) {
      console.error(`Contenu de panier invalide pour la session Stripe ${session.id}. Traitement requis.`);
      return releaseAndAcknowledge(`sweltr-invalid-order-${session.id}`, "Contenu invalide : libération du paiement client à confirmer.");
    }

    if (!isCjAutoPaymentReady()) {
      return releaseAndAcknowledge(
        `sweltr-fulfillment-disabled-${session.id}`,
        "Traitement fournisseur non prêt : libération du paiement client à confirmer.",
      );
    }

    // Vérifier le montant des articles et des frais de livraison avant tout traitement.
    const expectedItemsAmount = storeOrderTotalCents(storeOrder);
    const shipping = session.collected_information?.shipping_details;
    const address = shipping?.address;
    const destinationCountry = session.metadata?.destinationCountry || address?.country || "";
    const hasShippingQuote = Boolean(session.metadata?.destinationCountry && session.metadata?.logisticName);
    const shippingAmountCents = hasShippingQuote ? Number(session.metadata?.shippingAmountCents) : 0;
    if (hasShippingQuote && (!Number.isInteger(shippingAmountCents) || shippingAmountCents < 0 || address?.country !== destinationCountry)) {
      console.error(`Devis d’expédition incohérent pour la session Stripe ${session.id}.`);
      return releaseAndAcknowledge(`sweltr-shipping-quote-invalid-${session.id}`, "Devis de livraison incohérent : libération à confirmer.");
    }
    const expectedAmount = expectedItemsAmount + shippingAmountCents;
    if (session.currency !== "chf" || session.amount_total !== expectedAmount) {
      console.error(
        `Montant/devise incohérents pour la session Stripe ${session.id} : devise=${session.currency}, montant=${session.amount_total}. Traitement requis.`,
      );
      return releaseAndAcknowledge(`sweltr-amount-invalid-${session.id}`, "Montant ou devise incohérents : libération à confirmer.");
    }

    const supplierItems = storeOrderItems(storeOrder);
    if (!supplierItems.length) {
      console.error(
        `Aucun produit CJ configuré pour le contenu de la session Stripe ${session.id}.`,
      );
      return releaseAndAcknowledge(`sweltr-products-unmapped-${session.id}`, "Produit non configuré : libération du paiement client à confirmer.");
    }

    if (!address?.country || !address.line1 || !address.city || !address.postal_code) {
      console.error(
        `Adresse de livraison incomplète pour la session Stripe ${session.id}. Traitement manuel requis.`,
      );
      return releaseAndAcknowledge(`sweltr-address-invalid-${session.id}`, "Adresse invalide : libération du paiement client à confirmer.");
    }

    // Aucune session ne peut expédier vers une destination qui n'est pas proposée
    // par le Checkout international ; CJ confirmera le transporteur lors de la commande.
    if (!(SHIPPING_COUNTRIES as readonly string[]).includes(address.country) || address.country !== destinationCountry) {
      console.error(
        `Pays de livraison non pris en charge pour la session Stripe ${session.id} : ${address.country}.`,
      );
      return releaseAndAcknowledge(`sweltr-country-invalid-${session.id}`, "Pays non pris en charge : libération du paiement client à confirmer.");
    }

    let shippingQuote;
    try {
      shippingQuote = await createStoreShippingQuote(
        storeOrder,
        address.country,
        hasShippingQuote ? session.metadata?.logisticName : undefined,
      );
    } catch (error: unknown) {
      console.error(`Stock ou expédition non confirmés après paiement pour ${session.id} :`, getStripeErrorDetails(error));
      return releaseAndAcknowledge(
        `sweltr-unshippable-${session.id}`,
        "Expédition non confirmée : libération du paiement client à confirmer.",
      );
    }

    if (hasShippingQuote && shippingQuote.shippingAmountCents > shippingAmountCents) {
      return releaseAndAcknowledge(
        `sweltr-shipping-adjust-${session.id}`,
        "Le tarif de livraison a changé : libération du paiement client à confirmer.",
      );
    }

    // La référence stable permet de retrouver une commande créée lors d'une tentative
    // précédente dont la réponse réseau aurait été perdue. Si la recherche CJ échoue,
    // on échoue fermé et Stripe retentera plutôt que de risquer un doublon.
    const cjOrderNumber = getCjOrderNumber(session.id);
    const existingOrder = await findCjOrderByOrderNumber(cjOrderNumber);
    if (existingOrder && isCjOrderPaid(existingOrder.orderStatus)) {
      console.log(`Commande CJ déjà payée pour la session ${session.id}; aucun second débit.`);
      await captureCustomerPayment(stripe, session);
      return webhookResponse();
    }
    if (existingOrder && !["CREATED", "IN_CART", "UNPAID"].includes((existingOrder.orderStatus || "").toUpperCase())) {
      console.error(`Statut CJ inconnu pour ${session.id}: ${existingOrder.orderStatus || "absent"}. Paiement fournisseur suspendu.`);
      return webhookRetryResponse("Statut de commande fournisseur non confirmé.");
    }
    const order = existingOrder ?? await createCjOrder(
      {
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
      },
      supplierItems,
      shippingQuote.logisticName,
    );
    if (!order?.orderId) {
      console.error("CJ n'a retourné aucun identifiant pour la session Stripe " + session.id + ".");
      return webhookRetryResponse("Commande fournisseur non confirmée.");
    }

    let shipmentOrderId = order.shipmentOrderId;
    let cjPayId: string | undefined;
    let payableAmountUsd: number;
    try {
      const prepared = await prepareCjOrderForPayment(order.orderId, shipmentOrderId);
      shipmentOrderId = prepared.shipmentOrderId;
      cjPayId = prepared.payId;
      payableAmountUsd = prepared.payableAmountUsd;
    } catch (error: unknown) {
      console.error("Préparation de la commande CJ incomplète :", getStripeErrorDetails(error));
      if (error instanceof CjOrderPreparationRejectedError) {
        return releaseAndAcknowledge(
          `sweltr-cj-order-blocked-${session.id}`,
          "CJ ne peut pas confirmer tous les articles de cette commande : libération à vérifier.",
        );
      }
      return webhookRetryResponse("Commande créée chez le fournisseur mais confirmation CJ incomplète. Nouvelle tentative nécessaire.");
    }

    const supplierAmountCents = Math.ceil(payableAmountUsd * shippingQuote.exchangeRate * 100);
    if (
      !Number.isFinite(supplierAmountCents)
      || !Number.isSafeInteger(session.amount_total)
      || supplierAmountCents >= session.amount_total!
    ) {
      console.error(`Coût fournisseur CJ supérieur ou égal au montant client pour ${session.id}; aucun paiement CJ ne sera envoyé.`);
      return releaseAndAcknowledge(
        `sweltr-cj-cost-exceeds-sale-${session.id}`,
        "Le coût final du fournisseur ne permet pas de confirmer la commande : la réservation du paiement sera levée.",
      );
    }

    console.log((existingOrder ? "Commande CJ existante retrouvée" : "Commande CJ créée") + " pour la session Stripe " + session.id + " (référence fournisseur " + cjOrderNumber + ") : " + order.orderId);
    if (process.env.CJ_AUTO_PAY === "true" && !shipmentOrderId) {
      console.error("Paiement CJ bloqué : shipmentOrderId absent pour " + order.orderId + ". Vérification manuelle requise.");
      return webhookRetryResponse("Identifiant de paiement fournisseur absent : vérification requise.");
    } else if (process.env.CJ_AUTO_PAY === "true") {
      try {
        await payCjOrder(shipmentOrderId!, cjPayId);
        const paidOrder = await findCjOrderByOrderNumber(cjOrderNumber);
        if (!paidOrder || !isCjOrderPaid(paidOrder.orderStatus)) {
          console.error("CJ n’a pas confirmé le paiement de la commande " + order.orderId + ".");
          return webhookRetryResponse("Paiement fournisseur envoyé mais statut CJ non confirmé.");
        }
        await captureCustomerPayment(stripe, session);
        console.log("Commande CJ " + order.orderId + " payée et statut confirmé.");
      } catch (error: unknown) {
        console.error("La commande CJ " + order.orderId + " existe, mais son paiement automatique a échoué. Vérification manuelle requise :", getStripeErrorDetails(error));
        try {
          const currentOrder = await findCjOrderByOrderNumber(cjOrderNumber);
          if (currentOrder && isCjOrderPaid(currentOrder.orderStatus)) {
            await captureCustomerPayment(stripe, session);
            return webhookResponse();
          }
          if (error instanceof CjPaymentRejectedError && currentOrder?.orderStatus?.toUpperCase() === "UNPAID") {
            return releaseAndAcknowledge(
              `sweltr-cj-unpaid-${session.id}`,
              "CJ confirme que le fournisseur n’a pas été payé : libération client à confirmer.",
            );
          }
        } catch (verificationError: unknown) {
          console.error("État CJ ou libération du paiement client non confirmé :", getStripeErrorDetails(verificationError));
        }
        return webhookRetryResponse("Paiement fournisseur non confirmé : nouvelle vérification nécessaire.");
      }
    } else {
      return releaseAndAcknowledge(
        `sweltr-cj-autopay-disabled-${session.id}`,
        "Paiement fournisseur désactivé : libération du paiement client à confirmer.",
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
