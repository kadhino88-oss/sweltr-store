"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wind } from "lucide-react";
import { heatCopy } from "@/lib/data";
import FanVisual from "@/components/FanVisual";

export default function Hero() {
  const [heat, setHeat] = useState(34);
  const hc = useMemo(() => heatCopy(heat), [heat]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fanY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative px-6 md:px-12 pt-16 pb-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] tracking-widest uppercase mb-6"
            style={{ background: "#1E1E24", color: hc.color, border: `1px solid ${hc.color}44` }}
          >
            Indice de chaleur en direct
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
            <span style={{ color: hc.color }} className="transition-colors duration-500">
              {heat}°C
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg max-w-lg mb-10 text-soft"
          >
            Ventilateur de cou, mini turbo et serviette rafraîchissante. Conçus pour les jours
            où ton corps refuse tout simplement de coopérer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md p-6 rounded-2xl mb-10 bg-panel2 border border-line"
          >
            <div className="flex justify-between items-baseline mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Règle sur la météo de ta ville
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: hc.color }}>
                {hc.label}
              </span>
            </div>
            <input
              type="range"
              min={18}
              max={45}
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
              <span>18°C</span>
              <span>45°C</span>
            </div>
            <p className="text-sm mt-4 text-soft">{hc.desc}</p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#gear"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm uppercase tracking-wide"
            style={{ background: hc.color, color: "#0B0B0F" }}
          >
            Affronter cette chaleur <Wind size={16} />
          </motion.a>
        </motion.div>

        <motion.div style={{ y: fanY }} className="relative flex justify-center">
          <FanVisual heat={heat} color={hc.color} />
        </motion.div>
      </div>
    </section>
  );
}
