"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, ShieldCheck, Truck } from "lucide-react";
import { TIERS, type Tier } from "@/lib/data";
import { track } from "@vercel/analytics/react";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";

export default function ProductDetailClient({ tier }: { tier: Tier }) {
  const relatedTiers = TIERS.filter((item) => item.id !== tier.id);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("view_product", { tierId: tier.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    track("begin_checkout", { tierId: tier.id, price: tier.price });
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
    <main className="relative bg-ivory text-ink">
      <SiteHeader />

      <div className="px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <Link
          href="/#gear"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold-deep transition-colors"
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
                  style={{ borderColor: activeImage === i ? "#D6A84F" : "#E4DED2" }}
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
            <span className="font-mono text-xs uppercase tracking-widest text-gold-deep">
              {tier.tagline}
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl mt-2 mb-4">{tier.name}</h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-3xl">{formatPrice(tier.price)}</span>
              <span className="font-mono text-base line-through text-[#6B6B74]">{formatPrice(tier.compare)}</span>
            </div>
            <p className="text-soft mb-8 leading-relaxed">{tier.description}</p>

            <ul className="space-y-2 mb-8">
              {tier.items.map((it, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-soft">
                  <Check size={14} className="text-gold-deep" /> {it}
                </li>
              ))}
            </ul>

            <motion.button
              onClick={handleCheckout}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-8 py-4 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-gold-strong text-ink flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Redirection..." : `Commander — ${formatPrice(tier.price)}`}
            </motion.button>
            {error && <p className="text-magenta text-xs mt-3">{error}</p>}

            <div className="flex gap-6 mt-8 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-gold-deep" /> Délai selon destination
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-gold-deep" /> Paiement sécurisé
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
                style={{ background: i % 2 === 0 ? "#F5F0E5" : "transparent" }}
              >
                <span className="text-muted">{s.label}</span>
                <span className="text-soft text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 md:px-12 py-16 border-t border-line max-w-7xl mx-auto">
        <h2 className="mb-8 font-display text-2xl font-bold md:text-3xl">Autres kits SWELTR</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTiers.map((relatedTier) => (
            <ProductCard key={relatedTier.id} tier={relatedTier} />
          ))}
        </div>
        <p className="mt-8 text-sm text-soft">
          Tu as une question sur le choix, la livraison ou les conditions de retour ? Consulte la{" "}
          <Link href="/faq" className="text-gold-deep underline">FAQ</Link> ou{" "}
          <Link href="/contact" className="text-gold-deep underline">contacte le service client</Link>.
        </p>
      </section>

      <Footer />
    </main>
  );
}
