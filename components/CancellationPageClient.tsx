"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

export default function CancellationPageClient() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory text-ink">
      <SiteHeader />
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <XCircle size={56} className="text-gold-deep mx-auto mb-6" />
        </motion.div>
        <h1 className="font-display font-bold text-3xl mb-4">Paiement annulé</h1>
        <p className="text-soft max-w-md mb-8">
          Aucun montant n'a été débité. Ton kit t'attend toujours si tu changes d'avis.
        </p>
        <Link
          href="/boutique"
          className="px-6 py-3 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-gold-strong text-ink"
        >
          Revoir les kits
        </Link>
      </section>
      <Footer />
    </main>
  );
}
