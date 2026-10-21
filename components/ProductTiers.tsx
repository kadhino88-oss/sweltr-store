"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

export default function ProductTiers() {
  const [tier, setTierState] = useState(
    () => TIERS.find((item) => item.best)?.id ?? TIERS[0]?.id ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selected = TIERS.find((item) => item.id === tier);

  function setTier(id: string) {
    setTierState(id);
    track("select_kit", { tierId: id });
  }

  async function handleCheckout() {
    if (!selected) return;
    setLoading(true);
    setError(null);
    track("begin_checkout", { tierId: selected.id, price: selected.price });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: selected.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Impossible de créer la session de paiement");
      }
      window.location.href = data.url;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue, réessaie.");
      setLoading(false);
    }
  }

  return (
    <section id="gear" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
      <div className="mb-10 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-gold-deep">
          La boutique
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Choisis ton kit</h2>
      </div>

      {TIERS.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((item) => (
            <ProductCard
              key={item.id}
              tier={item}
              selected={tier === item.id}
              onSelect={() => setTier(item.id)}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-line bg-panel p-8 text-center text-muted">
          Les produits seront bientôt disponibles.
        </p>
      )}

      {selected && (
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-panel2 p-5 sm:flex-row sm:p-6">
          <div className="text-center sm:text-left">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{selected.name}</p>
            <p className="font-display text-2xl font-bold">{formatPrice(selected.price)}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-strong px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-gold disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Redirection..." : "Commander ce kit"}
          </button>
        </div>
      )}
      {error && <p className="mt-3 text-center text-sm text-magenta">{error}</p>}
    </section>
  );
}
