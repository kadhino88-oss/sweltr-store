import LegalPage from "@/components/LegalPage";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata = {
  title: "Mentions légales — SWELTR",
  description: "Identité de l’éditeur du site SWELTR, coordonnées de contact et informations légales.",
  alternates: { canonical: `${siteUrl}/mentions-legales` },
  openGraph: { title: "Mentions légales — SWELTR", description: "Informations légales et coordonnées de l’éditeur du site SWELTR.", url: `${siteUrl}/mentions-legales`, siteName: "SWELTR", locale: "fr_CH", type: "website" },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" updated="Octobre 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site SWELTR est édité par <strong>BK ENTREPRISE</strong>, entrepreneur indépendant,
          dont le siège est situé au{" "}
          <strong>Rue Joseph-Pasquier 1, 1203 Genève, Suisse</strong>.
        </p>
        <p>
          Contact : <strong>contact@bk-entreprise.com</strong> · <strong>bkentreprise88@gmail.com</strong> — <strong>+41 79 934 99 46</strong>
        </p>
        <p>Directeur de la publication : BK Entreprise.</p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, visuels, logo) est la propriété de
          SWELTR, sauf mention contraire. Les photographies produit sont fournies par nos
          partenaires de la marque et utilisées pour présenter les produits de la collection.
        </p>
      </section>

      <section>
        <h2>Activité</h2>
        <p>
          SWELTR est une boutique en ligne. Les produits commandés sont expédiés à l'adresse
          indiquée par le client lors de la commande.
        </p>
      </section>

      <section>
        <h2>Paiement</h2>
        <p>
          Les paiements sont traités par Stripe Payments Europe, Ltd., un prestataire de paiement
          sécurisé tiers. SWELTR ne stocke aucune donnée bancaire.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question relative au site ou à une commande, tu peux nous contacter à l'adresse{" "}
          <strong>contact@bk-entreprise.com</strong> ou <strong>bkentreprise88@gmail.com</strong>, ou par téléphone au{" "}
          <strong>+41 79 934 99 46</strong>.
        </p>
      </section>
    </LegalPage>
  );
}
