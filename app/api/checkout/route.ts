import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { TIERS } from "@/lib/data";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Requête invalide. Sélectionne un kit puis réessaie." },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("tierId" in body) ||
    typeof body.tierId !== "string"
  ) {
    return NextResponse.json(
      { error: "Sélection de kit invalide." },
      { status: 400 },
    );
  }

  const tier = TIERS.find((item) => item.id === body.tierId);
  if (!tier) {
    return NextResponse.json({ error: "Kit introuvable." }, { status: 400 });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    console.error("Stripe checkout indisponible : STRIPE_SECRET_KEY n'est pas configurée.");
    return NextResponse.json(
      { error: "Le paiement est momentanément indisponible. Réessaie plus tard." },
      { status: 503 },
    );
  }

  try {
    const siteUrl = (
      process.env.SITE_URL || "https://sweltr-store-five.vercel.app"
    ).replace(/\/+$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      phone_number_collection: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: `SWELTR — ${tier.name}`,
              description: tier.items.join(", "),
            },
            unit_amount: Math.round(tier.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { tierId: tier.id },
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "US", "CA", "GB"],
      },
      success_url: `${siteUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/annulation`,
    });

    if (!session.url) {
      console.error("Stripe Checkout n'a retourné aucune URL de paiement.");
      return NextResponse.json(
        { error: "Impossible d'ouvrir la page de paiement. Réessaie plus tard." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { url: session.url },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err: unknown) {
    console.error("Erreur Stripe Checkout:", getStripeErrorDetails(err));
    return NextResponse.json(
      { error: "Impossible de démarrer le paiement. Réessaie ou contacte le service client." },
      { status: 502 },
    );
  }
}
