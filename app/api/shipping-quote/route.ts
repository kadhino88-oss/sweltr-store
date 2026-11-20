import { NextRequest, NextResponse } from "next/server";
import { SHIPPING_COUNTRIES } from "@/lib/shipping-countries";
import { normalizeStoreOrder } from "@/lib/kit-order";
import { createStoreShippingQuote } from "@/lib/shipping-quote";
import { isStoreFulfillmentReady } from "@/lib/fulfillment-readiness";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isStoreFulfillmentReady()) {
    return NextResponse.json(
      { error: "Les commandes en ligne ne sont pas encore ouvertes. Réessaie bientôt ou contacte notre service client." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Requête invalide." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Sélection invalide." }, { status: 400 });
  const data = body as Record<string, unknown>;
  const items = normalizeStoreOrder(data);
  const country = typeof data.countryCode === "string" ? data.countryCode : "";
  if (!items || !(SHIPPING_COUNTRIES as readonly string[]).includes(country)) return NextResponse.json({ error: "Sélection ou pays invalide." }, { status: 400 });
  try {
    const quote = await createStoreShippingQuote(items, country);
    return NextResponse.json({ shippingAmountCents: quote.shippingAmountCents, maxDays: quote.maxDays }, { headers: { "Cache-Control": "no-store" } });
  } catch (error: unknown) {
    console.error("Échec du calcul des frais de livraison :", error instanceof Error ? error.message : String(error));
    const detail = error instanceof Error ? error.message : "";
    const message = detail.includes("10 jours")
      ? "Aucun mode de livraison avec un délai estimé de 10 jours maximum n’est disponible pour ce pays."
      : detail.includes("plus disponible")
        ? "Un article de ton panier n’est plus disponible. Actualise le panier ou contacte-nous."
        : detail.includes("prix affiché")
          ? "Le prix de cette sélection doit être vérifié avant de pouvoir la commander. Contacte-nous."
          : "La disponibilité et les frais de livraison ne peuvent pas être confirmés pour le moment. Réessaie plus tard.";
    return NextResponse.json({ error: message }, { status: 422, headers: { "Cache-Control": "no-store" } });
  }
}
