import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import AddProductToCartButton from "@/components/AddProductToCartButton";
import { formatPrice } from "@/lib/format";
import { WINTER_PRODUCTS } from "@/lib/winter-products";

export default function HomeProductGallery() {
  return (
    <section aria-labelledby="home-products-title" className="bg-[#F8F6F0] px-4 py-10 sm:px-6 md:px-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-amber-700 sm:text-xs">Collection hiver · articles individuels et kits</p>
            <h2 id="home-products-title" className="mt-2 font-display text-2xl font-black sm:text-3xl md:text-4xl">Tous les produits SWELTR</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Découvre les accessoires à l’unité ou choisis un kit. Les prix et le contenu sont visibles dès l’accueil.</p>
          </div>
          <Link href="/produits" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-amber-800 transition hover:text-slate-950">Voir tout le catalogue <ArrowRight size={16}/></Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WINTER_PRODUCTS.map((product) => (
            <article key={product.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/produits/${product.slug}`} className="block">
                <div className="relative aspect-[4/3] bg-white">
                  <Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain p-4" />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-amber-700">{product.category}</p>
                <h3 className="mt-1.5 font-display text-lg font-bold text-slate-950">{product.name}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">{product.short}</p>
                <div className="mt-auto pt-4">
                  <p className="font-display text-xl font-black text-slate-950">{product.retailPrice !== undefined ? formatPrice(product.retailPrice) : "Bientôt disponible · prix à confirmer"}</p>
                  {product.availability === "existing" ? (
                    <div className="mt-3 grid gap-2">
                      <AddProductToCartButton productSlug={product.slug} />
                      <Link href={`/produits/${product.slug}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-slate-300 px-3 text-xs font-semibold transition hover:border-amber-500 hover:bg-amber-50">Détails du produit <ArrowRight size={14}/></Link>
                    </div>
                  ) : (
                    <p className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-slate-500"><Clock3 size={14}/> En préparation</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
