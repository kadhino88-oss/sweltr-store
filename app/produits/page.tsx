import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Search } from "lucide-react";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SiteHeader from "@/components/SiteHeader";
import { TIERS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";
import { WINTER_PRODUCTS } from "@/lib/winter-products";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Produits d’hiver et kits SWELTR | Catalogue",
  description: "Découvrez les trois kits d’hiver SWELTR et les accessoires qu’ils contiennent. Comparez les prix confirmés et repérez les nouveautés en préparation.",
  alternates: { canonical: `${siteUrl}/produits` },
  openGraph: {
    title: "Catalogue des produits d’hiver SWELTR",
    description: "Comparez les kits d’hiver SWELTR, leurs articles inclus et les prochaines références en préparation.",
    url: `${siteUrl}/produits`, siteName: "SWELTR", locale: "fr_CH", type: "website",
  },
};

function matches(search: string, values: string[]) {
  return !search || values.some((value) => value.toLocaleLowerCase("fr-CH").includes(search));
}

export default async function ProductsCatalogPage({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawQuery = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q.trim().slice(0, 80) : "";
  const query = rawQuery.toLocaleLowerCase("fr-CH");
  const kits = TIERS.filter((tier) => matches(query, [tier.name, tier.tagline, tier.description, ...tier.items]));
  const active = WINTER_PRODUCTS.filter((product) => product.availability === "existing" && matches(query, [product.name, product.short, product.description, product.category]));
  const planned = WINTER_PRODUCTS.filter((product) => product.availability === "planned" && matches(query, [product.name, product.short, product.description, product.category]));
  const hasResults = kits.length > 0 || active.length > 0 || planned.length > 0;

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <SiteHeader />
      <header className="bg-[#10151D] px-4 py-9 text-white sm:px-6 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.22em] text-amber-300 sm:text-xs">Catalogue SWELTR · Collection hiver</p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl">Des accessoires d’hiver, réunis dans le kit qui te convient.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">Commence par comparer les trois kits et leur contenu exact. Les nouveautés restent identifiées comme en préparation tant que leur prix et leur disponibilité ne sont pas confirmés.</p>
          <form action="/produits" role="search" className="mt-6 flex max-w-xl items-center rounded-full border border-white/20 bg-white/5 pl-4 pr-1.5 focus-within:border-amber-300">
            <Search size={17} className="mr-2 shrink-0 text-white/55" aria-hidden="true" />
            <input name="q" type="search" defaultValue={rawQuery} placeholder="Rechercher un kit ou un accessoire…" aria-label="Rechercher dans le catalogue" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/45" />
            <button type="submit" className="min-h-10 rounded-full bg-amber-400 px-5 text-xs font-bold text-slate-950 transition hover:bg-amber-300">Rechercher</button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 md:py-12">
        {rawQuery && <p role="status" className="mb-6 text-sm text-slate-600">{hasResults ? `Résultats pour « ${rawQuery} »` : `Aucun produit trouvé pour « ${rawQuery} ».`} <Link href="/produits" className="font-semibold text-amber-800 underline underline-offset-4">Effacer la recherche</Link></p>}
        {!hasResults && <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Essaie un autre terme ou <Link href="/boutique" className="font-semibold text-amber-800 underline">compare les kits d’hiver</Link>.</div>}

        {kits.length > 0 && <section aria-labelledby="kits-title" className="mb-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-amber-700">Prix confirmés · en CHF</p><h2 id="kits-title" className="mt-2 font-display text-2xl font-black sm:text-3xl">Choisis ton kit d’hiver</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Un article pour les mains, ou une sélection plus complète : les articles inclus et le prix sont indiqués avant d’ajouter au panier.</p></div>
            {!rawQuery && <Link href="/boutique" className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-slate-950">Voir la boutique <ArrowRight size={16}/></Link>}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{kits.map((tier) => <ProductCard key={tier.id} tier={tier}/>)}</div>
        </section>}

        {active.length > 0 && <section aria-labelledby="accessoires-title" className="mb-12">
          <div className="mb-6"><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-amber-700">Inclus dans les kits disponibles</p><h2 id="accessoires-title" className="mt-2 font-display text-2xl font-black sm:text-3xl">Les accessoires, en détail</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Les prix unitaires ne sont pas affichés : ces articles sont proposés dans les kits dont le tarif complet est confirmé.</p></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((product) => <article key={product.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/produits/${product.slug}`} className="block"><div className="relative aspect-[4/3] bg-white"><Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-5"/></div></Link>
              <div className="p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-700">{product.category}</p><h3 className="mt-2 text-xl font-bold">{product.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{product.short}</p><p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-800"><CheckCircle2 size={15}/> Inclus dans les kits indiqués sur la fiche</p><Link href={`/produits/${product.slug}`} className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold transition hover:border-amber-500 hover:bg-amber-50">Voir la fiche détaillée <ArrowRight size={15}/></Link></div>
            </article>)}
          </div>
        </section>}

        {planned.length > 0 && <section id="nouveautes" aria-labelledby="planned-title" className="scroll-mt-24">
          <div className="mb-6"><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Nouveautés · sélection en cours</p><h2 id="planned-title" className="mt-2 font-display text-2xl font-black sm:text-3xl">Les prochaines références</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Ces articles ne sont pas ouverts à la commande. Leur modèle final, leurs variantes, le stock, le prix et les modalités de livraison doivent être confirmés.</p></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((product) => <article key={product.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/produits/${product.slug}`} className="block"><div className="relative aspect-[4/3] bg-white"><Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-5"/></div></Link>
              <div className="p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">{product.category}</p><h3 className="mt-2 text-xl font-bold">{product.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{product.short}</p><p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-amber-800"><Clock3 size={15}/> Bientôt disponible · prix à confirmer</p><Link href={`/produits/${product.slug}`} className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold transition hover:border-amber-500 hover:bg-amber-50">Voir l’état de la sélection <ArrowRight size={15}/></Link></div>
            </article>)}
          </div>
        </section>}
      </div>
      <Footer />
    </main>
  );
}
