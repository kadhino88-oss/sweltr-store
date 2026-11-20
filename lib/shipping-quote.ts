import { getCjBalance, getEligibleShippingOptions, getVariantCostAndStock } from "@/lib/cj";
import { storeOrderItems, storeOrderTotalCents, type StoreOrderLine } from "@/lib/kit-order";

export type StoreShippingQuote = {
  destinationCountry: string;
  logisticName: string;
  maxDays: number;
  shippingAmountCents: number;
  exchangeRate: number;
  productCostCents: number;
};

async function usdToChfRate() {
  const response = await fetch("https://api.frankfurter.dev/v2/rates?base=USD&quotes=CHF", {
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("Le taux de conversion CHF est temporairement indisponible.");
  const rates = await response.json() as Array<{ quote?: unknown; rate?: unknown }>;
  const rate = Number(rates.find((row) => row.quote === "CHF")?.rate);
  if (!Number.isFinite(rate) || rate <= 0) throw new Error("Le taux de conversion CHF n’a pas pu être vérifié.");
  return rate;
}

export async function createStoreShippingQuote(items: StoreOrderLine[], country: string, requestedLogisticName?: string): Promise<StoreShippingQuote> {
  if (!/^[A-Z]{2}$/.test(country)) throw new Error("Choisis un pays de livraison valide.");
  const supplierItems = storeOrderItems(items);
  if (!supplierItems.length) throw new Error("Les articles du panier ne sont pas associés à une variante disponible.");

  const variantIds = Array.from(new Set(supplierItems.map((item) => item.vid)));
  const variantResults = await Promise.all(variantIds.map(async (vid) => [vid, await getVariantCostAndStock(vid)] as const));
  const variants = new Map(variantResults);
  for (const line of supplierItems) {
    const variant = variants.get(line.vid);
    if (!variant || variant.availableQuantity < line.quantity) throw new Error("Un article de ton panier n’est plus disponible. Actualise le panier ou contacte-nous.");
  }

  const productCostUsd = supplierItems.reduce((sum, line) => sum + variants.get(line.vid)!.costUsd * line.quantity, 0);
  const rates = await getEligibleShippingOptions(country, supplierItems);
  const shipping = requestedLogisticName ? rates.find((option) => option.logisticName === requestedLogisticName) : rates[0];
  if (!shipping) throw new Error("Aucun transporteur disponible ne respecte le délai maximum de 10 jours pour ce pays.");
  const [exchangeRate, cjBalance] = await Promise.all([usdToChfRate(), getCjBalance()]);
  const productCostCents = Math.ceil(productCostUsd * exchangeRate * 100);
  if (productCostCents >= storeOrderTotalCents(items)) throw new Error("Cette sélection ne peut pas être commandée pour le prix affiché. Contacte-nous pour une vérification.");
  if (cjBalance < productCostUsd + shipping.costUsd) {
    throw new Error("Cette commande ne peut pas être préparée pour le moment.");
  }

  // 15% buffer for the daily reference rate and freight quote changing between checkout and fulfillment.
  const shippingAmountCents = Math.max(0, Math.ceil(shipping.costUsd * exchangeRate * 1.15 * 100));
  return {
    destinationCountry: country,
    logisticName: shipping.logisticName,
    maxDays: shipping.maxDays,
    shippingAmountCents,
    exchangeRate,
    productCostCents,
  };
}
