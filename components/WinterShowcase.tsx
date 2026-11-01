"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Snowflake, ShieldCheck, PackageCheck, Globe2, Flower2, Sun, Leaf } from "lucide-react";
import { PRODUCT_IMAGES } from "@/lib/data";

const seasons = [
  { name: "Hiver", detail: "Kits grand froid", icon: Snowflake, active: true },
  { name: "Printemps", detail: "Collection en préparation", icon: Flower2, active: false },
  { name: "Été", detail: "Collection en préparation", icon: Sun, active: false },
  { name: "Automne", detail: "Collection en préparation", icon: Leaf, active: false },
];

export default function WinterShowcase() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-[#10151D] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(245,190,80,.18),transparent_38%),linear-gradient(135deg,#0b111b,#172334_55%,#0b111b)]" />
      <div className="mx-auto max-w-[1440px] px-4 pb-7 pt-5 sm:px-6 md:px-10 md:pb-10">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#10151D] shadow-2xl md:rounded-[2rem]">
          <div className="relative aspect-[16/9] min-h-[330px] sm:min-h-[420px] md:aspect-[2.15/1] md:min-h-[500px]">
            <Image src="https://sweltr-store-five.vercel.app/sweltr-hero.jpg" alt="Univers SWELTR : confort d’hiver, plaid douillet, gants chauffants, écharpe, chaussettes et quatre collections saisonnières" fill priority sizes="100vw" unoptimized className="object-cover object-center"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#07101c]/75 via-[#07101c]/20 to-transparent"/>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8 md:p-10">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-black/50 px-3 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-amber-200"><Snowflake size={14}/> Collection hiver</p>
                <h1 className="mt-3 text-3xl font-black leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">SWELTR — le confort <span className="text-amber-300">en toute saison.</span></h1>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white drop-shadow-md sm:text-base">Des trouvailles pour la maison, les voyages et le plein air. Découvrez nos kits d’hiver et préparez-vous à accueillir les prochaines collections saisonnières.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/boutique" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">Voir les kits et les prix <ArrowRight size={17}/></Link>
                <Link href="/produits" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/70 bg-black/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Tout le catalogue</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {seasons.map(({name,detail,icon:Icon,active})=><div key={name} className={`rounded-xl border px-3 py-3 md:px-4 ${active ? "border-amber-300/60 bg-amber-300/10" : "border-white/10 bg-white/[.03]"}`}><div className="flex items-center gap-2"><Icon size={16} className={active ? "text-amber-300" : "text-white/45"}/><span className={`text-sm font-bold ${active ? "text-white" : "text-white/65"}`}>{name}</span></div><p className="mt-1 text-[10px] leading-4 text-white/50">{detail}</p></div>)}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[{icon:PackageCheck,title:"Kits détaillés",text:"Le contenu de chaque kit est indiqué."},{icon:ShieldCheck,title:"Prix transparents",text:"36,99 CHF · 52,99 CHF · 62,99 CHF."},{icon:Globe2,title:"Une boutique évolutive",text:"Les nouvelles collections seront ajoutées quand les produits seront confirmés."}].map(({icon:Icon,title,text})=><div key={title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-300/10 text-amber-200"><Icon size={19}/></span><span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs text-white/60">{text}</span></span></div>)}
        </div>
      </div>
    </section>
  );
}
