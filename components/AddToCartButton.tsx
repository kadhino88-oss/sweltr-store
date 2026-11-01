"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({ tierId, compact = false }: { tierId: string; compact?: boolean }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(tierId);
    setAdded(true);
  }

  return (
    <div className="flex flex-1 flex-col">
      <button
        type="button"
        onClick={handleAdd}
        className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-center text-xs font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${compact ? "sm:px-3" : ""}`}
      >
        {added ? <Check size={16} aria-hidden="true" /> : <ShoppingCart size={16} aria-hidden="true" />}
        {added ? "Ajouté au panier" : "Ajouter au panier"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{added ? "Article ajouté au panier." : ""}</span>
    </div>
  );
}
