import { NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

const PRODUCT_ID = "CEA1A402-F09E-415A-B3F5-076A0ECAB5B4";

export async function GET() {
  try {
    const { accessToken } = await getCjAccessToken();
    // CJ product detail is the documented endpoint that returns the complete
    // variants array; variant/query can return an empty envelope for some listings.
    const response = await fetch(`${CJ_API_BASE_URL}/product/productDetail/query`, {
      method: "POST",
      headers: {
        "CJ-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: PRODUCT_ID }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("CJ product detail HTTP error:", response.status);
      return NextResponse.json({ error: "Les options de ce produit sont temporairement indisponibles." }, { status: 502 });
    }

    const payload = await response.json();
    if (!payload?.result) {
      console.error("CJ product detail returned an error:", { code: payload?.code, message: payload?.message, requestId: payload?.requestId });
      return NextResponse.json({ error: "Les options de ce produit sont temporairement indisponibles." }, { status: 502 });
    }

    const data = payload?.data;
    const candidates = [
      data?.variants,
      data?.product?.variants,
      data?.data?.variants,
      data?.variantList,
      data,
    ];
    const rawVariants = candidates.find(Array.isArray) ?? [];
    const variants = rawVariants.map((variant: Record<string, unknown>) => ({
      vid: String(variant.vid ?? variant.variantId ?? variant.id ?? ""),
      name: String(variant.variantNameEn ?? variant.variantName ?? variant.nameEn ?? variant.name ?? variant.variantKey ?? ""),
      key: String(variant.variantKey ?? variant.variantNameEn ?? variant.variantName ?? variant.nameEn ?? variant.name ?? ""),
      sku: String(variant.variantSku ?? variant.sku ?? ""),
      image: String(variant.variantImage ?? variant.img ?? variant.image ?? ""),
      supplierPrice: Number(variant.variantSellPrice ?? variant.sellPrice ?? variant.price ?? 0),
      weightGrams: Number(variant.variantWeight ?? variant.weight ?? 0),
    })).filter((variant: { vid: string; key: string }) => variant.vid && variant.key);

    if (!variants.length) {
      console.error("CJ product detail has no usable variants:", { requestId: payload?.requestId, dataKeys: data && typeof data === "object" ? Object.keys(data) : [] });
      return NextResponse.json({ error: "Les options de ce produit sont temporairement indisponibles." }, { status: 502 });
    }
    return NextResponse.json({ variants }, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.error("Impossible de récupérer les variantes thermiques CJ:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Impossible de charger les variantes pour le moment." }, { status: 502 });
  }
}
