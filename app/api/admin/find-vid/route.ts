import { NextRequest, NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

/**
 * Petit outil d'admin : cherche un produit déjà ajouté à "Mes produits" sur CJ
 * à partir de son SKU, et retourne ses variantes avec leur "vid" (l'identifiant
 * dont on a besoin pour créer des commandes automatiquement).
 *
 * Utilisation une fois déployé :
 * https://TON-SITE.vercel.app/api/admin/find-vid?sku=CJYD202348102BY&secret=TON_ADMIN_SECRET
 *
 * Protégé par ADMIN_SECRET pour que cette route ne soit pas librement
 * interrogeable par n'importe qui.
 */

export async function GET(req: NextRequest) {
  const sku = req.nextUrl.searchParams.get("sku");
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  if (!sku) {
    return NextResponse.json({ error: "Ajoute ?sku=TON_SKU à l'URL." }, { status: 400 });
  }

  try {
    const { accessToken: token } = await getCjAccessToken();
    const res = await fetch(
      `${CJ_API_BASE_URL}/product/myProduct/query?keyword=${encodeURIComponent(sku)}`,
      { headers: { "CJ-Access-Token": token } }
    );
    const data = await res.json();

    if (!data.result) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json({ result: data.data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
