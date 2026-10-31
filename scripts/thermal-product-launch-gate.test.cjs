const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

test("live Stripe checkout stays blocked until store release approval", () => {
  const route = read("app/api/checkout/route.ts");
  assert.match(route, /isLiveStripeKey = \/\^\(sk\|rk\)_live_\//);
  assert.match(route, /isLiveStripeKey && process\.env\.STORE_SALES_ENABLED !== "true"/);
  assert.match(route, /STORE_NOT_LAUNCH_READY/);
  assert.match(read(".env.local.example"), /STORE_SALES_ENABLED=false/);
});

test("thermal variants stay unavailable until supplier validation is explicitly enabled", () => {
  const route = read("app/api/products/thermal-underwear/variants/route.ts");
  assert.match(route, /THERMAL_PRODUCT_SALES_ENABLED !== "true"/);
  assert.match(route, /THERMAL_PRODUCT_NOT_LAUNCH_READY/);
  assert.match(route, /status: 503/);
});

test("thermal checkout is blocked server-side when the launch gate is off", () => {
  const route = read("app/api/checkout/route.ts");
  const gate = route.indexOf('process.env.THERMAL_PRODUCT_SALES_ENABLED !== "true"');
  const supplierLookup = route.indexOf("isValidThermalVariant(variantIdValue)");
  const stripeClient = route.indexOf("const stripe = getStripeClient()");
  assert.notEqual(gate, -1, "checkout route must enforce the launch gate");
  assert.ok(supplierLookup > gate, "launch gate must run before supplier variant lookup");
  assert.ok(stripeClient > gate, "launch gate must run before Stripe session creation");
});

test("the customer-facing page explains the supplier validation hold", () => {
  const component = read("components/ThermalUnderwearProduct.tsx");
  assert.match(component, /setVariantsMessage/);
  assert.match(component, /validation fournisseur/);
  assert.match(component, /disabled=\{loading \|\| !selectedVariant \|\| checkoutLoading\}/);
});

test("the example configuration keeps thermal product sales disabled by default", () => {
  const env = read(".env.local.example");
  assert.match(env, /THERMAL_PRODUCT_SALES_ENABLED=false/);
});
