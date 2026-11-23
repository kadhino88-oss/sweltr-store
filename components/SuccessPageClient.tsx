"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleHelp, Clock3, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

type SuccessPageClientProps = {
  status: "confirmed" | "pending" | "cancelled" | "unverified";
  sessionId?: string;
  tracking?: { number: string; url: string; carrier?: string; status?: string };
};

const statusCopy = {
  confirmed: {
    title: "Paiement confirmé",
    message:
      "Stripe confirme que ton paiement a été effectué. La préparation de ta commande peut encore nécessiter un délai. Si tu as une question, contacte notre service client.",
    Icon: CheckCircle2,
    iconClass: "text-gold-deep",
  },
  pending: {
    title: "Commande en cours de confirmation",
    message:
      "Le montant est réservé sur ta carte pendant la vérification de la commande. Il sera encaissé une fois la commande confirmée. Si elle ne peut pas être confirmée, la réservation sera annulée ; le délai d’affichage dépend de ta banque.",
    Icon: Clock3,
    iconClass: "text-gold-deep",
  },
  cancelled: {
    title: "Paiement non encaissé",
    message:
      "La commande n’a pas été confirmée et aucun paiement n’a été encaissé. Si ta banque affiche encore une réservation temporaire, elle sera levée selon ses délais de traitement.",
    Icon: XCircle,
    iconClass: "text-soft",
  },
  unverified: {
    title: "Confirmation indisponible",
    message:
      "Nous ne pouvons pas encore vérifier ton paiement. Si tu as été débité, ne repasse pas commande : contacte notre service client pour que nous vérifiions la transaction.",
    Icon: CircleHelp,
    iconClass: "text-gold-deep",
  },
};

export default function SuccessPageClient({ status, tracking, sessionId }: SuccessPageClientProps) {
  const router = useRouter();
  useEffect(() => {
    if (status !== "pending" || !sessionId) return;
    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      router.refresh();
      if (attempts >= 15) window.clearInterval(interval);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [router, sessionId, status]);

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
        {status === "confirmed" && (
          <div className="mb-8 w-full max-w-md rounded-2xl border border-gold-strong/30 bg-white p-5 text-left shadow-sm">
            {tracking ? (
              <>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold-deep">Suivi de livraison</p>
                <h2 className="font-display text-lg font-semibold text-ink">Ton colis est suivi</h2>
                {tracking.carrier && <p className="mt-1 text-sm text-soft">Transporteur : {tracking.carrier}</p>}
                <p className="mt-2 break-all text-sm text-ink">Numéro : {tracking.number}</p>
                <a href={tracking.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-full bg-gold-strong px-5 py-3 text-sm font-semibold text-ink">
                  Suivre mon colis
                </a>
              </>
            ) : (
              <>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold-deep">Prochaine étape</p>
                <h2 className="font-display text-lg font-semibold text-ink">Préparation de ta commande</h2>
                <p className="mt-2 text-sm text-soft">Le numéro de suivi apparaîtra ici dès qu’il sera disponible. Tu peux revenir sur cette page pour vérifier.</p>
              </>
            )}
          </div>
        )}

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
