"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Loader2, ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import Reveal from "@/components/Reveal";
import CountdownTimer from "@/components/CountdownTimer";

export default function ProductTiers({
  onAdd,
}: {
  onAdd: () => void;
}) {
  const [tier, setTierState] = useState("duo");
  function setTier(id: string) {
    setTierState(id);
    track("select_kit", { tierId: id });
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selected = useMemo(() => TIERS.find((t) => t.id === tier)!, [tier]);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    track("begin_checkout", { tierId: tier, price: selected.price });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Impossible de créer la session de paiement");
      }
      onAdd();
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue, réessaie.");
      setLoading(false);
    }
  }

  return (
    <section id="gear" className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <Reveal className="text-center mb-14">
        <span className="font-mono text-xs uppercase tracking-widest text-gold-deep">
          Choisis ton kit
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl mt-3">
          Compose ton kit chaleur
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {TIERS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1}>
            <motion.div
              onClick={() => setTier(t.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setTier(t.id);
                }
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              role="button"
              aria-pressed={tier === t.id}
              tabIndex={0}
              className="text-left p-7 rounded-2xl relative w-full h-full transition-colors cursor-pointer"
              style={{
                background: tier === t.id ? "#F5F0E5" : "#FFFFFF",
                border: tier === t.id ? "1px solid #D6A84F" : "1px solid #E4DED2",
              }}
            >
              {t.best && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest bg-gold-strong text-ink">
                  Le plus choisi
                </span>
              )}
              <div className="flex gap-2 mb-5">
                {t.cardImages.map((img, k) => (
                  <div
                    key={k}
                    className="relative w-16 h-16 rounded-xl overflow-hidden border border-line bg-panel2 shrink-0"
                  >
                    <Image
                      src={img}
                      alt={t.items[k] || t.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <h3 className="font-display font-semibold text-xl mb-1">{t.name}</h3>
              <p className="text-sm mb-5 text-muted">{t.tagline}</p>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="font-display font-bold text-3xl">{formatPrice(t.price)}</span>
                <span className="font-mono text-sm line-through text-[#6B6B74]">
                  {formatPrice(t.compare)}
                </span>
              </div>
              <ul className="space-y-2">
                {t.items.map((it, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-soft">
                    <Check size={14} className="text-gold-deep" /> {it}
                  </li>
                ))}
              </ul>
              <motion.div
                animate={{
                  backgroundColor: tier === t.id ? "#D6A84F" : "transparent",
                }}
                className="mt-6 w-4 h-4 rounded-full mx-auto border border-gold-deep"
              />
              <Link
                href={`/produit/${t.id}`}
                onClick={(e) => e.stopPropagation()}
                className="mt-4 flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted hover:text-gold-deep transition-colors"
              >
                Voir le détail <ArrowRight size={12} />
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 max-w-md mx-auto">
        <div className="p-6 rounded-2xl flex items-center justify-between bg-panel2 border border-line">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {selected.name}
              </p>
              <p className="font-display font-bold text-2xl">{formatPrice(selected.price)}</p>
            </motion.div>
          </AnimatePresence>
          <motion.button
            onClick={handleCheckout}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-gold-strong text-ink flex items-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? "Redirection..." : "Payer avec Stripe"}
          </motion.button>
        </div>
        {error && <p className="text-magenta text-xs mt-3 text-center">{error}</p>}
      </Reveal>

      <div className="mt-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest text-gold-deep">
        <Clock size={14} />
        <CountdownTimer initialSeconds={3 * 3600 + 47 * 60 + 12} />
      </div>
    </section>
  );
}
