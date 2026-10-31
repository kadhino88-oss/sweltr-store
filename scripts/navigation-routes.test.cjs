const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

test("kit cards link to the implemented kit detail route", () => {
  const card = read("components/ProductCard.tsx");
  assert.match(card, /href=\{\`\/produit\/\$\{tier\.id\}\`\}/);
  assert.ok(fs.existsSync(path.join(root, "app", "produit", "[tierId]", "page.tsx")));
  assert.doesNotMatch(card, /href=\{\`\/kits\/\$\{tier\.id\}\`\}/);
});

test("primary navigation links resolve to implemented pages", () => {
  const header = read("components/SiteHeader.tsx");
  const footer = read("components/Footer.tsx");
  for (const route of ["/boutique", "/guides", "/a-propos", "/livraison-retours", "/faq", "/contact", "/cgv", "/confidentialite", "/mentions-legales"]) {
    assert.ok(header.includes(route) || footer.includes(route), `navigation should include ${route}`);
    const pagePath = path.join(root, "app", route.slice(1), "page.tsx");
    assert.ok(fs.existsSync(pagePath), `route ${route} should have a page.tsx`);
  }
});
