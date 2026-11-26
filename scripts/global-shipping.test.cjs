const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const countries = fs.readFileSync(path.join(root, "lib/shipping-countries.ts"), "utf8");
const checkout = fs.readFileSync(path.join(root, "app/api/checkout/route.ts"), "utf8");
const webhook = fs.readFileSync(path.join(root, "app/api/webhooks/stripe/route.ts"), "utf8");
const header = fs.readFileSync(path.join(root, "components/SiteHeader.tsx"), "utf8");
const cj = fs.readFileSync(path.join(root, "lib/cj.ts"), "utf8");
const shippingQuote = fs.readFileSync(path.join(root, "lib/shipping-quote.ts"), "utf8");
const cart = fs.readFileSync(path.join(root, "components/CartPageClient.tsx"), "utf8");
const shippingQuoteRoute = fs.readFileSync(path.join(root, "app/api/shipping-quote/route.ts"), "utf8");

test("international checkout includes the US, Canada, UK, and the full Stripe country set", () => {
  for (const code of ["US", "CA", "GB", "CH", "FR"]) assert.match(countries, new RegExp(`\\"${code}\\"`));
  const count = (countries.match(/"[A-Z]{2}"/g) || []).length;
  assert.ok(count > 150, `Expected a broad Stripe shipping set; found ${count} countries`);
  assert.match(checkout, /allowed_countries:\s*\[countryCode as typeof SHIPPING_COUNTRIES\[number\]\]/);
  assert.match(checkout, /shipping_options:\s*\[\{/);
  assert.match(checkout, /shippingAmountCents/);
  assert.match(webhook, /SHIPPING_COUNTRIES as readonly string\[\]/);
  assert.match(webhook, /refunds\.create/);
  assert.match(header, /International/);
});

test("checkout accepts only verified shipping estimates with a maximum of 10 days", () => {
  assert.match(cj, /getVariantCostAndStock/);
  assert.match(cj, /maxDays !== null/);
  assert.match(cj, /MAX_DELIVERY_DAYS = 10/);
  assert.match(cj, /filter\(\(option\) => option\.maxDays <= MAX_DELIVERY_DAYS\)/);
  assert.match(shippingQuote, /availableQuantity < line\.quantity/);
  assert.match(shippingQuote, /productCostCents >= storeOrderTotalCents/);
  assert.match(cart, /Calculer livraison et disponibilité/);
  assert.match(cart, /!quote/);
  assert.match(shippingQuoteRoute, /isStoreFulfillmentReady\(\)/);
});

test("public catalog images are local and every referenced image exists", () => {
  for (const relative of ["lib/data.ts", "lib/winter-products.ts"]) {
    const source = fs.readFileSync(path.join(root, relative), "utf8");
    assert.doesNotMatch(source, /https:\/\/[^"'\s]*(cjdropshipping|aliyuncs)\.com/i);
    for (const [, asset] of source.matchAll(/"(\/images\/catalog\/product-[a-f0-9]+\.jpg)"/g)) {
      assert.ok(fs.existsSync(path.join(root, "public", asset)), `Missing local product image: ${asset}`);
    }
  }
});
