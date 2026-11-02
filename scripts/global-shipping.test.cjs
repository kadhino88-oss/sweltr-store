const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const countries = fs.readFileSync(path.join(root, "lib/shipping-countries.ts"), "utf8");
const checkout = fs.readFileSync(path.join(root, "app/api/checkout/route.ts"), "utf8");
const webhook = fs.readFileSync(path.join(root, "app/api/webhooks/stripe/route.ts"), "utf8");
const header = fs.readFileSync(path.join(root, "components/SiteHeader.tsx"), "utf8");

test("international checkout includes the US, Canada, UK, and the full Stripe country set", () => {
  for (const code of ["US", "CA", "GB", "CH", "FR"]) assert.match(countries, new RegExp(`\\"${code}\\"`));
  const count = (countries.match(/"[A-Z]{2}"/g) || []).length;
  assert.ok(count > 150, `Expected a broad Stripe shipping set; found ${count} countries`);
  assert.match(checkout, /allowed_countries:\s*\[\.\.\.SHIPPING_COUNTRIES\]/);
  assert.match(webhook, /SHIPPING_COUNTRIES as readonly string\[\]/);
  assert.match(header, /International/);
});
