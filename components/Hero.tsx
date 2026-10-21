import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_IMAGES } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-[#F5F7FB]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-gold/20 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:px-12 md:py-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-strong">
            SWELTR · Collection hiver
          </p>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight md:text-6xl">
            L’hiver dehors. Le confort avec toi.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#D9DEE7] md:text-lg">
            Gants chauffants, écharpe et chaussettes thermiques : découvre les kits SWELTR.
          </p>
          <Link
            href="/boutique"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold-strong px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-gold"
          >
            Voir les kits <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          <Link
            href="/produit/solo"
            className="group relative row-span-2 min-h-[18rem] overflow-hidden rounded-2xl bg-panel2 md:min-h-[25rem]"
          >
            <Image
              src={PRODUCT_IMAGES.heatedGloves}
              alt="Gants chauffants SWELTR"
              fill
              priority
              sizes="(max-width: 768px) 60vw, 30vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-12 font-display text-sm font-semibold text-white">
              Gants chauffants
            </span>
          </Link>
          <Link
            href="/produit/duo"
            className="group relative min-h-[8.8rem] overflow-hidden rounded-2xl bg-panel2 md:min-h-0"
          >
            <Image
              src={PRODUCT_IMAGES.heatedScarf}
              alt="Écharpe chauffante SWELTR"
              fill
              sizes="(max-width: 768px) 40vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-3 pt-8 font-display text-xs font-semibold text-white md:text-sm">
              Écharpe chauffante
            </span>
          </Link>
          <Link
            href="/produit/trio"
            className="group relative min-h-[8.8rem] overflow-hidden rounded-2xl bg-panel2 md:min-h-0"
          >
            <Image
              src={PRODUCT_IMAGES.thermalSocks}
              alt="Chaussettes thermiques SWELTR"
              fill
              sizes="(max-width: 768px) 40vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-3 pt-8 font-display text-xs font-semibold text-white md:text-sm">
              Chaussettes thermiques
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
