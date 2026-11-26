const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

test("kit cards, product details, and cart render all included product images", () => {
  const data = read("lib/data.ts");
  const composition = read("components/KitCompositionImage.tsx");
  const showcase = read("components/WinterShowcase.tsx");
  const card = read("components/ProductCard.tsx");
  const detail = read("components/ProductDetailClient.tsx");
  const cart = read("components/CartPageClient.tsx");

  const imageLists = Array.from(data.matchAll(/cardImages:\s*\[([^\]]+)\]/g), (match) => match[1]);
  assert.deepEqual(imageLists.map((images) => images.split(",").length), [1, 2, 3]);
  assert.match(composition, /tier\.cardImages/);
  assert.match(composition, /tier\.items\.join/);
  assert.match(showcase, /<KitCompositionImage tier=\{tier\}/);
  assert.doesNotMatch(showcase, /src=\{tier\.cardImages\[0\]\}/);
  assert.match(card, /<KitCompositionImage tier=\{tier\}/);
  assert.match(detail, /activeImage === 0[\s\S]*<KitCompositionImage tier=\{tier\}/);
  assert.match(cart, /<KitCompositionImage tier=\{tier\}/);
});
