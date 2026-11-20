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
