"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Snowflake } from "lucide-react";

export default function Nav({ cartCount }: { cartCount: number }) {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(11,11,15,0)", "rgba(11,11,15,0.85)"]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <motion.nav
      style={{ backgroundColor: bg }}
      className="sticky top-0 z-40 backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-line"
      />
      <div className="flex flex-wrap items-center justify-between gap-y-4 px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <a href="#top" className="font-display text-xl font-bold tracking-tight flex items-center gap-2">
          <Snowflake size={22} className="text-orange" />
          SWELTR
        </a>
        <a
          href="#gear"
          className="order-2 relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest bg-cream text-ink md:order-3"
        >
          <ShoppingBag size={14} /> Commander
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-magenta text-white">
              {cartCount}
            </span>
          )}
        </a>
        <div className="order-3 flex w-full justify-center gap-5 font-mono text-[10px] uppercase tracking-widest text-muted md:order-2 md:w-auto md:gap-8 md:text-xs">
          <a href="/boutique" className="hover:text-cream transition-colors">Boutique</a>
          <a href="/guides" className="hover:text-cream transition-colors">Guides</a>
          <a href="/faq" className="hover:text-cream transition-colors">FAQ</a>
        </div>
      </div>
    </motion.nav>
  );
}
