import { NextRequest, NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

/**
 * Récupère le détail d'un produit CJ à partir de son productId (pid).
 * Le secret d'administration doit être envoyé dans x-admin-secret, jamais
 * dans l'URL où il pourrait être conservé dans les journaux ou historiques.
 */
export async function GET(req: NextRequest) {
  const pid = req.nextUrl.searchParams.get("pid")?.trim();
  const providedSecret = req.headers.get("x-admin-secret");
  const expectedSecret = process.env.ADMIN_SECRET;

  if (!expectedSecret || !providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json(
      { error: "Non autorisé." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!pid) {
    return NextResponse.json(
      { error: "Ajoute le paramètre pid à l'URL." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const { accessToken } = await getCjAccessToken();
    const response = await fetch(
      `${CJ_API_BASE_URL}/product/query?pid=${encodeURIComponent(pid)}`,
      {
        headers: { "CJ-Access-Token": accessToken },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Détail produit CJ indisponible (HTTP", response.status, ").");
      return NextResponse.json(
        { error: "Le fournisseur n'a pas pu traiter la demande. Réessaie plus tard." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const data = await response.json();

    if (!data.result || !data.data) {
      console.error("CJ n'a pas retourné de détail produit exploitable.");
      return NextResponse.json(
        { error: "Détail produit indisponible. Vérifie le productId et la configuration CJ." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const product = data.data;
    return NextResponse.json(
      {
        result: {
          productNameEn: product.productNameEn,
          productImageSet: product.productImageSet,
          productVideo: product.productVideo || null,
          bigImage: product.bigImage,
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: unknown) {
    console.error(
      "Erreur pendant la récupération du détail produit CJ :",
      error instanceof Error ? error.message : String(error),
    );
    return NextResponse.json(
      { error: "Erreur interne pendant la récupération du produit." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
