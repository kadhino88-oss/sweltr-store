import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { FAQS as PRODUCT_FAQS } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata: Metadata = {
  title: "Questions fréquentes — Livraison, produits et garantie | SWELTR",
  description:
    "Toutes les réponses aux questions fréquentes sur les kits SWELTR, l'autonomie, la livraison et la garantie.",
  alternates: { canonical: `${siteUrl}/faq` },
};

export default function FaqPage() {
  const faqs = [
    ...PRODUCT_FAQS,
    {
      q: "Quels pays peuvent recevoir une commande ?",
      a: "Le paiement accepte actuellement les adresses de livraison en France, Belgique, Suisse, Luxembourg, Allemagne, Espagne, Italie, États-Unis, Canada et Royaume-Uni. Les pays disponibles sont confirmés au moment du paiement.",
    },
    {
      q: "Quel est le délai de livraison ?",
      a: "Les commandes sont annoncées comme expédiées sous 48 heures. Le délai moyen de transport indiqué dans les conditions de vente est de 7 à 15 jours ouvrés selon la destination. Il s'agit d'une estimation qui peut varier selon les conditions logistiques.",
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
      a: "Non. Les chaussettes du Kit Grand Froid sont isolantes et sans batterie. Elles retiennent la chaleur naturelle du pied, contrairement aux gants et à l'écharpe qui produisent activement de la chaleur.",
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
