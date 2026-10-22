const chfFormatter = new Intl.NumberFormat("fr-CH", {
  style: "currency",
  currency: "CHF",
});

export function formatPrice(price: number): string {
  return chfFormatter.format(price);
}
