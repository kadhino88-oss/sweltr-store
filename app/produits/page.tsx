import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import { WINTER_PRODUCTS } from "@/lib/winter-products";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";

const siteUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app")).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Catalogue hiver : tous les produits SWELTR",
  description: "Retrouvez les produits et accessoires d’hiver SWELTR : gants chauffants, écharpe USB, chaussettes thermiques et prochaines nouveautés. Consultez les fiches détaillées.",
  alternates: { canonical: `${siteUrl}/produits` },
  openGraph: { title: "Catalogue hiver SWELTR", description: "Tous les produits d’hiver SWELTR et leurs fiches détaillées.", url: `${siteUrl}/produits`, siteName: "SWELTR", locale: "fr_CH", type: "website" },
};

export default function ProductsCatalogPage() {
  const active = WINTER_PRODUCTS.filter((product) => product.availability === "existing");
  const planned = WINTER_PRODUCTS.filter((product) => product.availability === "planned");
  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <header className="bg-[#10151D] px-5 py-12 text-white md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-sm text-white/65 hover:text-white">← Accueil SWELTR</Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.22em] text-amber-300">Catalogue officiel</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black md:text-6xl">Tous les produits d’hiver.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-lg">Parcourez les articles qui composent nos kits et découvrez les nouveautés en préparation. Les produits en préparation ne sont pas encore proposés à l’achat.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/boutique" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950">Comparer les kits <ArrowRight size={16}/></Link></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-14">
        <section className="mb-14">
          <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">Prix confirmés</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">Les kits SWELTR disponibles</h2><p className="mt-2 text-sm text-slate-600">Ces prix sont déjà définis et restent affichés. Seuls les produits encore en sélection fournisseur portent la mention « prix à confirmer ».</p></div>
          <div className="grid gap-4 md:grid-cols-3">{TIERS.map((tier) => <article key={tier.id} id={tier.id} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">{tier.tagline}</p><h3 className="mt-2 text-lg font-bold">{tier.name}</h3><p className="mt-3 text-3xl font-black">{formatPrice(tier.price)}</p><ul className="mt-3 space-y-1 text-sm text-slate-600">{tier.items.map((item) => <li key={item}>✓ {item}</li>)}</ul><Link href={`/produit/${tier.id}`} className="mt-5 flex min-h-11 items-center justify-center rounded-full bg-amber-300 px-4 text-sm font-bold hover:bg-amber-200">Voir le kit</Link></article>)}</div>
        </section>
        <section>
          <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">Disponibles dans les kits</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">Les essentiels SWELTR</h2><p className="mt-2 text-sm text-slate-600">Les prix sont affichés au niveau du kit, afin de ne pas inventer de prix unitaires non validés.</p></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((product) => (
              <article key={product.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Link href={`/produits/${product.slug}`} className="block">
                  <div className="relative aspect-[4/3] bg-white"><Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized className="object-contain p-5"/></div>
                </Link>
                <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">{product.category}</p><h3 className="mt-2 text-xl font-bold">{product.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{product.short}</p><p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700"><CheckCircle2 size={15}/> Inclus dans un ou plusieurs kits</p><Link href={`/produits/${product.slug}`} className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:border-amber-500">Voir la fiche détaillée <ArrowRight size={15}/></Link></div>
              </article>
            ))}
          </div>
        </section>
        <section className="mt-14">
          <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Nouveautés en préparation</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">Les prochaines collections</h2><p className="mt-2 text-sm text-slate-600">Ces produits sont présentés pour informer sur la sélection à venir. Leur prix, leur stock et leurs variantes doivent être confirmés avant leur mise en vente.</p></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((product) => (
              <article key={product.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Link href={`/produits/${product.slug}`} className="block"><div className="relative aspect-[4/3] bg-white"><Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized className="object-contain p-5"/></div></Link>
                <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">{product.category}</p><h3 className="mt-2 text-xl font-bold">{product.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{product.short}</p><p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-amber-800"><Clock3 size={15}/> Bientôt disponible · prix à confirmer</p><Link href={`/produits/${product.slug}`} className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:border-amber-500">Découvrir le produit <ArrowRight size={15}/></Link></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
