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
        <h2 className="font-display text-xl font-semibold text-cream">Service client</h2>
        <p className="mt-3">
          E-mail :{" "}
          <a className="text-orange underline" href="mailto:contact@bkentreprise.com">
            contact@bkentreprise.com
          </a>
        </p>
        <p className="mt-2">
          Téléphone :{" "}
          <a className="text-orange underline" href="tel:+33774555370">
            +33 7 74 55 53 70
          </a>
        </p>
      </section>
    </ContentPage>
  );
}
