import LegalPage from "@/components/LegalPage";

const siteUrl = process.env.SITE_URL || "https://sweltr-store-bk-entreprise.vercel.app";

export const metadata = {
  title: "Politique de confidentialité — SWELTR",
  alternates: { canonical: `${siteUrl}/confidentialite` },
};

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" updated="Octobre 2026">
      <section>
        <h2>1. Données collectées</h2>
        <p>Lors d'une commande, nous collectons les données suivantes :</p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse de livraison</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone</li>
        </ul>
        <p>
          Les données de paiement (numéro de carte bancaire) sont directement collectées et
          traitées par Stripe ; SWELTR n'y a jamais accès et ne les stocke pas.
        </p>
      </section>

      <section>
        <h2>2. Utilisation des données</h2>
        <p>Ces données sont utilisées uniquement pour :</p>
        <ul>
          <li>Traiter et expédier ta commande</li>
          <li>Te contacter en cas de besoin concernant ta commande</li>
          <li>Répondre à tes demandes de service client</li>
        </ul>
        <p>Elles ne sont jamais revendues à des tiers à des fins commerciales.</p>
      </section>

      <section>
        <h2>3. Destinataires des données</h2>
        <p>
          Tes données sont partagées uniquement avec les prestataires nécessaires au traitement de
          ta commande :
        </p>
        <ul>
          <li>Stripe (traitement du paiement)</li>
          <li>Notre fournisseur logistique (expédition du colis)</li>
          <li>Vercel (hébergement technique du site)</li>
        </ul>
      </section>

      <section>
        <h2>4. Durée de conservation</h2>
        <p>
          Tes données sont conservées pendant la durée nécessaire au traitement de ta commande, puis
          archivées conformément aux obligations légales (comptabilité, garantie), soit 5 ans
          maximum.
        </p>
      </section>

      <section>
        <h2>5. Tes droits</h2>
        <p>
          Conformément au RGPD, tu disposes d'un droit d'accès, de rectification, d'effacement, de
          limitation et d'opposition concernant tes données personnelles. Pour exercer ces droits,
          contacte-nous à <strong>contact@bkentreprise.com</strong>.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          Ce site utilise uniquement des cookies techniques strictement nécessaires à son
          fonctionnement (panier, session de paiement). Aucun cookie publicitaire ou de suivi n'est
          utilisé sans ton consentement.
        </p>
      </section>

      <section>
        <h2>7. Sécurité</h2>
        <p>
          Toutes les transactions sont chiffrées et sécurisées via Stripe, certifié PCI-DSS niveau 1
          (le plus haut niveau de certification en matière de sécurité des paiements).
        </p>
      </section>
    </LegalPage>
  );
}
