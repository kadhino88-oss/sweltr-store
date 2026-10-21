import { NextRequest, NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

/**
 * Récupère le détail complet d'un produit CJ (toutes les photos + vidéo si
 * CJ en fournit une pour ce produit) à partir de son productId (pid).
 *
 * Usage : /api/admin/product-detail?pid=XXXX&secret=TON_ADMIN_SECRET
 */

export async function GET(req: NextRequest) {
  const pid = req.nextUrl.searchParams.get("pid");
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  if (!pid) {
    return NextResponse.json({ error: "Ajoute ?pid=LE_PRODUCT_ID à l'URL." }, { status: 400 });
  }

  try {
    const { accessToken: token } = await getCjAccessToken();
    const res = await fetch(`${CJ_API_BASE_URL}/product/query?pid=${encodeURIComponent(pid)}`, {
      headers: { "CJ-Access-Token": token },
    });
    const data = await res.json();

    if (!data.result) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    // On extrait juste ce qui nous intéresse pour ne pas noyer la réponse
    const d = data.data;
    return NextResponse.json({
      result: {
        productNameEn: d.productNameEn,
        productImageSet: d.productImageSet,
        productVideo: d.productVideo || null,
        bigImage: d.bigImage,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
