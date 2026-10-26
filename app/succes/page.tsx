import SuccessPageClient from "@/components/SuccessPageClient";
import { getStripeClient } from "@/lib/stripe";

export const metadata = {
  title: "Statut de la commande — SWELTR",
  robots: { index: false, follow: false },
};

type SuccesPageProps = {
  searchParams?: {
    session_id?: string | string[];
  };
};

export default async function SuccesPage({ searchParams }: SuccesPageProps) {
  const rawSessionId = searchParams?.session_id;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;
  let paymentStatus: "paid" | "pending" | "unverified" = "unverified";

  if (sessionId) {
    const stripe = getStripeClient();

    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.mode === "payment" && session.payment_status === "paid") {
          paymentStatus = "paid";
        } else {
          paymentStatus = "pending";
        }
      } catch (error) {
        // Ne jamais afficher une commande comme payée si la session ne peut pas être vérifiée.
        console.error("Impossible de vérifier la session Stripe sur la page de succès.", error);
      }
    }
  }

  return <SuccessPageClient paymentStatus={paymentStatus} />;
}
