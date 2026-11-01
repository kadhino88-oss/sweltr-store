import { TIERS, type Tier } from "@/lib/data";

export type KitOrderLine = { tier: Tier; tierId: string; quantity: number };
export type CjOrderLine = { vid: string; quantity: number };

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

export function kitOrderTotalCents(items: KitOrderLine[]): number {
  return items.reduce((total, item) => total + Math.round(item.tier.price * 100) * item.quantity, 0);
}

export function cjOrderItems(items: KitOrderLine[]): CjOrderLine[] {
  const quantities = new Map<string, number>();
  for (const item of items) {
    for (const product of item.tier.cjItems ?? []) {
      if (!product.vid || !Number.isInteger(product.quantity) || product.quantity < 1) continue;
      quantities.set(product.vid, (quantities.get(product.vid) ?? 0) + product.quantity * item.quantity);
    }
  }
  return Array.from(quantities, ([vid, quantity]) => ({ vid, quantity }));
}
