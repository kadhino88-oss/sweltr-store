const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

test("customer checkout is not offered unless CJ balance payment is enabled and validated", () => {
  const checkout = read("app/api/checkout/route.ts");
  const gate = read("lib/fulfillment-readiness.ts");
  assert.match(checkout, /isStoreFulfillmentReady\(\)/);
  assert.match(gate, /CJ_AUTO_PAY === "true"/);
  assert.match(gate, /CJ_PAYMENT_FLOW_VALIDATED === "true"/);
  assert.match(read("lib/shipping-quote.ts"), /getCjBalance/);
});

test("card funds are authorized first and captured only after provider payment is confirmed", () => {
  const checkout = read("app/api/checkout/route.ts");
  const webhook = read("app/api/webhooks/stripe/route.ts");
  assert.match(checkout, /allowed_payment_method_types: \["card"\]/);
  assert.match(checkout, /capture_method: "manual"/);
  assert.match(webhook, /paymentIntents\.cancel\(paymentIntentId/);
  assert.match(webhook, /amount_to_capture: session\.amount_total/);
  const providerPaidCheck = webhook.indexOf("!paidOrder || !isCjOrderPaid(paidOrder.orderStatus)");
  const customerCaptureAfterProvider = webhook.indexOf("await captureCustomerPayment(stripe, session);", providerPaidCheck);
  assert.ok(providerPaidCheck >= 0, "CJ paid status must be verified");
  assert.ok(customerCaptureAfterProvider > providerPaidCheck, "customer capture must follow the CJ paid status check");
  assert.match(webhook, /sweltr-cj-unpaid-/);
  assert.match(webhook, /error instanceof CjPaymentRejectedError && currentOrder\?\.orderStatus\?\.toUpperCase\(\) === "UNPAID"/);
  assert.match(read("lib/cj.ts"), /class CjPaymentRejectedError extends Error/);
});

test("success page confirms only a captured card payment and a provider-paid order", () => {
  const page = read("app/succes/page.tsx");
  const client = read("components/SuccessPageClient.tsx");
  assert.match(page, /paymentIntent\?\.status !== "succeeded"/);
  assert.match(page, /status="pending" sessionId=\{sessionId\}/);
  assert.match(page, /isCjOrderPaid\(order\.orderStatus\)/);
  assert.match(client, /Commande en cours de confirmation/);
  assert.match(client, /Le montant est réservé sur ta carte/);
  assert.match(client, /Paiement non encaissé/);
  assert.match(client, /router\.refresh\(\)/);
});

test("webhook retries ambiguous CJ payment failures instead of acknowledging unpaid fulfillment", () => {
  const webhook = read("app/api/webhooks/stripe/route.ts");
  assert.match(webhook, /Paiement fournisseur non confirmé : nouvelle vérification nécessaire/);
  assert.match(webhook, /currentOrder\?\.orderStatus\?\.toUpperCase\(\) === "UNPAID"/);
  assert.match(webhook, /sweltr-cj-unpaid-/);
  assert.match(webhook, /payBalanceV2|payCjOrder/);
  assert.match(webhook, /statut CJ non confirmé/);
});

test("CJ marks sandbox orders explicitly and blocks real payment until validated", () => {
  const cj = read("lib/cj.ts");
  assert.match(cj, /options\.isSandbox \? \{ isSandbox: 1 \} : \{\}/);
  assert.match(cj, /!options\.isSandbox && process\.env\.CJ_PAYMENT_FLOW_VALIDATED !== "true"/);
  assert.match(cj, /shopping\/pay\/payBalanceV2/);
});

test("parallel CJ checks share one token request and retry transient auth throttling", () => {
  const cj = read("lib/cj.ts");
  assert.match(cj, /let pendingToken: Promise<string> \| null = null/);
  assert.match(cj, /if \(!pendingToken\)/);
  assert.match(cj, /res\.status === 429 && !pointsExhausted && attempt < 2/);
});
