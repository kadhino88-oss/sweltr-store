"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Star, Loader2, ShieldCheck, Truck } from "lucide-react";
import { Tier, REPORTS } from "@/lib/data";
import AnimatedBackground from "@/components/AnimatedBackground";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export default function ProductDetailClient({ tier }: { tier: Tier }) {
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Erreur de paiement.");
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue, réessaie.");
      setLoading(false);
    }
  }

  return (
    <main className="relative">
      <AnimatedBackground />

      <div className="px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <Link
          href="/#gear"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-cream transition-colors"
        >
          <ArrowLeft size={16} /> Retour à la boutique
        </Link>
      </div>

      <section className="px-6 md:px-12 pb-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-panel border border-line mb-4"
          >
            <Image
              src={tier.images[activeImage]}
              alt={tier.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              unoptimized
              priority
            />
          </motion.div>
          {tier.images.length > 1 && (
            <div className="flex gap-3">
              {tier.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border transition-colors shrink-0"
                  style={{ borderColor: activeImage === i ? "#FF7A3C" : "#24242C" }}
                >
                  <Image src={img} alt={`${tier.name} ${i + 1}`} fill sizes="80px" className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-orange">
              {tier.tagline}
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl mt-2 mb-4">{tier.name}</h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-3xl">{tier.price}€</span>
              <span className="font-mono text-base line-through text-[#6B6B74]">{tier.compare}€</span>
            </div>
            <p className="text-soft mb-8 leading-relaxed">{tier.description}</p>

            <ul className="space-y-2 mb-8">
              {tier.items.map((it, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-soft">
                  <Check size={14} className="text-cyan" /> {it}
                </li>
              ))}
            </ul>

            <motion.button
              onClick={handleCheckout}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-8 py-4 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-cream text-ink flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Redirection..." : `Commander — ${tier.price}€`}
            </motion.button>
            {error && <p className="text-magenta text-xs mt-3">{error}</p>}

            <div className="flex gap-6 mt-8 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-orange" /> Expédié sous 48h
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-orange" /> Garantie 30 jours
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specs */}
      <section className="px-6 md:px-12 py-16 border-t border-line max-w-4xl mx-auto">
        <Reveal>
          <h2 className="font-display font-bold text-2xl mb-8">Caractéristiques</h2>
          <div className="rounded-2xl border border-line overflow-hidden">
            {tier.specs.map((s, i) => (
              <div
                key={i}
                className="flex justify-between px-6 py-4 text-sm"
                style={{ background: i % 2 === 0 ? "#111114" : "transparent" }}
              >
                <span className="text-muted">{s.label}</span>
                <span className="text-soft text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Reviews */}
      <section className="px-6 md:px-12 py-16 border-t border-line max-w-5xl mx-auto">
        <Reveal className="mb-10">
          <h2 className="font-display font-bold text-2xl">Avis clients</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {REPORTS.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-6 rounded-2xl bg-panel border border-line h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#FFD23F" color="#FFD23F" />
                  ))}
                </div>
                <p className="text-sm mb-5 text-soft">« {r.quote} »</p>
                <div className="flex justify-between items-center font-mono text-xs text-[#6B6B74]">
                  <span>{r.name}</span>
                  <span className="text-orange">{r.temp} relevés</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
