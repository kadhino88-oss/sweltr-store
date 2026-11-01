"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Flower2, Leaf, ShieldCheck, Snowflake, Sun } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { PRODUCT_IMAGES, TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";

const seasons = [
  { name: "Hiver", detail: "Kits disponibles", icon: Snowflake, active: true },
  { name: "Printemps", detail: "En préparation", icon: Flower2, active: false },
  { name: "Été", detail: "En préparation", icon: Sun, active: false },
  { name: "Automne", detail: "En préparation", icon: Leaf, active: false },
];

export default function WinterShowcase() {
  const reduceMotion = useReducedMotion();
  const featured = TIERS.find((tier) => tier.id === "trio")!;
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" as const };

  return (
    <section className="overflow-hidden bg-[#10151D] text-white">
      <div className="mx-auto max-w-[1600px] px-3 pb-4 pt-3 sm:px-5 md:px-8 md:pb-6 md:pt-5">
        <div className="relative isolate overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#10151D] shadow-2xl md:rounded-[2rem]">
          <Image src="/images/sweltr-winter-hero.png" alt="Salon chaleureux face à un paysage de montagne enneigé" fill priority sizes="100vw" className="z-0 object-cover" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#08111d]/95 via-[#08111d]/75 to-[#08111d]/45 md:bg-gradient-to-r md:from-[#08111d]/95 md:via-[#08111d]/75 md:to-[#08111d]/20" />
          <div className="relative z-20 grid gap-6 px-4 py-5 sm:px-7 sm:py-7 xl:min-h-[470px] xl:grid-cols-[minmax(0,1fr)_340px] xl:items-center xl:gap-8 xl:px-10 xl:py-10">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="order-last max-w-3xl xl:order-none">
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-black/40 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-amber-200"><Snowflake size={14}/> Collection hiver</p>
              <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[.2em] text-amber-300 sm:text-sm">Confort en toute saison</p>
              <h1 className="mt-2 max-w-2xl font-display text-3xl font-black leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-6xl">SWELTR, les essentiels pour l’hiver.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7">Découvre nos trois kits d’hiver : gants chauffants, écharpe chauffante USB et chaussettes thermiques. Chaque fiche indique clairement les articles inclus et le prix du kit.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/boutique" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300">Découvrir les kits <ArrowRight size={17}/></Link>
                <Link href="/produits" className="inline-flex min-h-12 items-center rounded-full border border-white/60 bg-black/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Voir tous les produits</Link>
              </div>
            </motion.div>

            <motion.aside initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduceMotion ? 0 : 0.12 }} className="order-first w-full max-w-3xl justify-self-center rounded-2xl border border-white/20 bg-white/95 p-4 text-slate-950 shadow-2xl backdrop-blur-sm sm:p-5 xl:order-none xl:max-w-none">
              <div className="flex items-start justify-between gap-3">
                <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-amber-800">Kit complet · hiver</p><h2 className="mt-1 font-display text-xl font-black">{featured.name}</h2></div>
                <ShieldCheck size={20} className="mt-1 shrink-0 text-amber-700" aria-label="Contenu du kit détaillé" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[PRODUCT_IMAGES.heatedGloves, PRODUCT_IMAGES.heatedScarf, PRODUCT_IMAGES.thermalSocks].map((src, index) => <div key={src} className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                  <Image src={src} alt={featured.items[index]} fill sizes="(max-width: 640px) 24vw, 100px" className="object-contain p-1" />
                </div>)}
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-600">Gants chauffants · Écharpe chauffante USB · Chaussettes thermiques</p>
              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-slate-200 pt-3">
                <span className="text-xs font-semibold text-slate-600">Prix du kit complet</span>
                <span className="font-display text-2xl font-black">{formatPrice(featured.price)}</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-2">
                <Link href="/produit/trio" className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-900 transition hover:border-amber-500 hover:bg-amber-50">Détails du kit</Link>
                <AddToCartButton tierId={featured.id} compact />
              </div>
            </motion.aside>
          </div>
        </div>
      </div>

      <div className="border-y border-white/10 bg-black/20 px-3 py-4 sm:px-5 md:px-8">
        <div className="mx-auto grid max-w-[1540px] grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {[
            { title: "Trois kits", text: "Des contenus distincts à comparer." },
            { title: "Prix visibles", text: "36,99 · 52,99 · 62,99 CHF." },
            { title: "Fiches détaillées", text: "Articles inclus et consignes." },
            { title: "Sélection honnête", text: "Les nouveautés restent en préparation." },
          ].map(({ title, text }) => <div key={title} className="rounded-xl border border-white/10 bg-white/[.04] px-3 py-3 sm:px-4">
            <strong className="block text-xs font-bold text-white sm:text-sm">{title}</strong><span className="mt-1 block text-[10px] leading-4 text-white/65 sm:text-xs">{text}</span>
          </div>)}
        </div>
      </div>

      <div id="saisons" className="scroll-mt-20 px-3 py-4 sm:px-5 md:px-8 md:py-6">
        <div className="mx-auto grid max-w-[1540px] grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {seasons.map(({ name, detail, icon: Icon, active }) => active ? (
            <Link key={name} href="/boutique" className="group flex min-h-[94px] items-center gap-3 rounded-2xl border border-sky-300/60 bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950 p-3 transition hover:-translate-y-0.5 hover:border-amber-300 sm:min-h-[110px] sm:px-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/50 text-sky-100"><Icon size={25}/></span>
              <span><strong className="block text-base font-black uppercase tracking-wide sm:text-lg">{name}</strong><span className="mt-1 block text-[10px] text-white/70 sm:text-xs">{detail}</span></span><ArrowRight size={16} className="ml-auto shrink-0 text-amber-300 transition group-hover:translate-x-1"/>
            </Link>
          ) : (
            <div key={name} aria-label={`${name} : collection en préparation`} className="flex min-h-[94px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3 text-white/55 sm:min-h-[110px] sm:px-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15"><Icon size={23}/></span>
              <span><strong className="block text-base font-black uppercase tracking-wide sm:text-lg">{name}</strong><span className="mt-1 block text-[10px] text-white/50 sm:text-xs">En préparation</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
