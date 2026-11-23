import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { normalizeStoreOrder } from "@/lib/kit-order";
import { SHIPPING_COUNTRIES } from "@/lib/shipping-countries";
import { createStoreShippingQuote } from "@/lib/shipping-quote";
import { isStoreFulfillmentReady } from "@/lib/fulfillment-readiness";
import { randomBytes } from "node:crypto";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Sélection invalide." }, { status: 400 });
  }

  if ((body as Record<string, unknown>).productType === "thermal-underwear") {
    return NextResponse.json(
      { code: "PRODUCT_NOT_AVAILABLE", error: "Bientôt disponible · prix à confirmer." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const items = normalizeStoreOrder(body);
  if (!items) return NextResponse.json({ error: "Sélection invalide." }, { status: 400 });
  const countryCode = typeof (body as Record<string, unknown>).countryCode === "string"
    ? (body as Record<string, unknown>).countryCode as string
    : "";
  if (!(SHIPPING_COUNTRIES as readonly string[]).includes(countryCode)) {
    return NextResponse.json({ error: "Choisis un pays de livraison valide." }, { status: 400 });
  }

  if (!isStoreFulfillmentReady()) {
    return NextResponse.json(
      {
        code: "STORE_NOT_LAUNCH_READY",
        error: "Les commandes en ligne ne sont pas encore ouvertes. Réessaie bientôt ou contacte notre service client.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const stripe = getStripeClient();
  if (!stripe) {
    console.error("Stripe checkout indisponible : STRIPE_SECRET_KEY n'est pas configurée.");
    return NextResponse.json({ error: "Le paiement est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
  }

  try {
    const shippingQuote = await createStoreShippingQuote(items, countryCode);
    const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "auto",
      // Manual capture is only offered for compatible card payments.
      allowed_payment_method_types: ["card"],
      phone_number_collection: { enabled: true },
      // Reserve the customer's card amount first. The webhook captures it only
      // after CJ confirms the supplier order is paid; failures release the hold.
      payment_intent_data: {
        capture_method: "manual",
        metadata: {
          orderType: "store-cart",
          transactionFlow: "supplier-paid-before-capture-v1",
        },
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: "chf",
          product_data: item.kind === "kit"
            ? { name: `SWELTR — ${item.tier.name}`, description: item.tier.items.join(", ") }
            : { name: `SWELTR — ${item.product.name}`, description: item.product.short },
          unit_amount: Math.round((item.kind === "kit" ? item.tier.price : item.product.retailPrice!) * 100),
        },
        quantity: item.quantity,
      })),
      metadata: {
        orderType: "store-cart",
        destinationCountry: countryCode,
        logisticName: shippingQuote.logisticName,
        shippingAmountCents: String(shippingQuote.shippingAmountCents),
        fxUsdToChf: String(shippingQuote.exchangeRate),
        cartItems: JSON.stringify(items.map((item) => item.kind === "kit"
          ? { tierId: item.tierId, quantity: item.quantity }
          : { productSlug: item.productSlug, quantity: item.quantity })),
      },
      integration_identifier: `sweltr-nextjs-${Array.from(randomBytes(8), (byte) => String.fromCharCode(97 + byte % 26)).join("")}`,
      shipping_address_collection: { allowed_countries: [countryCode as typeof SHIPPING_COUNTRIES[number]] },
      shipping_options: [{
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: shippingQuote.shippingAmountCents, currency: "chf" },
          display_name: `Livraison estimée (jusqu’à ${shippingQuote.maxDays} jours)`,
          delivery_estimate: {
            minimum: { unit: "day", value: 1 },
            maximum: { unit: "day", value: shippingQuote.maxDays },
          },
        },
      }],
      success_url: `${siteUrl.replace(/\/$/, "")}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl.replace(/\/$/, "")}/annulation`,
    });
    if (!session.url) {
      console.error("Stripe Checkout n'a retourné aucune URL de paiement.");
      return NextResponse.json({ error: "Impossible d’ouvrir la page de paiement. Réessaie plus tard." }, { status: 502 });
    }
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (err: unknown) {
    console.error("Erreur Stripe Checkout:", getStripeErrorDetails(err));
    return NextResponse.json({ error: "Impossible de démarrer le paiement. Réessaie ou contacte le service client." }, { status: 502 });
  }
}
