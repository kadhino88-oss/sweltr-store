import { NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

const PRODUCT_ID = "CEA1A402-F09E-415A-B3F5-076A0ECAB5B4";

export async function GET() {
  try {
    const { accessToken } = await getCjAccessToken();
    const response = await fetch(
      `${CJ_API_BASE_URL}/product/variant/query?pid=${PRODUCT_ID}`,
      {
        headers: { "CJ-Access-Token": accessToken },
        next: { revalidate: 1800 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Les variantes du fournisseur sont temporairement indisponibles." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const payload = await response.json();
    const data = payload?.data;
    // CJ has returned this endpoint in more than one envelope shape.
    const candidates = [
      data,
      data?.variants,
      data?.list,
      data?.records,
      data?.content,
      data?.result,
      data?.data,
      data?.variantList,
    ];
    const rawVariants = candidates.find(Array.isArray) ?? [];

    if (rawVariants.length === 0) {
      console.error("Réponse CJ sans variantes utilisables:", { result: payload?.result, message: payload?.message, dataType: typeof payload?.data, dataKeys: data && typeof data === "object" ? Object.keys(data) : [] });
      return NextResponse.json(
        { error: "Les options de ce produit sont temporairement indisponibles." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const variants = rawVariants.map((variant: Record<string, unknown>) => ({
      vid: String(variant.vid ?? variant.variantId ?? variant.id ?? ""),
      name: String(variant.variantNameEn ?? variant.variantName ?? variant.name ?? variant.variantKey ?? ""),
      key: String(variant.variantKey ?? variant.variantNameEn ?? variant.variantName ?? variant.name ?? ""),
      sku: String(variant.variantSku ?? variant.sku ?? ""),
      image: String(variant.variantImage ?? variant.image ?? ""),
      supplierPrice: Number(variant.variantSellPrice ?? variant.sellPrice ?? variant.price ?? 0),
      weightGrams: Number(variant.variantWeight ?? variant.weight ?? 0),
    })).filter((variant: { vid: string; key: string }) => variant.vid && variant.key);

    return NextResponse.json(
      { variants },
      { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } },
    );
  } catch (error) {
    console.error("Impossible de récupérer les variantes thermiques CJ:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Impossible de charger les variantes pour le moment." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
