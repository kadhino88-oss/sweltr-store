"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Snowflake, ShieldCheck, PackageCheck, Globe2 } from "lucide-react";
import { PRODUCT_IMAGES } from "@/lib/data";

export default function WinterShowcase() {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#10151D] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(245,190,80,.16),transparent_40%),linear-gradient(135deg,#0b111b,#172334_55%,#0b111b)]" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-12 md:grid-cols-[1.05fr_.95fr] md:px-10 md:py-20">
          <motion.div initial={reduceMotion ? false : {opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[.24em] text-amber-200 md:text-xs"><Snowflake size={15}/> Collection hiver SWELTR</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.03] tracking-tight sm:text-5xl md:text-7xl">Affrontez le froid.<br/><span className="bg-gradient-to-r from-amber-100 via-amber-300 to-white bg-clip-text text-transparent">Gardez le confort.</span></h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-lg">Gants chauffants, écharpe USB et chaussettes thermiques : découvrez nos kits d’hiver et comparez leur contenu avant de choisir.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/boutique" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">Voir les kits et produits <ArrowRight size={17}/></Link>
              <Link href="/produits" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Tout le catalogue</Link>
            </div>
            <p className="mt-4 text-xs text-white/45">Une sélection hivernale en cours d’évolution. Les articles en préparation sont signalés comme tels.</p>
          </motion.div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-amber-300/10 blur-3xl"/>
            <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] border border-white/15 bg-white/[.04] p-3 shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-white p-3"><Image src={PRODUCT_IMAGES.heatedGloves} alt="Gants chauffants pour les journées froides" fill sizes="(max-width: 768px) 45vw, 280px" unoptimized priority className="object-contain p-2"/></div>
              <div className="grid gap-3">
                <div className="relative min-h-0 overflow-hidden rounded-[1.4rem] bg-white p-3"><Image src={PRODUCT_IMAGES.heatedScarf} alt="Écharpe chauffante USB" fill sizes="(max-width: 768px) 45vw, 280px" unoptimized priority className="object-contain p-2"/></div>
                <div className="relative min-h-0 overflow-hidden rounded-[1.4rem] bg-white p-3"><Image src={PRODUCT_IMAGES.thermalSocks} alt="Chaussettes thermiques pour l’hiver" fill sizes="(max-width: 768px) 45vw, 280px" unoptimized priority className="object-contain p-2"/></div>
              </div>
              <div className="absolute bottom-6 left-6 rounded-full border border-white/25 bg-slate-950/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-amber-200 backdrop-blur">La sélection grand froid</div>
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-3 px-5 pb-10 md:grid-cols-3 md:px-10">
          {[{icon:PackageCheck,title:"Des kits détaillés",text:"Le contenu de chaque kit est indiqué."},{icon:ShieldCheck,title:"Informations transparentes",text:"Les caractéristiques sont précisées sur les fiches."},{icon:Globe2,title:"Boutique accessible",text:"Consultez le catalogue et les conditions de livraison."}].map(({icon:Icon,title,text})=><div key={title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-300/10 text-amber-200"><Icon size={19}/></span><span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs text-white/60">{text}</span></span></div>)}
        </div>
      </section>
    </>
  );
}
