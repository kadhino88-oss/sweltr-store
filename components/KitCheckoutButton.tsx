"use client";

import { useState } from "react";
import { Loader2, ShoppingBag } from "lucide-react";

export default function KitCheckoutButton({ tierId, label = "Commander ce kit" }: { tierId: string; label?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || "Le paiement est momentanément indisponible.");
      window.location.assign(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Réessaie.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={checkout} disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60">
        {loading ? <Loader2 size={17} className="animate-spin" /> : <ShoppingBag size={17} />}
        {loading ? "Ouverture du paiement…" : label}
      </button>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
