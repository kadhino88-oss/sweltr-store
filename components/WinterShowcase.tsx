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
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-[#18263a] via-[#283849] to-[#6a3f2d] shadow-2xl md:rounded-[2rem]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,255,255,.16),transparent_35%),linear-gradient(90deg,rgba(7,12,20,.96)_0%,rgba(7,12,20,.82)_40%,rgba(7,12,20,.1)_100%)]" />
          <div className="absolute inset-y-0 right-0 hidden w-[64%] md:block">
            <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-90">
              <div className="relative overflow-hidden bg-white"><Image src={PRODUCT_IMAGES.heatedGloves} alt="Gants chauffants SWELTR" fill sizes="25vw" unoptimized className="object-contain p-5"/></div>
              <div className="relative overflow-hidden bg-white"><Image src={PRODUCT_IMAGES.heatedScarf} alt="Écharpe chauffante SWELTR" fill sizes="25vw" unoptimized className="object-contain p-5"/></div>
              <div className="relative overflow-hidden bg-white"><Image src={PRODUCT_IMAGES.thermalSocks} alt="Chaussettes thermiques SWELTR" fill sizes="25vw" unoptimized className="object-contain p-5"/></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111b2a] via-[#111b2a]/25 to-transparent" />
          </div>
          <div className="relative grid min-h-[380px] items-center px-6 py-9 sm:px-9 md:min-h-[450px] md:w-[62%] md:px-12 md:py-14">
            <motion.div initial={reduceMotion ? false : {opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-200 to-amber-500 font-black text-slate-950">S</span><span className="text-xl font-black tracking-[.14em]">SWELTR<span className="block text-[9px] font-medium tracking-[.24em] text-white/55">CONFORT EN TOUTE SAISON</span></span></div>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-black/20 px-3 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-amber-200"><Snowflake size={14}/> Collection hiver</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">Le confort commence <span className="text-amber-300">quand le froid arrive.</span></h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/80 md:text-base">Gants chauffants, écharpe USB et chaussettes thermiques : découvre nos kits d’hiver, compare leur contenu et choisis la chaleur qui te convient.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link href="/boutique" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">Voir les kits et les prix <ArrowRight size={17}/></Link><Link href="/produits" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Tout le catalogue</Link></div>
              <p className="mt-4 text-xs text-white/55">Prix des kits affichés dès 36,99 CHF · Nouveautés annoncées séparément.</p>
            </motion.div>
          </div>
          <div className="relative grid grid-cols-3 gap-2 border-t border-white/10 bg-black/20 p-3 md:hidden">
            {[{src:PRODUCT_IMAGES.heatedGloves,alt:"Gants chauffants"},{src:PRODUCT_IMAGES.heatedScarf,alt:"Écharpe chauffante"},{src:PRODUCT_IMAGES.thermalSocks,alt:"Chaussettes thermiques"}].map((p)=><div key={p.alt} className="relative h-28 overflow-hidden rounded-xl bg-white"><Image src={p.src} alt={p.alt} fill sizes="30vw" unoptimized className="object-contain p-2"/></div>)}
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
