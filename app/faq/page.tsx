import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { FAQS as PRODUCT_FAQS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Questions fréquentes sur les produits et commandes SWELTR",
  description:
    "Réponses aux questions sur les kits SWELTR, leur contenu, les prix confirmés, les commandes, la livraison et les retours.",
  alternates: { canonical: `${siteUrl}/faq` },
  openGraph: { title: "Questions fréquentes SWELTR", description: "Réponses sur le contenu et les prix des kits, la commande, la livraison et les retours.", url: `${siteUrl}/faq`, siteName: "SWELTR", locale: "fr_CH", type: "website" },
};

export default function FaqPage() {
  const faqs = [
    ...PRODUCT_FAQS,
    {
      q: "Quels pays peuvent recevoir une commande ?",
      a: "Le parcours de commande est prévu pour la Suisse et la France. Une destination non proposée ne peut pas encore être commandée. Si le paiement est temporairement indisponible, aucune commande n'est créée.",
    },
    {
      q: "Quel est le délai de livraison ?",
      a: "Le délai indicatif mentionné dans les conditions générales de vente est de 7 à 15 jours ouvrés selon la destination. Il peut varier selon les conditions logistiques. Consulte les CGV pour les informations applicables à ta commande.",
    },
    {
      q: "Comment fonctionne le délai de rétractation ?",
      a: "Les conditions générales de vente indiquent un délai légal de 14 jours calendaires à compter de la réception pour exercer le droit de rétractation. Consulte les CGV pour les modalités et les conditions applicables.",
    },
    {
      q: "Comment demander de l'aide pour une commande ?",
      a: "Écris au service client à contact@bkentreprise.com ou appelle le +41 79 934 99 46. Pour faciliter la recherche, indique le numéro de commande et l'adresse e-mail utilisée lors du paiement. N'envoie jamais tes données de carte bancaire.",
    },
    {
      q: "Les chaussettes thermiques chauffent-elles avec une batterie ?",
      a: "Les chaussettes thermiques sont incluses dans le Kit Grand Froid. Consulte l’étiquette et les informations du modèle livré pour ses détails et son entretien.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <ContentPage
        eyebrow="AIDE · QUESTIONS FRÉQUENTES"
        title="Questions fréquentes"
        description="Les réponses aux questions les plus courantes sur les produits et les commandes SWELTR."
      >
        <div className="space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-2xl border border-line bg-panel p-6">
              <summary className="cursor-pointer font-display text-lg font-semibold text-ink">
                {item.q}
              </summary>
              <p className="mt-4">{item.a}</p>
            </details>
          ))}
        </div>
        <p>
          Tu ne trouves pas ta réponse ?{" "}
          <Link href="/contact" className="text-gold-deep underline">Contacte-nous.</Link>
        </p>
      </ContentPage>
    </>
  );
}
