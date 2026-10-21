"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

export default function SuccessPageClient() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory text-ink">
      <SiteHeader />
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CheckCircle2 size={56} className="text-gold-deep mx-auto mb-6" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display font-bold text-3xl mb-4"
        >
          Commande confirmée
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-soft max-w-md mb-8"
        >
          Ton kit SWELTR part de l'entrepôt sous 24h. Un e-mail de confirmation
          avec le suivi de livraison arrive dans quelques minutes.
        </motion.p>
        <Link
          href="/boutique"
          className="px-6 py-3 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-gold-strong text-ink"
        >
          Retour à la boutique
        </Link>
      </section>
      <Footer />
    </main>
  );
}
