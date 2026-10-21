import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata: Metadata = {
  title: "Contact — Service client SWELTR",
  description:
    "Une question sur un produit ou une commande SWELTR ? Contacte notre service client par e-mail ou par téléphone.",
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <ContentPage
      title="Contacte SWELTR"
      description="Notre équipe est disponible pour répondre à tes questions sur les produits et les commandes."
    >
      <section className="rounded-2xl border border-line bg-panel p-6">
        <h2 className="font-display text-xl font-semibold text-ink">Service client</h2>
        <p className="mt-3">
          E-mail :{" "}
          <a className="text-gold-deep underline" href="mailto:contact@bkentreprise.com">
            contact@bkentreprise.com
          </a>
        </p>
        <p className="mt-2">
          Téléphone :{" "}
          <a className="text-gold-deep underline" href="tel:+41799349946">
            +41 79 934 99 46
          </a>
        </p>
        <p className="mt-4">
          Pour accélérer le traitement de ta demande, indique le numéro de commande si ta question
          concerne un achat, ainsi que l'adresse e-mail utilisée lors du paiement. Ne transmets
          jamais ton numéro de carte bancaire ni son code de sécurité.
        </p>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-display text-xl font-semibold text-ink">Une question avant de commander ?</h2>
          <p className="mt-3">
            Consulte les réponses sur l'autonomie, les produits, la livraison et les retours dans
            notre <a className="text-gold-deep underline" href="/faq">FAQ</a>.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-display text-xl font-semibold text-ink">Tu hésites entre deux kits ?</h2>
          <p className="mt-3">
            Compare leur contenu et leurs caractéristiques dans la{" "}
            <a className="text-gold-deep underline" href="/boutique">boutique SWELTR</a>, puis
            ouvre la fiche du kit qui correspond le mieux à ton besoin.
          </p>
        </div>
      </section>
    </ContentPage>
  );
}
