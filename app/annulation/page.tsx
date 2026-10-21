import CancellationPageClient from "@/components/CancellationPageClient";

export const metadata = {
  title: "Paiement annulé — SWELTR",
  robots: { index: false, follow: false },
};

export default function AnnulationPage() {
  return <CancellationPageClient />;
}
