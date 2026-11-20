const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

test("Stripe checkout remains blocked in every mode until store release approval", () => {
  const route = read("app/api/checkout/route.ts");
  assert.match(route, /isStoreFulfillmentReady\(\)/);
  assert.match(route, /STORE_NOT_LAUNCH_READY/);
  assert.match(read(".env.local.example"), /STORE_SALES_ENABLED=false/);
});

test("live checkout requires sales approval and validated automatic CJ payment", () => {
  const readiness = read("lib/fulfillment-readiness.ts");
  assert.match(readiness, /STORE_SALES_ENABLED === "true"/);
  assert.match(readiness, /CJ_AUTO_PAY === "true"/);
  assert.match(readiness, /CJ_PAYMENT_FLOW_VALIDATED === "true"/);
  assert.match(read("app/api/webhooks/stripe/route.ts"), /checkout\.session\.async_payment_succeeded/);
  assert.match(read("app/api/webhooks/stripe/route.ts"), /isCjOrderPaid/);
});

test("unconfirmed thermal product never exposes supplier variants or an invented price", () => {
  const route = read("app/api/products/thermal-underwear/variants/route.ts");
  assert.match(route, /PRODUCT_NOT_LAUNCH_READY/);
  assert.match(route, /Bientôt disponible · prix à confirmer/);
  assert.match(route, /status: 503/);
  assert.doesNotMatch(route, /getCjAccessToken|supplierPrice|variantSellPrice/);
});

test("checkout blocks thermal-product requests before contacting Stripe", () => {
  const route = read("app/api/checkout/route.ts");
  const unavailable = route.indexOf('productType === "thermal-underwear"');
  const stripeClient = route.indexOf("const stripe = getStripeClient()");
  assert.notEqual(unavailable, -1, "checkout must explicitly block the planned item");
  assert.ok(stripeClient > unavailable, "the planned item must be blocked before creating a Stripe session");
  assert.match(route, /Bientôt disponible · prix à confirmer/);
});

test("planned product pages display the same unavailable status and hide buying actions", () => {
  const page = read("app/produits/[slug]/page.tsx");
  assert.match(page, /Bientôt disponible · prix à confirmer/);
  assert.match(page, /product\.availability === "existing"/);
  assert.match(page, /Voir les kits disponibles/);
  assert.doesNotMatch(page, /Stripe|supplierPrice/);
});

test("the example configuration keeps thermal product sales disabled", () => {
  assert.match(read(".env.local.example"), /THERMAL_PRODUCT_SALES_ENABLED=false/);
});
