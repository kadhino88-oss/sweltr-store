import { NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

const PRODUCT_ID = "CEA1A402-F09E-415A-B3F5-076A0ECAB5B4";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function findVariantArray(payload: unknown): unknown[] {
  const root = asRecord(payload);
  const data = asRecord(root?.data);
  const product = asRecord(data?.product);
  const nested = asRecord(data?.data);
  const candidates = [
    data?.variants,
    product?.variants,
    data?.variantList,
    nested?.variants,
    nested?.variantList,
    data?.productList,
    root?.variants,
  ];
  return candidates.find(Array.isArray) as unknown[] | undefined ?? [];
}

export async function GET() {
  try {
    const { accessToken } = await getCjAccessToken();
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
      return NextResponse.json(
        { error: "Les options de ce produit sont temporairement indisponibles." },
        { status: 502 },
      );
    }

    const payload: unknown = await response.json();
    const root = asRecord(payload);
    if (root?.result !== true) {
      console.error("CJ product detail rejected request:", {
        code: root?.code,
        message: root?.message,
        requestId: root?.requestId,
      });
      return NextResponse.json(
        { error: "CJ ne permet pas actuellement de charger les variantes de ce produit." },
        { status: 502 },
      );
    }

    const rawVariants = findVariantArray(payload);
    const variants = rawVariants.map((value) => {
      const variant = asRecord(value) ?? {};
      const key = String(
        variant.variantKey ??
        variant.variantNameEn ??
        variant.variantName ??
        variant.nameEn ??
        variant.name ??
        variant.variantNameKey ??
        "",
      ).trim();
      return {
        vid: String(variant.vid ?? variant.variantId ?? variant.id ?? "").trim(),
        name: String(variant.variantNameEn ?? variant.variantName ?? variant.nameEn ?? variant.name ?? key).trim(),
        key,
        sku: String(variant.variantSku ?? variant.sku ?? "").trim(),
        image: String(variant.variantImage ?? variant.img ?? variant.image ?? "").trim(),
        supplierPrice: Number(variant.variantSellPrice ?? variant.sellPrice ?? variant.price ?? 0),
        weightGrams: Number(variant.variantWeight ?? variant.weight ?? 0),
      };
    }).filter((variant) => variant.vid && variant.key);

    if (!variants.length) {
      const data = asRecord(root?.data);
      console.error("CJ product detail contained no usable variants:", {
        requestId: root?.requestId,
        dataKeys: data ? Object.keys(data) : [],
        variantArrayFound: rawVariants.length > 0,
      });
      return NextResponse.json(
        { error: "Les variantes de ce produit ne sont pas disponibles auprès du fournisseur pour le moment." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { variants },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch (error) {
    console.error(
      "Unable to load CJ thermal variants:",
      error instanceof Error ? error.message : String(error),
    );
    return NextResponse.json(
      { error: "Impossible de joindre le fournisseur pour charger les variantes. Réessaie plus tard." },
      { status: 502 },
    );
  }
}
