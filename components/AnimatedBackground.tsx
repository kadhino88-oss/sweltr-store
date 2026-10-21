"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Signature visual: soft thermal-gradient blobs that drift slowly and
// shift with scroll position, evoking a thermal-camera read rather than
// a generic "sunny beach" gradient.
export default function AnimatedBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        style={{
          y: y1,
          rotate,
          background:
            "radial-gradient(circle, rgba(243,200,106,.55) 0%, rgba(214,168,79,.22) 45%, transparent 70%)",
        }}
        className="absolute -top-40 -left-40 w-[38rem] h-[38rem] rounded-full blur-[110px] opacity-30 animate-drift"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full blur-[120px] opacity-20 animate-drift"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(243,200,106,.42) 0%, rgba(214,168,79,.18) 50%, transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] rounded-full blur-[130px] opacity-[0.15]"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(26,44,86,.24) 0%, transparent 70%)",
          }}
        />
      </motion.div>
      {/* subtle scanline texture for a "data readout" feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}
