import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      code: "PRODUCT_NOT_LAUNCH_READY",
      error: "Bientôt disponible · prix à confirmer.",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
