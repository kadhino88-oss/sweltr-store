import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getWinterProduct, WINTER_PRODUCTS } from "@/lib/winter-products";
import ThermalUnderwearProduct from "@/components/ThermalUnderwearProduct";

const siteUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app")).replace(/\/$/, "");

export function generateStaticParams() {
  return WINTER_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getWinterProduct(params.slug);
  if (!product) return {};
  const title = `${product.name} | SWELTR`;
  const description = `${product.short} Découvrez la collection hiver SWELTR et ses accessoires pour le froid.`;
  const productUrl = `${siteUrl}/produits/${product.slug}`;
  return {
    title,
    description,
    alternates: { canonical: productUrl },
    openGraph: {
      title, description, url: productUrl, siteName: "SWELTR", locale: "fr_CH",
      images: product.image ? [{ url: product.image, alt: product.alt }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default function WinterProductPage({ params }: { params: { slug: string } }) {
  const product = getWinterProduct(params.slug);
  if (!product) notFound();
  if (product.slug === "sous-vetements-thermiques") return <ThermalUnderwearProduct />;

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/produits" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"><ArrowLeft size={16} /> Retour au catalogue</Link><Link href="/boutique" className="text-sm font-semibold text-amber-800 hover:text-slate-950">Comparer les kits →</Link></div>
        <div className="mt-6 grid overflow-hidden rounded-[2rem] bg-white shadow-sm lg:grid-cols-2">
          <div className="bg-slate-100 p-3 md:p-5">
            <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-slate-200 md:min-h-[480px]">
              {product.image ? (
                <>
                  <Image src={product.image} alt={product.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" unoptimized className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-amber-100 p-8 text-center">
                  <span className="max-w-xs font-mono text-xs uppercase tracking-[.2em] text-slate-500">Photo du produit à venir</span>
                </div>
              )}
              <span className="absolute bottom-5 left-5 rounded-full border border-white/35 bg-black/35 px-4 py-2 font-mono text-[10px] uppercase tracking-[.2em] text-white backdrop-blur">{product.category}</span>
            </div>
            {(product.images?.length ?? 0) > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label="Galerie photos du produit">
                {product.images?.slice(0, 8).map((image, index) => (
                  <div key={image} className="relative aspect-square overflow-hidden rounded-xl border border-white bg-white">
                    <Image src={image} alt={`${product.name} — photo ${index + 1}`} fill sizes="(max-width: 640px) 30vw, 120px" unoptimized className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
            <p className="font-mono text-xs uppercase tracking-[.22em] text-amber-700">{product.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{product.short}</p>
            <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Disponibilité</p><p className="mt-1 text-sm font-semibold">{product.availability === "existing" ? "Inclus dans les kits SWELTR disponibles" : "Produit en préparation — non disponible à l’achat pour le moment"}</p><p className="mt-1 text-xs leading-5 text-slate-500">{product.availability === "existing" ? "Le tarif est affiché sur la fiche de chaque kit ; aucun prix unitaire n’est annoncé tant qu’il n’est pas validé." : "Le prix, les variantes, le stock et les frais d’expédition seront confirmés avant la mise en vente."}</p></div>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Disponibilité</p><p className="mt-1 text-sm font-semibold">{product.availability === "existing" ? "Inclus dans les kits SWELTR disponibles" : "Produit en préparation — non disponible à l’achat pour le moment"}</p><p className="mt-1 text-xs leading-5 text-slate-500">{product.availability === "existing" ? "Le tarif est affiché sur la fiche de chaque kit ; aucun prix unitaire n’est annoncé tant qu’il n’est pas validé." : "Le prix, les variantes, le stock et les frais d’expédition seront confirmés avant la mise en vente."}</p></div>
            <div className="mt-7 space-y-3">
              {product.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>{highlight}</span>
                </div>
              ))}
            </div>
            <Link href={product.href || "/boutique"} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              {product.availability === "existing" ? "Voir les kits et leurs prix" : "Voir les produits disponibles"} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {["Sélection soignée", "Informations transparentes", "Suisse & France"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-semibold text-slate-700">{item}</div>
          ))}
        </section>
      </div>
    </main>
  );
}
