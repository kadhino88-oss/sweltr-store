import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { normalizeKitOrder } from "@/lib/kit-order";
import { SHIPPING_COUNTRIES } from "@/lib/shipping-countries";

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

  const items = normalizeKitOrder(body);
  if (!items) return NextResponse.json({ error: "Sélection de kit invalide." }, { status: 400 });

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
  const isLiveStripeKey = /^(sk|rk)_live_/.test(stripeSecretKey);
  if (isLiveStripeKey && process.env.STORE_SALES_ENABLED !== "true") {
    return NextResponse.json(
      {
        code: "STORE_NOT_LAUNCH_READY",
        error: "Les commandes sont temporairement suspendues pendant la validation finale du stock, de la livraison et des coûts fournisseurs.",
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
    const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "auto",
      payment_method_types: ["card"],
      phone_number_collection: { enabled: true },
      line_items: items.map(({ tier, quantity }) => ({
        price_data: {
          currency: "chf",
          product_data: { name: `SWELTR — ${tier.name}`, description: tier.items.join(", ") },
          unit_amount: Math.round(tier.price * 100),
        },
        quantity,
      })),
      metadata: items.length === 1
        ? { orderType: "kit", tierId: items[0].tierId, quantity: String(items[0].quantity) }
        : { orderType: "kit-cart", cartItems: JSON.stringify(items.map(({ tierId, quantity }) => ({ tierId, quantity }))) },
      shipping_address_collection: { allowed_countries: [...SHIPPING_COUNTRIES] },
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
