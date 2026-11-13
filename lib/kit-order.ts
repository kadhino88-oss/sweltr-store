import { TIERS, type Tier } from "@/lib/data";
import { WINTER_PRODUCTS, type WinterProduct } from "@/lib/winter-products";

export type KitOrderLine = { tier: Tier; tierId: string; quantity: number };
export type StandaloneProductOrderLine = { product: WinterProduct; productSlug: string; quantity: number };
export type StoreOrderLine =
  | ({ kind: "kit" } & KitOrderLine)
  | ({ kind: "product" } & StandaloneProductOrderLine);
export type CjOrderLine = { vid: string; quantity: number };

const KIT_ITEMS: Record<string, CjOrderLine[]> = {
  solo: [{ vid: "42BD9CA6-6D95-4B26-8F20-A52375663923", quantity: 1 }],
  duo: [
    { vid: "42BD9CA6-6D95-4B26-8F20-A52375663923", quantity: 1 },
    { vid: "2410090540221610300", quantity: 1 },
  ],
  trio: [
    { vid: "42BD9CA6-6D95-4B26-8F20-A52375663923", quantity: 1 },
    { vid: "2410090540221610300", quantity: 1 },
    { vid: "1573872746495488003", quantity: 1 },
  ],
};

const STANDALONE_ITEMS: Record<string, CjOrderLine[]> = {
  "gants-chauffants": [{ vid: "42BD9CA6-6D95-4B26-8F20-A52375663923", quantity: 1 }],
  "echarpe-chauffante": [{ vid: "2410090540221610300", quantity: 1 }],
  "chaussettes-thermiques": [{ vid: "1573872746495488003", quantity: 1 }],
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

export function normalizeKitOrder(value: unknown): KitOrderLine[] | null {
  const request = asRecord(value);
  if (!request) return null;
  const rows = Array.isArray(request.items)
    ? request.items
    : typeof request.tierId === "string" ? [{ tierId: request.tierId, quantity: 1 }] : [];
  if (rows.length === 0 || rows.length > TIERS.length) return null;

  const quantities = new Map<string, number>();
  for (const raw of rows) {
    const row = asRecord(raw);
    if (!row || typeof row.tierId !== "string") return null;
    const tier = TIERS.find((candidate) => candidate.id === row.tierId);
    const quantity = row.quantity === undefined ? 1 : Number(row.quantity);
    if (!tier || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) return null;
    const total = (quantities.get(tier.id) ?? 0) + quantity;
    if (total > 10) return null;
    quantities.set(tier.id, total);
  }

  return TIERS.flatMap((tier) => {
    const quantity = quantities.get(tier.id);
    return quantity ? [{ tier, tierId: tier.id, quantity }] : [];
  });
}

export function normalizeStoreOrder(value: unknown): StoreOrderLine[] | null {
  const request = asRecord(value);
  if (!request) return null;
  const rows = Array.isArray(request.items)
    ? request.items
    : typeof request.tierId === "string" ? [{ tierId: request.tierId, quantity: 1 }]
      : typeof request.productSlug === "string" ? [{ productSlug: request.productSlug, quantity: 1 }] : [];
  if (rows.length === 0 || rows.length > TIERS.length + WINTER_PRODUCTS.length) return null;

  const quantities = new Map<string, number>();
  for (const raw of rows) {
    const row = asRecord(raw);
    if (!row) return null;
    const id = typeof row.tierId === "string" ? `kit:${row.tierId}`
      : typeof row.productSlug === "string" ? `product:${row.productSlug}` : null;
    if (!id) return null;
    const quantity = row.quantity === undefined ? 1 : Number(row.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return null;
    const total = (quantities.get(id) ?? 0) + quantity;
    if (total > 10) return null;
    quantities.set(id, total);
  }

  const normalized: StoreOrderLine[] = [];
  for (const [key, quantity] of quantities) {
    const [kind, id] = key.split(":", 2);
    if (kind === "kit") {
      const tier = TIERS.find((candidate) => candidate.id === id);
      if (!tier) return null;
      normalized.push({ kind: "kit", tier, tierId: id, quantity });
    } else {
      const product = WINTER_PRODUCTS.find((candidate) => candidate.slug === id && candidate.availability === "existing" && candidate.retailPrice !== undefined && STANDALONE_ITEMS[candidate.slug]);
      if (!product) return null;
      normalized.push({ kind: "product", product, productSlug: id, quantity });
    }
  }
  return normalized;
}

export function kitOrderTotalCents(items: KitOrderLine[]): number {
  return items.reduce((total, item) => total + Math.round(item.tier.price * 100) * item.quantity, 0);
}

export function storeOrderTotalCents(items: StoreOrderLine[]): number {
  return items.reduce((total, item) => {
    const price = item.kind === "kit" ? item.tier.price : item.product.retailPrice!;
    return total + Math.round(price * 100) * item.quantity;
  }, 0);
}

export function cjOrderItems(items: KitOrderLine[]): CjOrderLine[] {
  const quantities = new Map<string, number>();
  for (const item of items) {
    for (const product of KIT_ITEMS[item.tierId] ?? []) {
      if (!product.vid || !Number.isInteger(product.quantity) || product.quantity < 1) continue;
      quantities.set(product.vid, (quantities.get(product.vid) ?? 0) + product.quantity * item.quantity);
    }
  }
  return Array.from(quantities, ([vid, quantity]) => ({ vid, quantity }));
}

export function storeOrderItems(items: StoreOrderLine[]): CjOrderLine[] {
  const quantities = new Map<string, number>();
  for (const item of items) {
    const sourceLines = item.kind === "kit" ? KIT_ITEMS[item.tierId] : STANDALONE_ITEMS[item.productSlug];
    for (const product of sourceLines ?? []) {
      quantities.set(product.vid, (quantities.get(product.vid) ?? 0) + product.quantity * item.quantity);
    }
  }
  return Array.from(quantities, ([vid, quantity]) => ({ vid, quantity }));
}
