import { NextRequest, NextResponse } from "next/server";
import { CJ_API_BASE_URL, getCjAccessToken } from "@/lib/cj";

/**
 * Outil d'administration : recherche les variantes d'un produit CJ par SKU.
 * Le secret d'administration doit être envoyé dans l'en-tête x-admin-secret,
 * jamais dans l'URL, afin d'éviter son exposition dans les journaux et historiques.
 */
export async function GET(req: NextRequest) {
  const sku = req.nextUrl.searchParams.get("sku")?.trim();
  const providedSecret = req.headers.get("x-admin-secret");
  const expectedSecret = process.env.ADMIN_SECRET;

  if (!expectedSecret || !providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json(
      { error: "Non autorisé." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!sku) {
    return NextResponse.json(
      { error: "Ajoute le paramètre sku à l'URL." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const { accessToken } = await getCjAccessToken();
    const response = await fetch(
      `${CJ_API_BASE_URL}/product/myProduct/query?keyword=${encodeURIComponent(sku)}`,
      {
        headers: { "CJ-Access-Token": accessToken },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Recherche de variante CJ échouée avec HTTP", response.status);
      return NextResponse.json(
        { error: "Le fournisseur n'a pas pu traiter la recherche. Réessaie plus tard." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const data = await response.json();

    if (!data.result) {
      console.error("Recherche de variante CJ refusée par le fournisseur.");
      return NextResponse.json(
        { error: "Recherche impossible. Vérifie le SKU et la configuration CJ." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { result: data.data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: unknown) {
    console.error(
      "Erreur de recherche de variante CJ :",
      error instanceof Error ? error.message : String(error),
    );
    return NextResponse.json(
      { error: "Erreur interne pendant la recherche. Consulte les journaux serveur." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
