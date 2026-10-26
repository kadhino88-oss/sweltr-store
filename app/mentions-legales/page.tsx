import LegalPage from "@/components/LegalPage";

const siteUrl = process.env.SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata = {
  title: "Mentions légales — SWELTR",
  alternates: { canonical: `${siteUrl}/mentions-legales` },
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
          Contact : <strong>contact@bkentreprise.com</strong> — <strong>+41 79 934 99 46</strong>
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
          partenaires fournisseurs et utilisées dans le cadre de la commercialisation des produits
          présentés.
        </p>
      </section>

      <section>
        <h2>Activité</h2>
        <p>
          SWELTR est un site de vente en ligne fonctionnant selon un modèle de dropshipping : les
          produits commandés sont expédiés directement par nos fournisseurs partenaires vers
          l'adresse indiquée par le client lors de la commande.
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
          <strong>contact@bkentreprise.com</strong> ou par téléphone au{" "}
          <strong>+41 79 934 99 46</strong>.
        </p>
      </section>
    </LegalPage>
  );
}
