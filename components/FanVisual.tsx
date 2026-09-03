"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Battery, Flame } from "lucide-react";
import { PRODUCT_IMAGES } from "@/lib/data";

/**
 * Visuel produit animé : vraie photo des gants chauffants (fournie par CJ
 * Dropshipping), avec flottement, glow pulsé et légère inclinaison 3D au
 * survol de la souris pour garder la page vivante.
 */
export default function FanVisual({ heat, color }: { heat: number; color: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-50, 50], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-8, 8]), { stiffness: 150, damping: 20 });

  return (
    <div
      className="relative w-full max-w-sm aspect-square"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ perspective: 800 }}
    >
      {/* pulsing glow behind the product */}
      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${color}55 0%, transparent 70%)` }}
      />

      <motion.div
        style={{ rotateX, rotateY }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full rounded-[2.5rem] bg-panel border border-line overflow-hidden"
      >
        <Image
          src={PRODUCT_IMAGES.heatedGloves}
          alt="Gants chauffants SWELTR"
          fill
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
          priority
          unoptimized
        />

        {/* floating stat chips over the photo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/80 border border-line font-mono text-[10px] uppercase tracking-widest text-soft backdrop-blur-sm"
        >
          <Battery size={12} className="text-cyan" /> 4h
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute bottom-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/80 border border-line font-mono text-[10px] uppercase tracking-widest text-soft backdrop-blur-sm"
        >
          <Flame size={12} className="text-cyan" /> 3 paliers
        </motion.div>
      </motion.div>
    </div>
  );
}
