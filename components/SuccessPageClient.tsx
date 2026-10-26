"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, CircleHelp } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

type PaymentStatus = "paid" | "pending" | "unverified";

export default function SuccessPageClient({
  paymentStatus,
}: {
  paymentStatus: PaymentStatus;
}) {
  const content = {
    paid: {
      icon: CheckCircle2,
      title: "Paiement confirmé",
      message:
        "Stripe confirme que ton paiement a été effectué. La préparation et la validation de la commande fournisseur peuvent encore nécessiter un délai.",
      iconClass: "text-gold-deep",
    },
    pending: {
      icon: Clock3,
      title: "Paiement en attente",
      message:
        "Stripe n'indique pas encore un paiement confirmé. Si tu viens de terminer le paiement, patiente un instant avant de vérifier à nouveau. Ne repasse pas commande si un débit apparaît sur ton compte.",
      iconClass: "text-gold-deep",
    },
    unverified: {
      icon: CircleHelp,
      title: "Statut à vérifier",
      message:
        "Nous n'avons pas pu vérifier le paiement auprès de Stripe. Consulte ton compte ou ton e-mail de confirmation, puis contacte le service client si nécessaire. Si tu vois un débit, ne repasse pas commande.",
      iconClass: "text-gold-deep",
    },
  }[paymentStatus];

  const StatusIcon = content.icon;

  return (
    <main className="min-h-screen flex flex-col bg-ivory text-ink">
      <SiteHeader />
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <StatusIcon size={56} className={`${content.iconClass} mx-auto mb-6`} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display font-bold text-3xl mb-4"
        >
          {content.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-soft max-w-md mb-8"
        >
          {content.message}
        </motion.p>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full font-display font-semibold text-sm uppercase tracking-wide bg-gold-strong text-ink"
        >
          Contacter le service client
        </Link>
        <Link href="/boutique" className="mt-5 text-sm text-gold-deep underline">
          Retourner à la boutique
        </Link>
      </section>
      <Footer />
    </main>
  );
}
