import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { TIERS } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe n'est pas configuré. Ajoute STRIPE_SECRET_KEY dans .env.local." },
        { status: 500 }
      );
    }

    const { tierId } = await req.json();
    const tier = TIERS.find((t) => t.id === tierId);

    if (!tier) {
      return NextResponse.json({ error: "Kit introuvable." }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      phone_number_collection: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "eur",
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

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur Stripe:", err);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement. Réessaie." },
      { status: 500 }
    );
  }
}
