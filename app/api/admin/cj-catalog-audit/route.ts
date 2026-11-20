import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CURRENT_VARIANTS = [
  "42BD9CA6-6D95-4B26-8F20-A52375663923",
  "2410090540221610300",
  "1573872746495488003",
];

const SEARCH_TERMS = [
  "heated gloves",
  "USB heated scarf",
  "thermal fleece socks",
];

let lastCjRequestAt = 0;

function isAuthorized(req: NextRequest) {
  const expected = process.env.SWELTR_CJ_AUDIT_TOKEN ?? "";
  const supplied = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || expected.length !== supplied.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(supplied));
}

async function readJson(url: URL, token: string) {
  const waitMs = Math.max(0, 1_150 - (Date.now() - lastCjRequestAt));
  if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
  lastCjRequestAt = Date.now();
  const response = await fetch(url, {
    headers: { "CJ-Access-Token": token },
    cache: "no-store",
  });
  const body = await response.json().catch(() => ({})) as Record<string, any>;
  return { response, body };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const { accessToken } = await getCjAccessToken();
    lastCjRequestAt = Date.now();
    const balanceUrl = new URL(`${CJ_API_BASE_URL}/shopping/pay/getBalance`);
    const { response: balanceResponse, body: balanceBody } = await readJson(balanceUrl, accessToken);
    const supplierBalance = balanceBody.result === true && Number.isFinite(Number(balanceBody.data?.amount))
      ? Number(balanceBody.data.amount)
      : null;
    const currentVariants = [];
    for (const vid of CURRENT_VARIANTS) {
      const url = new URL(`${CJ_API_BASE_URL}/product/variant/queryByVid`);
      url.searchParams.set("vid", vid);
      url.searchParams.set("features", "enable_inventory");
      const { response, body } = await readJson(url, accessToken);
      const item = body.data && typeof body.data === "object" ? body.data as Record<string, any> : {};
      currentVariants.push(body.result === true ? {
        vid,
        ok: true,
        variantName: item.variantNameEn ?? item.variantKey ?? null,
        variantSku: item.variantSku ?? null,
        pid: item.pid ?? null,
        priceUsd: item.variantSellPrice ?? null,
        weightG: item.variantWeight ?? null,
        inventories: Array.isArray(item.inventories) ? item.inventories.map((row: Record<string, any>) => ({
          countryCode: row.countryCode ?? null,
          totalInventory: row.totalInventory ?? null,
          cjInventory: row.cjInventory ?? null,
          factoryInventory: row.factoryInventory ?? null,
        })) : [],
      } : { vid, ok: false, httpStatus: response.status, code: body.code ?? null, message: body.message ?? null });
    }

    const searches = [];
    for (const keyWord of SEARCH_TERMS) {
      const url = new URL(`${CJ_API_BASE_URL}/product/listV2`);
      url.searchParams.set("page", "1");
      url.searchParams.set("size", "5");
      url.searchParams.set("keyWord", keyWord);
      const { response, body } = await readJson(url, accessToken);
      const content = Array.isArray(body.data?.content) ? body.data.content : [];
      const products = content.flatMap((group: Record<string, any>) => Array.isArray(group.productList) ? group.productList : [])
        .slice(0, 5)
        .map((product: Record<string, any>) => ({
          pid: product.id ?? null,
          name: product.nameEn ?? null,
          sku: product.sku ?? product.spu ?? null,
          priceUsd: product.sellPrice ?? product.nowPrice ?? null,
          image: product.bigImage ?? null,
          inventory: product.warehouseInventoryNum ?? null,
          verifiedInventory: product.totalVerifiedInventory ?? null,
          deliveryCycle: product.deliveryCycle ?? null,
          productType: product.productType ?? null,
        }));
      const details = [];
      for (const product of products.slice(0, 2)) {
        if (!product.pid) continue;
        const detailUrl = new URL(`${CJ_API_BASE_URL}/product/query`);
        detailUrl.searchParams.set("pid", String(product.pid));
        const { response: detailResponse, body: detailBody } = await readJson(detailUrl, accessToken);
        const item = detailBody.data && typeof detailBody.data === "object" ? detailBody.data as Record<string, any> : {};
        details.push(detailBody.result === true ? {
          pid: item.pid ?? product.pid,
          productName: item.productNameEn ?? product.name,
          variants: Array.isArray(item.variants) ? item.variants.map((variant: Record<string, any>) => ({
            vid: variant.vid ?? null,
            name: variant.variantNameEn ?? null,
            variantKey: variant.variantKey ?? null,
            sku: variant.variantSku ?? null,
            priceUsd: variant.variantSellPrice ?? null,
            weightG: variant.variantWeight ?? null,
            inventories: Array.isArray(variant.inventories) ? variant.inventories.map((row: Record<string, any>) => ({
              countryCode: row.countryCode ?? null,
              totalInventory: row.totalInventory ?? null,
              cjInventory: row.cjInventory ?? null,
              factoryInventory: row.factoryInventory ?? null,
              verifiedWarehouse: row.verifiedWarehouse ?? null,
            })) : [],
          })) : [],
        } : {
          pid: product.pid,
          error: { httpStatus: detailResponse.status, code: detailBody.code ?? null, message: detailBody.message ?? null },
        });
      }
      searches.push(body.result === true
        ? { keyWord, products, details }
        : { keyWord, error: { httpStatus: response.status, code: body.code ?? null, message: body.message ?? null } });
    }

    return NextResponse.json({
      supplierBalance: { ok: balanceBody.result === true && supplierBalance !== null, httpStatus: balanceResponse.status, amountUsd: supplierBalance },
      currentVariants,
      searches,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "La recherche CJ n’a pas abouti." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
