import Image from "next/image";
import Link from "next/link";
import type { Tier } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ tier }: { tier: Tier }) {
  const images = (tier.cardImages.length ? tier.cardImages : tier.images).slice(0, 3);

  return (
    <article id={tier.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative grid aspect-[4/3] overflow-hidden bg-white" style={{ gridTemplateColumns: `repeat(${Math.max(images.length, 1)}, minmax(0, 1fr))` }}>
        {images.map((image, index) => <div key={image} className="relative min-w-0 overflow-hidden border-r border-slate-100 last:border-r-0">
          <Image src={image} alt={tier.items[index] || tier.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-2 transition-transform duration-500 hover:scale-105" />
        </div>)}
        <span className="absolute left-4 top-4 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-900">Kit hiver</span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-700">{tier.tagline}</p>
        <h2 className="mt-2 font-display text-xl font-bold text-slate-950">{tier.name}</h2>
        <ul className="mt-3 space-y-1.5 text-xs leading-5 text-slate-600">
          {tier.items.map((item) => <li key={item} className="flex items-start gap-2"><span className="mt-0.5 text-amber-600" aria-hidden="true">✓</span><span>{item}</span></li>)}
        </ul>
        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="font-display text-2xl font-black text-slate-950">{formatPrice(tier.price)}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <AddToCartButton tierId={tier.id} compact />
            <Link href={`/produit/${tier.id}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-center text-xs font-bold text-slate-800 transition hover:border-amber-500 hover:bg-amber-50">Détails du kit</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
