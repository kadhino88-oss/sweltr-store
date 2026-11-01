import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TIERS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ProductTiers() {
  return (
    <section id="kits" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 md:px-10 md:py-16">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[.22em] text-amber-700">Les essentiels pour l’hiver</p>
          <h2 className="mt-2 font-display text-3xl font-black text-slate-950 md:text-4xl">Nos kits de chaleur</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Choisis un kit selon les accessoires que tu veux réunir. Le contenu et le prix complet sont indiqués sur chaque fiche.</p>
        </div>
        <Link href="/boutique" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-amber-800 transition hover:text-slate-950">Voir toute la boutique <ArrowRight size={16}/></Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TIERS.map((tier) => <ProductCard key={tier.id} tier={tier} />)}
      </div>
    </section>
  );
}
