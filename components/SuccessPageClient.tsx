"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPageClient() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-ink text-cream">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CheckCircle2 size={56} className="text-cyan mx-auto mb-6" />
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
        href="/"
        className="px-6 py-3 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-cream text-ink"
      >
        Retour à la boutique
      </Link>
    </main>
  );
}
