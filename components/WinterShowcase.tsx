"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Leaf, Sun, Snowflake, CloudRain, Globe2, ShieldCheck, PackageCheck } from "lucide-react";
import { PRODUCT_IMAGES } from "@/lib/data";

const seasons = [
  { id: "winter", label: "Hiver", title: "Le Kit Grand Froid.", text: "Le trio confort : accessoires chauffants et chaussettes thermiques réunis dans un seul kit.", icon: Snowflake, image: "https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&w=1400&q=85", products: [{src:PRODUCT_IMAGES.heatedGloves,alt:"Gants chauffants"},{src:PRODUCT_IMAGES.heatedScarf,alt:"Écharpe chauffante"},{src:PRODUCT_IMAGES.thermalSocks,alt:"Chaussettes thermiques"}], color: "from-blue-950/90 via-blue-950/35" },
  { id: "spring", label: "Printemps", title: "Le renouveau vous va si bien.", text: "Des accessoires pratiques et légers pour les journées qui s’allongent et les escapades en plein air.", icon: Leaf, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=85", products: [{src:PRODUCT_IMAGES.heatedScarf,alt:"Accessoire confortable"}], color: "from-emerald-950/80 via-emerald-950/25" },
  { id: "summer", label: "Été", title: "Profitez de chaque rayon.", text: "Préparez vos voyages et vos aventures avec une sélection pensée pour bouger, explorer et voyager léger.", icon: Sun, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85", products: [{src:PRODUCT_IMAGES.thermalSocks,alt:"Accessoire de voyage"}], color: "from-amber-950/80 via-amber-950/25" },
  { id: "autumn", label: "Automne", title: "Accueillez la fraîcheur en douceur.", text: "Des compagnons confortables pour les journées pluvieuses, les promenades et le retour au cocooning.", icon: CloudRain, image: "https://images.unsplash.com/photo-1507371341162-763b5e419408?auto=format&fit=crop&w=1400&q=85", products: [{src:PRODUCT_IMAGES.heatedScarf,alt:"Accessoire pour les journées fraîches"}], color: "from-orange-950/85 via-orange-950/25" },
];

export default function WinterShowcase() {
  const reduceMotion = useReducedMotion();
  const campaignVideo = process.env.NEXT_PUBLIC_SEASONAL_VIDEO_URL;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#10151D] text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,rgba(245,190,80,.18),transparent_40%),linear-gradient(135deg,#0b111b,#172334_55%,#0b111b)]" />
        <div className="relative mx-auto max-w-[1440px] px-4 pt-5 md:px-8 md:pt-8">
          <div aria-label="SWELTR, les quatre saisons" className="relative isolate h-[250px] overflow-hidden rounded-[1.8rem] border border-white/15 shadow-2xl shadow-black/30 sm:h-[330px] md:h-[430px]">
            <div className="absolute inset-0 grid grid-cols-4">
              {[
                {label:"Hiver",src:"https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&w=1200&q=90"},
                {label:"Printemps",src:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=90"},
                {label:"Été",src:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90"},
                {label:"Automne",src:"https://images.unsplash.com/photo-1507371341162-763b5e419408?auto=format&fit=crop&w=1200&q=90"}
              ].map((season)=> <div key={season.label} className="relative overflow-hidden">
                <Image src={season.src} alt={season.label} fill sizes="25vw" unoptimized priority className="object-cover transition duration-1000 hover:scale-105"/>
              </div>)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-slate-950/60"/>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
              <span className="rounded-full border border-white/35 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.28em] text-amber-100 backdrop-blur-md sm:text-xs">SWELTR · toute l’année</span>
              <p className="mt-4 max-w-4xl font-display text-3xl font-black leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl">Un monde de confort.<br/><span className="text-amber-200">Quatre saisons à vivre.</span></p>
              <Link href="/boutique" className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-200">Découvrir la collection <ArrowRight size={17}/></Link>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white/90 backdrop-blur-sm sm:px-6 sm:py-3 sm:text-xs"><span>Hiver</span><span>Printemps</span><span>Été</span><span>Automne</span></div>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10">
          <motion.div initial={reduceMotion ? false : {opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.65}} className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[.24em] text-amber-200 md:text-xs"><Globe2 size={14}/> SWELTR · Confort en toute saison</p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">Un monde de confort.<br/><span className="bg-gradient-to-r from-amber-100 via-amber-300 to-white bg-clip-text text-transparent">Quatre saisons à vivre.</span></h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-lg">Des trouvailles utiles pour la maison, les voyages et le plein air — sélectionnées pour vous accompagner toute l’année, partout dans le monde.</p>
            </div>
            <Link href="/boutique" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200">Explorer la boutique <ArrowRight size={17}/></Link>
          </motion.div>
          <div id="saisons" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {seasons.map((season, index) => {
              const Icon = season.icon;
              return <motion.article key={season.id} initial={reduceMotion ? false : {opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.55,delay:index*.1}} whileHover={reduceMotion ? undefined : {y:-6}} className="group relative min-h-[420px] overflow-hidden rounded-[1.7rem] border border-white/15 bg-slate-900 shadow-xl shadow-black/20 md:min-h-[490px]">
                <Image src={season.image} alt={"Paysage de " + season.label.toLowerCase()} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" unoptimized priority={index===0} className="object-cover transition duration-700 group-hover:scale-105"/>
                <div className={"absolute inset-0 bg-gradient-to-t " + season.color + " to-transparent"}/>
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5"><span className="rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] backdrop-blur-md">{season.label}</span><Icon size={20} className="text-white drop-shadow"/></div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-4 flex h-24 items-end justify-start gap-2">{season.products.map((product, productIndex)=><motion.div key={product.alt} animate={reduceMotion ? undefined : {y:[0,-5,0],rotate:[-2,1,-2]}} transition={{duration:5+index+productIndex,repeat:Infinity,ease:"easeInOut"}} className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/30 bg-white/95 p-2 shadow-xl"><Image src={product.src} alt={product.alt} fill sizes="80px" unoptimized className="object-contain p-1"/></motion.div>)}</div>
                  <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">{season.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/80">{season.text}</p>
                  <Link href={season.id==="winter" ? "/boutique#trio" : "/boutique"} className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2.5 text-xs font-bold backdrop-blur-md transition hover:bg-white hover:text-slate-950">Découvrir <ArrowRight size={15}/></Link>
                </div>
              </motion.article>;
            })}
          </div>
          <motion.div initial={reduceMotion ? false : {opacity:0}} animate={{opacity:1}} transition={{delay:.5}} className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 sm:grid-cols-3 md:p-5">
            {[{icon:PackageCheck,title:"Une sélection évolutive",text:"De nouvelles trouvailles au fil des saisons."},{icon:ShieldCheck,title:"Paiement sécurisé",text:"Un parcours de paiement protégé."},{icon:Globe2,title:"Une expérience internationale",text:"Choisissez votre langue depuis le menu."}].map(({icon:Icon,title,text})=><div key={title} className="flex items-center gap-3 px-2 py-2"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-300/10 text-amber-200"><Icon size={19}/></span><span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs text-white/60">{text}</span></span></div>)}
          </motion.div>
        </div>
      </section>
      {campaignVideo && <section className="bg-[#0d131c] px-4 pb-12 md:px-8"><div className="mx-auto max-w-[1440px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-black"><div className="grid md:grid-cols-[.8fr_1.2fr]"><div className="flex flex-col justify-center p-7 text-white md:p-12"><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-300">En mouvement</p><h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Découvrez les produits en action.</h2><p className="mt-4 text-sm leading-7 text-white/65">Une présentation vidéo pour mieux voir les détails et les usages des produits sélectionnés.</p></div><video className="aspect-video w-full bg-black object-cover" src={campaignVideo} controls playsInline preload="metadata" poster={PRODUCT_IMAGES.heatedScarf}><track kind="captions" srcLang="fr" label="Français" /></video></div></div></section>}
      <section className="bg-[#f8f6f0] px-4 py-12 text-slate-950 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:p-10">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-700">La sélection du moment</p><h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Des essentiels à retrouver toute l’année.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Les collections évoluent avec les besoins et les saisons. Consultez les fiches pour vérifier les caractéristiques et disponibilités avant de commander.</p></div>
          <Link href="/boutique" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-700">Voir tous les produits <ArrowRight size={16}/></Link>
        </div>
      </section>
    </>
  );
}
