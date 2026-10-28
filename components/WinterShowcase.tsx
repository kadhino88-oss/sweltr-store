"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { WINTER_PRODUCTS } from "@/lib/winter-products";

export default function WinterShowcase() {
  const reduceMotion = useReducedMotion();
  const campaignVideo = process.env.NEXT_PUBLIC_WINTER_CAMPAIGN_VIDEO_URL;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#10151D] text-white">
        <div className="absolute inset-0 -z-20">
          <Image
            src={WINTER_PRODUCTS[3].image}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized
            className="object-cover opacity-35"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10151D] via-[#10151D]/85 to-[#10151D]/25" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, -25, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.05fr_.95fr] md:px-12 md:py-28">
          <div className="max-w-2xl">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-white/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[.22em] text-amber-200"
            >
              <Sparkles size={14} /> SWELTR · Collection hiver
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight md:text-7xl"
            >
              Le froid dehors.
              <span className="mt-2 block bg-gradient-to-r from-amber-100 via-amber-300 to-white bg-clip-text text-transparent">
                Votre refuge, dedans.
              </span>
            </motion.h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              Des essentiels sélectionnés pour les journées fraîches, les soirées cocooning et les escapades d’hiver en Suisse et en France.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/produits/gants-chauffants"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
              >
                Découvrir les gants chauffants <ArrowRight size={16} />
              </Link>
              <Link
                href="#collection"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explorer la collection <ArrowDown size={16} />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/55">
              <span>Collection Suisse & France</span>
              <span>·</span>
              <span>Design premium</span>
              <span>·</span>
              <span>Mobile-first</span>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: .96, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: .8, delay: .15 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, .5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl shadow-black/30"
            >
              {WINTER_PRODUCTS[3].image ? (
                <Image
                  src={WINTER_PRODUCTS[3].image}
                  alt="Gants chauffants — photo du produit du catalogue actuel"
                  fill
                  sizes="(max-width: 768px) 90vw, 42vw"
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-amber-950 p-8 text-center">
                  <span className="font-mono text-xs uppercase tracking-[.2em] text-amber-100/70">Photo réelle du produit à intégrer</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10151D]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[.24em] text-amber-200">Le produit disponible</span>
                <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Les gants chauffants</h2>
                <p className="mt-2 text-sm text-white/75">La chaleur qui vous accompagne dans vos déplacements.</p>
                <Link href="/produits/gants-chauffants" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                  Voir le produit <ArrowRight size={15} />
                </Link>
              </div>
              <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-widest backdrop-blur-md">
                Winter edit · 01
              </div>
            </motion.div>
            <div className="absolute -bottom-5 -left-4 -z-10 h-28 w-28 rounded-full bg-amber-300/20 blur-2xl" />
          </motion.div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-amber-200/20 bg-[#171D26] py-3 text-amber-100">
        <motion.div
          className="flex w-max gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[.22em] md:text-xs"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((copy) => (
            <span key={copy} className="flex gap-8 pr-8">
              {["Le confort commence ici", "Pensé pour l’hiver", "Suisse · France", "Des essentiels à découvrir", "SWELTR Winter Collection"].map((text) => (
                <span key={text} className="flex items-center gap-8">{text}<span aria-hidden="true">✦</span></span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      <section id="collection" className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.22em] text-amber-700">La sélection SWELTR</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Huit essentiels. Une seule obsession : le confort.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Découvrez les essentiels de la collection et consultez chaque fiche pour les caractéristiques disponibles.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WINTER_PRODUCTS.map((product, index) => (
            <motion.article
              key={product.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .12 }}
              transition={{ duration: .45, delay: (index % 4) * .06 }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <Link href={`/produits/${product.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-amber-100 p-6 text-center">
                      <span className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-500">Photo réelle à intégrer</span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-black/45 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white backdrop-blur">
                    {product.availability === "existing" ? "Dans les kits" : "À découvrir"}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[.2em] text-amber-700">{product.eyebrow}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-slate-950">{product.name}</h3>
                  <p className="mt-2 min-h-[3rem] text-sm leading-6 text-slate-600">{product.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                    Voir la fiche <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#111821] p-8 text-white md:p-14">
          <motion.div
            aria-hidden="true"
            className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl"
            animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.22em] text-amber-200">Le film SWELTR</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold md:text-4xl">Une campagne vidéo pensée pour faire ressentir la chaleur.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
                Le lecteur est prêt à accueillir le film publicitaire de la collection. La vidéo finale sera intégrée dès que le fichier de campagne validé sera disponible.
              </p>
            </div>
            {campaignVideo ? (
              <video
                className="aspect-video w-full max-w-sm rounded-2xl border border-white/15 bg-black object-cover shadow-xl"
                src={campaignVideo}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label="Film publicitaire de la collection hiver SWELTR"
              />
            ) : (
              <div className="relative flex aspect-video w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-amber-300/20 via-white/5 to-sky-300/10">
                <motion.div
                  className="absolute h-40 w-40 rounded-full border border-amber-100/30"
                  animate={reduceMotion ? undefined : { scale: [1, 1.45], opacity: [0.65, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute h-28 w-28 rounded-full border border-amber-100/40"
                  animate={reduceMotion ? undefined : { scale: [1, 1.45], opacity: [0.65, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                />
                <div className="relative rounded-full border border-white/25 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                  Film SWELTR · prêt à intégrer
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
