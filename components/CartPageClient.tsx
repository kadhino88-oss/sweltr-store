"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export default function CartPageClient() {
  const { items, ready, setQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const details = useMemo(() => items.flatMap((item) => {
    const tier = TIERS.find((candidate) => candidate.id === item.tierId);
    return tier ? [{ ...item, tier }] : [];
  }), [items]);
  const subtotal = details.reduce((sum, item) => sum + item.tier.price * item.quantity, 0);

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: details.map(({ tierId, quantity }) => ({ tierId, quantity })) }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.url !== "string") throw new Error(result.error || "Le paiement est momentanément indisponible.");
      window.location.assign(result.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Impossible d’ouvrir le paiement. Réessaie plus tard.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 md:py-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[.22em] text-amber-700">Votre sélection SWELTR</p>
        <h1 className="mt-2 font-display text-3xl font-black md:text-4xl">Mon panier</h1>
        {!ready ? <div role="status" className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">Chargement du panier…</div> : details.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-50 text-amber-800"><ShoppingBag size={25}/></span>
            <h2 className="mt-5 text-2xl font-bold">Ton panier est vide</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Découvre les trois kits d’hiver et ajoute ceux que tu souhaites comparer ou commander.</p>
            <Link href="/boutique" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Voir les kits <ArrowRight size={16}/></Link>
          </section>
        ) : (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
            <section aria-label="Articles dans le panier" className="space-y-4">
              {details.map(({ tier, tierId, quantity }) => <article key={tierId} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[132px_1fr] sm:p-5">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                  <Image src={tier.cardImages[0] || tier.images[0]} alt={tier.items[0] || tier.name} fill sizes="132px" className="object-contain p-2"/>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-700">Kit hiver</p><h2 className="mt-1 text-lg font-bold">{tier.name}</h2><p className="mt-1 text-xs leading-5 text-slate-600">{tier.items.join(" · ")}</p></div>
                    <p className="text-lg font-black">{formatPrice(tier.price * quantity)}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-slate-200">
                      <button type="button" onClick={() => setQuantity(tierId, quantity - 1)} aria-label={`Diminuer la quantité de ${tier.name}`} className="grid h-10 w-10 place-items-center rounded-l-full transition hover:bg-amber-50"><Minus size={15}/></button>
                      <span className="min-w-10 text-center text-sm font-bold" aria-label={`Quantité : ${quantity}`}>{quantity}</span>
                      <button type="button" onClick={() => setQuantity(tierId, quantity + 1)} disabled={quantity >= 10} aria-label={`Augmenter la quantité de ${tier.name}`} className="grid h-10 w-10 place-items-center rounded-r-full transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"><Plus size={15}/></button>
                    </div>
                    <button type="button" onClick={() => removeItem(tierId)} className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-red-700"><Trash2 size={15}/> Retirer</button>
                  </div>
                </div>
              </article>)}
              <Link href="/boutique" className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-amber-800 hover:text-slate-950"><ArrowRight size={15} className="rotate-180"/> Continuer mes achats</Link>
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-bold">Récapitulatif</h2>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm"><span className="text-slate-600">Sous-total des kits</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
              <p className="mt-3 text-xs leading-5 text-slate-500">Les modalités de livraison dépendent de la destination et sont détaillées avant le paiement.</p>
              <button type="button" onClick={checkout} disabled={loading || !ready || details.length === 0} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60">
                {loading && <Loader2 size={16} className="animate-spin"/>}{loading ? "Ouverture du paiement…" : "Continuer vers le paiement"}
              </button>
              {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm leading-5 text-red-800">{error}</p>}
              <p className="mt-3 text-center text-[11px] text-slate-500">Le total des kits est affiché avant la validation. Le panier reste enregistré sur cet appareil.</p>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
