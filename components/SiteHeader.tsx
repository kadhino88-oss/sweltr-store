"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10151D]/95 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 md:gap-5 md:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="SWELTR accueil">
          <svg viewBox="0 0 56 40" className="h-9 w-12 shrink-0" aria-hidden="true">
            <path d="M3 34 20 17l7 8L38 8l15 26H3Z" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinejoin="round" />
            <path d="m11 34 12-11 6 7 7-8 10 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <span className="leading-tight"><span className="block font-display text-lg font-black tracking-[.1em] sm:text-xl">SWELTR<sup className="ml-0.5 align-top text-[9px]">®</sup></span><span className="hidden text-[9px] uppercase tracking-[.14em] text-white/60 sm:block">Comfort all year round</span></span>
        </Link>

        <form action="/produits" role="search" className="hidden w-full max-w-[300px] items-center rounded-full border border-white/20 bg-white/5 pl-4 pr-1.5 focus-within:border-amber-300 2xl:flex">
          <input name="q" type="search" placeholder="Rechercher un kit ou un produit…" className="min-w-0 flex-1 bg-transparent py-2.5 text-xs text-white outline-none placeholder:text-white/45" aria-label="Rechercher un produit ou un kit" />
          <button type="submit" aria-label="Rechercher" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-400 text-slate-950 transition hover:bg-amber-300"><Search size={16} /></button>
        </form>

        <div className="hidden items-center gap-4 text-[11px] font-semibold text-white/80 2xl:flex">
          <Link href="/" className="transition hover:text-amber-300">Accueil</Link>
          <Link href="/boutique" className="transition hover:text-amber-300">Boutique</Link>
          <Link href="/#saisons" className="transition hover:text-amber-300">Les saisons</Link>
          <Link href="/produits#nouveautes" className="transition hover:text-amber-300">Nouveautés</Link>
          <Link href="/guides" className="transition hover:text-amber-300">Guides</Link>
          <Link href="/a-propos" className="transition hover:text-amber-300">À propos</Link>
          <Link href="/contact" className="transition hover:text-amber-300">Contact</Link>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href="/panier" className="relative inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-3 text-xs font-semibold transition hover:border-amber-300 hover:text-amber-200" aria-label={`Panier, ${count} article${count === 1 ? "" : "s"}`}>
            <ShoppingCart size={18} /><span className="hidden sm:inline">Panier</span>
            {count > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white" aria-hidden="true">{count}</span>}
          </Link>
          <span className="hidden rounded-full border border-white/15 px-3 py-2 text-[10px] font-semibold tracking-wide text-white/80 md:inline-flex">FR <span className="mx-1 text-amber-300">/</span> CHF</span>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-amber-300 2xl:hidden" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {menuOpen && <div id="mobile-navigation" className="border-t border-white/10 bg-[#10151D] px-5 py-5 2xl:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm">
        <form action="/produits" role="search" className="flex items-center rounded-full border border-white/20 bg-white/5 pl-4 pr-1.5"><input name="q" type="search" placeholder="Rechercher un produit…" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/45" aria-label="Rechercher un produit ou un kit" /><button type="submit" aria-label="Rechercher" className="grid h-10 w-10 place-items-center rounded-full bg-amber-400 text-slate-950"><Search size={17} /></button></form>
        <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
        <Link href="/boutique" onClick={() => setMenuOpen(false)}>Boutique</Link>
        <Link href="/produits" onClick={() => setMenuOpen(false)}>Tous les produits</Link>
        <Link href="/#saisons" onClick={() => setMenuOpen(false)}>Les saisons</Link>
        <Link href="/produits#nouveautes" onClick={() => setMenuOpen(false)}>Nouveautés</Link>
        <Link href="/guides" onClick={() => setMenuOpen(false)}>Guides et conseils</Link>
        <Link href="/a-propos" onClick={() => setMenuOpen(false)}>À propos</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div></div>}
    </header>
  );
}
