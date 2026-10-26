import SuccessPageClient from "@/components/SuccessPageClient";
import { getStripeClient, getStripeErrorDetails } from "@/lib/stripe";

export const metadata = {
  title: "Commande — SWELTR",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams: { session_id?: string | string[] };
};

export default async function SuccesPage({ searchParams }: SuccessPageProps) {
  const sessionId =
    typeof searchParams.session_id === "string" ? searchParams.session_id : undefined;

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return <SuccessPageClient status="unverified" />;
  }

  const stripe = getStripeClient();
  if (!stripe) {
    console.error("Impossible de vérifier la page de succès : STRIPE_SECRET_KEY manquante.");
    return <SuccessPageClient status="unverified" />;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return (
      <SuccessPageClient
        status={session.payment_status === "paid" ? "confirmed" : "pending"}
      />
    );
  } catch (error: unknown) {
    console.error("Vérification de la session de paiement impossible :", getStripeErrorDetails(error));
    return <SuccessPageClient status="unverified" />;
  }
}
