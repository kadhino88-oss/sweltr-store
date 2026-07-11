"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function AnnulationPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-ink text-cream">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <XCircle size={56} className="text-magenta mx-auto mb-6" />
      </motion.div>
      <h1 className="font-display font-bold text-3xl mb-4">Paiement annulé</h1>
      <p className="text-soft max-w-md mb-8">
        Aucun montant n'a été débité. Ton kit t'attend toujours si tu changes d'avis.
      </p>
      <Link
        href="/#gear"
        className="px-6 py-3 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-cream text-ink"
      >
        Revoir les kits
      </Link>
    </main>
  );
}
