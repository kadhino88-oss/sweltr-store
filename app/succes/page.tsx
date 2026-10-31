import SuccessPageClient from "@/components/SuccessPageClient";
import { findCjOrderByOrderNumber, getCjOrderNumber } from "@/lib/cj";
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
    if (session.payment_status !== "paid") {
      return <SuccessPageClient status="pending" />;
    }

    let tracking: { number: string; url: string; carrier?: string; status?: string } | undefined;
    try {
      const order = await findCjOrderByOrderNumber(getCjOrderNumber(session.id));
      if (order?.trackingNumber) {
        const candidateUrl = order.trackingUrl;
        let url = "https://www.17track.net/fr?nums=" + encodeURIComponent(order.trackingNumber);
        if (candidateUrl) {
          try {
            const parsed = new URL(candidateUrl);
            if (parsed.protocol === "https:") url = parsed.toString();
          } catch {
            // Use the universal tracking portal if CJ does not return a valid HTTPS URL.
          }
        }
        tracking = {
          number: order.trackingNumber,
          url,
          ...(order.logisticName ? { carrier: order.logisticName } : {}),
          ...(order.orderStatus ? { status: order.orderStatus } : {}),
        };
      }
    } catch (error: unknown) {
      // A temporary CJ lookup failure must not hide a payment already confirmed by Stripe.
      console.error("Consultation du suivi CJ indisponible :", getStripeErrorDetails(error));
    }

    return <SuccessPageClient status="confirmed" tracking={tracking} />;
  } catch (error: unknown) {
    console.error("Vérification de la session de paiement impossible :", getStripeErrorDetails(error));
    return <SuccessPageClient status="unverified" />;
  }
}
