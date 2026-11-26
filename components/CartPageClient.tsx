"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { TIERS, type Tier } from "@/lib/data";
import { WINTER_PRODUCTS } from "@/lib/winter-products";
import { formatPrice } from "@/lib/format";
import { SHIPPING_COUNTRIES } from "@/lib/shipping-countries";
import KitCompositionImage from "@/components/KitCompositionImage";

type CartDisplayItem = {
  id: string;
  kind: "kit" | "product";
  quantity: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  tier?: Tier;
};

export default function CartPageClient() {
  const { items, ready, setQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [quoting, setQuoting] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("CH");
  const [quote, setQuote] = useState<{ countryCode: string; itemsKey: string; shippingAmountCents: number; maxDays: number } | null>(null);
  const details = useMemo<CartDisplayItem[]>(() => items.flatMap<CartDisplayItem>((item) => {
    if (item.tierId) {
      const tier = TIERS.find((candidate) => candidate.id === item.tierId);
      return tier ? [{ id: item.tierId, kind: "kit", quantity: item.quantity, name: tier.name, description: tier.items.join(" · "), price: tier.price, tier }] : [];
    }
    const product = WINTER_PRODUCTS.find((candidate) => candidate.slug === item.productSlug && candidate.availability === "existing" && candidate.retailPrice !== undefined);
    return product ? [{ id: product.slug, kind: "product" as const, quantity: item.quantity, name: product.name, description: product.short, price: product.retailPrice!, image: product.image }] : [];
  }), [items]);
  const subtotal = details.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderItems = useMemo(() => details.map(({ id, kind, quantity }) => kind === "kit" ? { tierId: id, quantity } : { productSlug: id, quantity }), [details]);
  const itemsKey = JSON.stringify(orderItems);
  const countryNames = useMemo(() => new Intl.DisplayNames(["fr"], { type: "region" }), []);
  const countries = useMemo(() => SHIPPING_COUNTRIES.map((code) => ({ code, name: countryNames.of(code) || code })).filter((entry) => entry.name !== entry.code).sort((a, b) => a.name.localeCompare(b.name, "fr")), [countryNames]);

  useEffect(() => { setQuote(null); }, [itemsKey, countryCode]);

  async function calculateShipping() {
    setQuoting(true);
    setError("");
    setQuote(null);
    try {
      const response = await fetch("/api/shipping-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems, countryCode }),
      });
      const result = await response.json();
      if (!response.ok || !Number.isInteger(result.shippingAmountCents) || !Number.isInteger(result.maxDays)) throw new Error(result.error || "Le tarif de livraison n’a pas pu être calculé.");
      setQuote({ countryCode, itemsKey, shippingAmountCents: result.shippingAmountCents, maxDays: result.maxDays });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Aucun mode de livraison conforme n’est disponible pour cette destination.");
    } finally { setQuoting(false); }
  }

  async function checkout() {
    if (!quote || quote.countryCode !== countryCode || quote.itemsKey !== itemsKey) {
      setError("Calcule les frais de livraison avant de poursuivre.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems, countryCode }),
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
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Découvre les kits d’hiver et les accessoires à l’unité.</p>
            <Link href="/boutique" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Voir les kits <ArrowRight size={16}/></Link>
          </section>
        ) : (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
            <section aria-label="Articles dans le panier" className="space-y-4">
              {details.map(({ id, kind, name, description, price, image, tier, quantity }) => <article key={`${kind}:${id}`} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[132px_1fr] sm:p-5">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                  {kind === "kit" && tier
                    ? <KitCompositionImage tier={tier} className="h-full w-full" />
                    : image && <Image src={image} alt={name} fill sizes="132px" className="object-contain p-2"/>}
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-700">{kind === "kit" ? "Kit hiver" : "À l’unité"}</p><h2 className="mt-1 text-lg font-bold">{name}</h2><p className="mt-1 text-xs leading-5 text-slate-600">{description}</p></div>
                    <p className="text-lg font-black">{formatPrice(price * quantity)}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-slate-200">
                      <button type="button" onClick={() => setQuantity(id, quantity - 1, kind)} aria-label={`Diminuer la quantité de ${name}`} className="grid h-10 w-10 place-items-center rounded-l-full transition hover:bg-amber-50"><Minus size={15}/></button>
                      <span className="min-w-10 text-center text-sm font-bold" aria-label={`Quantité : ${quantity}`}>{quantity}</span>
                      <button type="button" onClick={() => setQuantity(id, quantity + 1, kind)} disabled={quantity >= 10} aria-label={`Augmenter la quantité de ${name}`} className="grid h-10 w-10 place-items-center rounded-r-full transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"><Plus size={15}/></button>
                    </div>
                    <button type="button" onClick={() => removeItem(id, kind)} className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-red-700"><Trash2 size={15}/> Retirer</button>
                  </div>
                </div>
              </article>)}
              <Link href="/boutique" className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-amber-800 hover:text-slate-950"><ArrowRight size={15} className="rotate-180"/> Continuer mes achats</Link>
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-bold">Récapitulatif</h2>
              <label htmlFor="shipping-country" className="mt-5 block text-sm font-semibold">Pays de livraison</label>
              <select id="shipping-country" value={countryCode} onChange={(event) => setCountryCode(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200">
                {countries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
              </select>
              <button type="button" onClick={calculateShipping} disabled={quoting || !ready || details.length === 0} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold transition hover:border-amber-500 hover:bg-amber-50 disabled:opacity-50">
                {quoting && <Loader2 size={14} className="animate-spin"/>}{quoting ? "Calcul des frais…" : "Calculer livraison et disponibilité"}
              </button>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm"><span className="text-slate-600">Sous-total</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
              {quote && <><div className="mt-3 flex items-center justify-between gap-3 text-sm"><span className="text-slate-600">Livraison calculée</span><span className="font-bold">{formatPrice(quote.shippingAmountCents / 100)}</span></div><p className="mt-2 text-xs leading-5 text-slate-500">Mode disponible · délai estimé jusqu’à {quote.maxDays} jours.</p></>}
              <button type="button" onClick={checkout} disabled={loading || !ready || details.length === 0 || !quote || quote.countryCode !== countryCode || quote.itemsKey !== itemsKey} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60">
                {loading && <Loader2 size={16} className="animate-spin"/>}{loading ? "Ouverture du paiement…" : "Continuer vers le paiement"}
              </button>
              {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm leading-5 text-red-800">{error}</p>}
              <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">Le montant est d’abord réservé sur la carte, puis encaissé après confirmation de la commande. Si elle ne peut pas être confirmée, la réservation est annulée ; le délai d’affichage dépend de la banque.</p>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
