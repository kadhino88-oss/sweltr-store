"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_IMAGES } from "@/lib/data";
import Reveal from "@/components/Reveal";

const ITEMS = [
  { key: "neckFan", label: "Ventilateur de cou", src: PRODUCT_IMAGES.neckFan, href: "/produit/solo" },
  { key: "miniTurbo", label: "Mini Turbo portable", src: PRODUCT_IMAGES.miniTurbo, href: "/produit/duo" },
  { key: "towel", label: "Serviette rafraîchissante", src: PRODUCT_IMAGES.towel, href: "/produit/trio" },
];

export default function ProductGallery() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <Reveal className="text-center mb-14">
        <span className="font-mono text-xs uppercase tracking-widest text-orange">
          Le matériel
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl mt-3">
          Regarde-le d'un peu plus près
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item, i) => (
          <Reveal key={item.key} delay={i * 0.12}>
            <Link href={item.href}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-panel border border-line aspect-square cursor-pointer"
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display font-semibold text-lg">{item.label}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-orange mt-1">
                    Voir la fiche →
                  </p>
                </div>
              </motion.div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
