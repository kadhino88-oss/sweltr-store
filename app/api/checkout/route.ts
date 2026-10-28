import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";
import { TIERS } from "@/lib/data";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

const THERMAL_PRODUCT_ID = "CEA1A402-F09E-415A-B3F5-076A0ECAB5B4";
const THERMAL_PRICE = { FR: { currency: "eur", amount: 3990 }, CH: { currency: "chf", amount: 3990 } } as const;

type RecordValue = Record<string, unknown>;
function asRecord(value: unknown): RecordValue | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : null;
}
function getVariantRows(payload: unknown): unknown[] {
  const root = asRecord(payload);
  const data = asRecord(root?.data);
  const product = asRecord(data?.product);
  const nested = asRecord(data?.data);
  const candidates = [
    data?.variants, product?.variants, data?.variantList, nested?.variants,
    nested?.variantList, data?.productList, data?.stanProducts,
    data?.variantInventory, data?.variantInventories, data?.thirdAttributeList,
    root?.variants,
  ];
  return candidates.find(Array.isArray) as unknown[] | undefined ?? [];
}
function variantId(row: unknown): string {
  const item = asRecord(row);
  if (!item) return "";
  for (const key of ["vid", "variantId", "variant_id", "id", "pid", "productId"]) {
    const value = item[key];
    if (typeof value === "string" || typeof value === "number") {
      const result = String(value).trim();
      if (result) return result;
    }
  }
  return "";
}
async function isValidThermalVariant(vid: string) {
  const { accessToken } = await getCjAccessToken();
  const response = await fetch(`${CJ_API_BASE_URL}/product/productDetail/query`, {
    method: "POST",
    headers: { "CJ-Access-Token": accessToken, "Content-Type": "application/json" },
    body: JSON.stringify({ id: THERMAL_PRODUCT_ID }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("CJ product detail lookup failed");
  const payload: unknown = await response.json();
  const root = asRecord(payload);
  if (root?.result !== true) throw new Error("CJ rejected product detail request");
  return getVariantRows(payload).some((row) => variantId(row) === vid);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Sélection invalide." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const isThermal = data.productType === "thermal-underwear";
  let tier: (typeof TIERS)[number] | undefined;
  let variantIdValue = "";
  let destination: "FR" | "CH" = "FR";
  let productName = "";
  let currency: "eur" | "chf" = "chf";
  let amount = 0;
  let description = "";

  if (isThermal) {
    if (typeof data.variantId !== "string" || !data.variantId || (data.country !== "FR" && data.country !== "CH")) {
      return NextResponse.json({ error: "Choisis une couleur, une taille et une destination valides." }, { status: 400 });
    }
    variantIdValue = data.variantId;
    destination = data.country;
    const pricing = THERMAL_PRICE[destination];
    currency = pricing.currency;
    amount = pricing.amount;
    productName = "SWELTR — Ensemble thermique Winter Warm";
    description = "Ensemble thermique deux pièces; variante validée auprès du fournisseur CJ.";
    try {
      if (!(await isValidThermalVariant(variantIdValue))) {
        return NextResponse.json({ error: "Cette variante n'est plus disponible. Actualise la fiche produit." }, { status: 400 });
      }
    } catch (error) {
      console.error("Validation de variante CJ impossible:", error instanceof Error ? error.message : String(error));
      return NextResponse.json({ error: "Le catalogue fournisseur est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
    }
  } else {
    if (typeof data.tierId !== "string") {
      return NextResponse.json({ error: "Sélection de kit invalide." }, { status: 400 });
    }
    tier = TIERS.find((item) => item.id === data.tierId);
    if (!tier) return NextResponse.json({ error: "Kit introuvable." }, { status: 400 });
    currency = "chf";
    amount = Math.round(tier.price * 100);
    productName = `SWELTR — ${tier.name}`;
    description = tier.items.join(", ");
  }

  const stripe = getStripeClient();
  if (!stripe) {
    console.error("Stripe checkout indisponible : STRIPE_SECRET_KEY n'est pas configurée.");
    return NextResponse.json({ error: "Le paiement est momentanément indisponible. Réessaie plus tard." }, { status: 503 });
  }

  try {
    const siteUrl = (process.env.SITE_URL || "https://sweltr-store-five.vercel.app").replace(/\/+$/, "");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      payment_method_types: ["card"],
      phone_number_collection: { enabled: true },
      line_items: [{
        price_data: { currency, product_data: { name: productName, description }, unit_amount: amount },
        quantity: 1,
      }],
      metadata: isThermal
        ? { productType: "thermal-underwear", thermalVariantId: variantIdValue, destinationCountry: destination }
        : { tierId: tier!.id },
      shipping_address_collection: { allowed_countries: ["CH", "FR"] },
      success_url: `${siteUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/annulation`,
    });
    if (!session.url) {
      console.error("Stripe Checkout n'a retourné aucune URL de paiement.");
      return NextResponse.json({ error: "Impossible d'ouvrir la page de paiement. Réessaie plus tard." }, { status: 502 });
    }
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (err: unknown) {
    console.error("Erreur Stripe Checkout:", getStripeErrorDetails(err));
    return NextResponse.json({ error: "Impossible de démarrer le paiement. Réessaie ou contacte le service client." }, { status: 502 });
  }
}
