"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Snowflake } from "lucide-react";
import { heatCopy } from "@/lib/data";
import FanVisual from "@/components/FanVisual";

export default function Hero() {
  const [heat, setHeat] = useState(-3);
  const hc = useMemo(() => heatCopy(heat), [heat]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fanY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-ink text-[#F5F7FB]">
      <div className="pointer-events-none absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-gold/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-24 md:grid-cols-2 md:px-12 md:pt-32">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] tracking-widest uppercase mb-6"
            style={{ background: "rgba(255,255,255,.08)", color: "#F3C86A", border: "1px solid rgba(243,200,106,.4)" }}
          >
            Indice de froid en direct
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold leading-[0.95] mb-6"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)" }}
          >
            Ton trajet vient
            <br />
            de passer à{" "}
            <span style={{ color: "#F3C86A" }} className="font-serif italic font-normal transition-colors duration-500">
              {heat}°C
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg max-w-lg mb-10 text-[#D9DEE7]"
          >
            Gants chauffants, écharpe chauffante et chaussettes thermiques. Conçus pour les jours
            où ton corps refuse tout simplement de coopérer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md p-6 rounded-2xl mb-10 bg-white/5 border border-white/15"
          >
            <div className="flex justify-between items-baseline mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A8B1C1]">
                Règle sur la météo de ta ville
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: hc.color }}>
                {hc.label}
              </span>
            </div>
            <input
              type="range"
              min={-15}
              max={15}
              value={heat}
              onChange={(e) => setHeat(Number(e.target.value))}
              className="heat-range w-full"
              style={{
                background:
                  "linear-gradient(90deg,#4FE3C1,#FFD23F,#FF7A3C,#FF2E63)",
              }}
              aria-label="Régler la température du jour"
            />
            <div className="flex justify-between font-mono text-[10px] mt-1 text-[#6B6B74]">
              <span>-15°C</span>
              <span>15°C</span>
            </div>
            <p className="text-sm mt-4 text-[#D9DEE7]">{hc.desc}</p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#gear"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm uppercase tracking-wide"
            style={{ background: "#F3C86A", color: "#0B0F17" }}
          >
            Affronter ce froid <Snowflake size={16} />
          </motion.a>
        </motion.div>

        <motion.div style={{ y: fanY }} className="relative flex justify-center">
          <FanVisual heat={heat} color={hc.color} />
        </motion.div>
      </div>
    </section>
  );
}
