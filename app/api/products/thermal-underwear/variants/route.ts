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
    data?.stanProducts,
    data?.variantInventory,
    data?.variantInventories,
    data?.thirdAttributeList,
    root?.variants,
  ];
  return candidates.find(Array.isArray) as unknown[] | undefined ?? [];
}

function firstText(record: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" || typeof value === "number") {
      const text = String(value).trim();
      if (text) return text;
    }
  }
  return "";
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
      const key = firstText(variant, [
        "variantKey", "variantNameEn", "variantName", "nameEn", "name",
        "variantNameKey", "variant", "key", "standard",
      ]);
      return {
        vid: firstText(variant, [
          "vid", "variantId", "variant_id", "id", "pid", "productId",
        ]),
        name: firstText(variant, [
          "variantNameEn", "variantName", "nameEn", "name", "variant", "standard",
        ]) || key,
        key,
        sku: firstText(variant, ["variantSku", "sku", "productSku"]),
        image: firstText(variant, ["variantImage", "img", "image", "productImage"]),
        supplierPrice: Number(firstText(variant, [
          "variantSellPrice", "sellPrice", "price", "variantPrice", "nowPrice",
        ]) || 0),
        weightGrams: Number(firstText(variant, ["variantWeight", "weight", "productWeight"]) || 0),
      };
    }).filter((variant) => variant.vid && variant.key);

    if (!variants.length) {
      const data = asRecord(root?.data);
      console.error("CJ product detail contained no usable variants:", {
        requestId: root?.requestId,
        dataKeys: data ? Object.keys(data) : [],
        variantArrayFound: rawVariants.length > 0,
        variantArraySampleKeys: asRecord(rawVariants[0]) ? Object.keys(asRecord(rawVariants[0])!) : [],
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
