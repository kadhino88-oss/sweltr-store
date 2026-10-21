import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, PackageCheck, RotateCcw } from "lucide-react";
import ContentPage from "@/components/ContentPage";

const siteUrl = process.env.SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata: Metadata = {
  title: "Livraison, rétractation et retours — SWELTR",
  description:
    "Informations SWELTR sur la préparation des commandes, les délais de livraison, le droit de rétractation et les retours.",
  alternates: { canonical: `${siteUrl}/livraison-retours` },
};

export default function DeliveryReturnsPage() {
  return (
    <ContentPage
      eyebrow="INFORMATIONS COMMANDE"
      title="Livraison et retours"
      description="Les étapes et délais utiles à connaître avant de commander un kit SWELTR."
    >
      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-line bg-panel p-6">
          <PackageCheck className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Préparation</h2>
          <p className="mt-3">
            Après confirmation du paiement, les informations de commande sont transmises pour
            organiser son traitement auprès de notre partenaire logistique.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-panel p-6">
          <Clock3 className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Délai estimé</h2>
          <p className="mt-3">
            Le délai moyen de livraison indiqué dans les CGV est de 7 à 15 jours ouvrés selon la
            destination. Il peut varier selon les conditions logistiques.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-panel p-6">
          <RotateCcw className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Retours</h2>
          <p className="mt-3">
            Les CGV décrivent le droit de rétractation de 14 jours calendaires et la garantie
            commerciale de 30 jours annoncée par SWELTR.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-line bg-panel p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">Exercer ton droit de rétractation</h2>
        <p className="mt-4">
          Selon les conditions générales de vente, tu disposes de 14 jours calendaires à compter de
          la réception pour exercer ton droit de rétractation. Les frais de retour sont à la charge
          du client, sauf si le produit est défectueux ou non conforme. Consulte les{" "}
          <Link href="/cgv" className="text-gold-deep underline">CGV</Link> pour les modalités
          applicables à ta commande.
        </p>
        <p className="mt-3">
          La garantie commerciale satisfait ou remboursé de 30 jours est également décrite dans
          les CGV. Pour initier une demande ou poser une question, contacte le{" "}
          <Link href="/contact" className="text-gold-deep underline">service client</Link> en
          indiquant ton numéro de commande.
        </p>
      </section>

      <p>
        Avant de commander, vérifie les pays disponibles lors du paiement et l'adresse de livraison
        saisie. Pour d'autres questions, consulte la <Link href="/faq" className="text-gold-deep underline">FAQ</Link>.
      </p>
    </ContentPage>
  );
}
