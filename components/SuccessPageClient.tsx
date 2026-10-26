"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleHelp, Clock3 } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

type SuccessPageClientProps = {
  status: "confirmed" | "pending" | "unverified";
};

const statusCopy = {
  confirmed: {
    title: "Paiement confirmé",
    message:
      "Stripe confirme que ton paiement a été effectué. La création et la préparation de la commande fournisseur peuvent encore nécessiter un délai. Si tu as une question, contacte notre service client.",
    Icon: CheckCircle2,
    iconClass: "text-gold-deep",
  },
  pending: {
    title: "Paiement en cours",
    message:
      "Stripe n'a pas encore confirmé le paiement de cette session. Si tu viens de terminer le paiement, patiente un instant avant de réessayer afin d'éviter un doublon.",
    Icon: Clock3,
    iconClass: "text-gold-deep",
  },
  unverified: {
    title: "Confirmation indisponible",
    message:
      "Nous ne pouvons pas encore vérifier ton paiement. Si tu as été débité, ne repasse pas commande : contacte notre service client pour que nous vérifiions la transaction.",
    Icon: CircleHelp,
    iconClass: "text-gold-deep",
  },
};

export default function SuccessPageClient({ status }: SuccessPageClientProps) {
  const copy = statusCopy[status];
  const StatusIcon = copy.Icon;

  return (
    <main className="min-h-screen flex flex-col bg-ivory text-ink">
      <SiteHeader />
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <StatusIcon size={56} className={`${copy.iconClass} mx-auto mb-6`} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display font-bold text-3xl mb-4"
        >
          {copy.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-soft max-w-md mb-8"
        >
          {copy.message}
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
