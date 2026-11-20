import { NextRequest, NextResponse } from "next/server";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { getCjBalance, getEligibleShippingOptions, getVariantCostAndStock, createCjOrder, prepareCjOrderForPayment, payCjOrder, findCjOrderByOrderNumber, isCjOrderPaid } from "@/lib/cj";
import { cjOrderItems, normalizeKitOrder } from "@/lib/kit-order";
import { getStripeClient } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/site";
import { SHIPPING_COUNTRIES } from "@/lib/shipping-countries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function validToken(req: NextRequest, expected: string) {
  const value = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  const supplied = Buffer.from(value);
  const required = Buffer.from(expected);
  return supplied.length === required.length && timingSafeEqual(supplied, required);
}

async function checkStripeReadiness() {
  const stripe = getStripeClient();
  if (!stripe) return { apiKeyValid: false, webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET), webhookReady: false, mode: "unavailable" };
  try {
    const [balance, endpoints] = await Promise.all([
      stripe.balance.retrieve(),
      stripe.webhookEndpoints.list({ limit: 100 }),
    ]);
    const expectedUrl = `${getSiteUrl().replace(/\/$/, "")}/api/webhooks/stripe`;
    const webhookReady = endpoints.data.some((endpoint) =>
      endpoint.status === "enabled"
      && endpoint.url?.replace(/\/$/, "") === expectedUrl
      && endpoint.enabled_events.includes("checkout.session.completed")
      && endpoint.enabled_events.includes("checkout.session.async_payment_succeeded")
    );
    return { apiKeyValid: true, webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET), webhookReady, mode: balance.livemode ? "live" : "test" };
  } catch {
    return { apiKeyValid: false, webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET), webhookReady: false, mode: "unverified" };
  }
}

export async function POST(req: NextRequest) {
  const token = process.env.SWELTR_SANDBOX_TEST_TOKEN;
  if (!token) return NextResponse.json({ error: "Test interne non configuré." }, { status: 503 });
  if (!validToken(req, token)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Requête invalide." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  const data = body as Record<string, unknown>;
  const tierId = typeof data.tierId === "string" ? data.tierId : "";
  const countryCode = typeof data.countryCode === "string" ? data.countryCode : "";
  if (!(SHIPPING_COUNTRIES as readonly string[]).includes(countryCode)) {
    return NextResponse.json({ error: "Destination invalide." }, { status: 400 });
  }

  const kit = normalizeKitOrder({ tierId });
  if (!kit) return NextResponse.json({ error: "Kit invalide." }, { status: 400 });

  try {
    const lines = cjOrderItems(kit);
    if (!lines.length) throw new Error("Aucune variante fournisseur liée à ce kit.");
    const stock = await Promise.all(lines.map((line) => getVariantCostAndStock(line.vid)));
    if (stock.some((variant, index) => variant.availableQuantity < lines[index].quantity)) {
      throw new Error("Stock fournisseur insuffisant pour le test.");
    }
    const freight = await getEligibleShippingOptions(countryCode, lines);
    if (!freight.length) throw new Error("Aucun transporteur ne respecte la limite de 10 jours.");
    const cjBalance = await getCjBalance();
    const requiredBalance = stock.reduce((sum, variant, index) => sum + variant.costUsd * lines[index].quantity, 0) + freight[0].costUsd;
    if (cjBalance < requiredBalance) throw new Error("Le solde CJ ne couvre pas le coût fournisseur estimé pour cette commande.");

    const addressByCountry: Record<string, { name: string; city: string; state: string; postal: string; street: string }> = {
      CH: { name: "SWELTR Test", city: "Zurich", state: "ZH", postal: "8000", street: "1 Teststrasse" },
      FR: { name: "SWELTR Test", city: "Paris", state: "Ile-de-France", postal: "75001", street: "1 Rue Test" },
      GB: { name: "SWELTR Test", city: "London", state: "England", postal: "SW1A 1AA", street: "1 Test Street" },
      CA: { name: "SWELTR Test", city: "Toronto", state: "Ontario", postal: "M5H 2N2", street: "1 Test Street" },
      US: { name: "SWELTR Test", city: "New York", state: "NY", postal: "10001", street: "1 Test Street" },
    };
    const address = addressByCountry[countryCode];
    if (!address) throw new Error("Cette destination n’est pas activée pour le test sandbox.");

    const orderNumber = `SWELTR-SANDBOX-${Date.now()}-${randomBytes(4).toString("hex")}`;
    const order = await createCjOrder({
      orderNumber,
      shippingCustomerName: address.name,
      shippingCountryCode: countryCode,
      shippingProvince: address.state,
      shippingCity: address.city,
      shippingAddress: address.street,
      shippingZip: address.postal,
      shippingPhone: "+41000000000",
      email: "sandbox@sweltr-store.test",
    }, lines, freight[0].logisticName, { isSandbox: true });
    const prepared = await prepareCjOrderForPayment(order.orderId, order.shipmentOrderId);
    await payCjOrder(prepared.shipmentOrderId, prepared.payId, { isSandbox: true });
    const confirmed = await findCjOrderByOrderNumber(orderNumber);
    if (!confirmed || !isCjOrderPaid(confirmed.orderStatus)) {
      throw new Error("CJ n’a pas confirmé la commande sandbox comme payée.");
    }
    const stripe = await checkStripeReadiness();

    return NextResponse.json({
      sandbox: true,
      orderCreated: Boolean(order.orderId),
      orderPrepared: Boolean(prepared.shipmentOrderId),
      simulatedPaymentAccepted: true,
      orderStatus: confirmed.orderStatus,
      deliveryEstimateDays: freight[0].maxDays,
      positiveCjBalance: cjBalance > 0,
      cjBalanceSufficientForSample: true,
      stripe,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Test fournisseur échoué.";
    console.error("Échec du test sandbox CJ SWELTR:", message);
    return NextResponse.json({ sandbox: true, error: message }, { status: 422, headers: { "Cache-Control": "no-store" } });
  }
}
