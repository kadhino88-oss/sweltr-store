"use client";

import Image from "next/image";
import Link from "next/link";
import type { Tier } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export default function ProductCard({
  tier,
  selected = false,
  onSelect,
}: {
  tier: Tier;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const images = (tier.cardImages.length ? tier.cardImages : tier.images).slice(0, 3);

  return (
    <article
      id={tier.id}
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-panel transition-all ${
        selected ? "border-gold-deep ring-2 ring-gold/30" : "border-line hover:border-gold/70"
      }`}
    >
      <div
        className="relative grid aspect-[4/3] overflow-hidden bg-panel2"
        style={{ gridTemplateColumns: `repeat(${Math.max(images.length, 1)}, minmax(0, 1fr))` }}
      >
        {images.map((image, index) => (
          <div key={image} className="relative min-w-0 overflow-hidden">
            <Image
              src={image}
              alt={tier.items[index] || tier.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              unoptimized
            />
          </div>
        ))}
        {tier.best && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-strong px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
            Le plus choisi
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gold-deep">
          {tier.tagline}
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">{tier.name}</h2>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-2xl font-bold text-ink">{formatPrice(tier.price)}</span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {onSelect && (
            <button
              type="button"
              onClick={onSelect}
              aria-pressed={selected}
              className={`min-h-11 flex-1 rounded-full px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
                selected
                  ? "bg-gold-strong text-ink"
                  : "border border-line text-ink hover:border-gold-deep"
              }`}
            >
              {selected ? "Kit sélectionné" : "Choisir ce kit"}
            </button>
          )}
          <Link
            href={`/produit/${tier.id}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line px-4 py-2 text-center font-display text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:border-gold-deep hover:bg-panel2"
          >
            Voir la fiche
          </Link>
        </div>
      </div>
    </article>
  );
}
