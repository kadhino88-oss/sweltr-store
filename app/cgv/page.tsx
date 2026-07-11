import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Conditions Générales de Vente — SWELTR" };

export default function CGV() {
  return (
    <LegalPage title="Conditions Générales de Vente" updated="Juillet 2026">
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions générales de vente régissent les ventes de produits réalisées
          sur le site SWELTR entre <strong>[NOM / RAISON SOCIALE]</strong> et tout client
          effectuant un achat sur ce site.
        </p>
      </section>

      <section>
        <h2>2. Produits et prix</h2>
        <p>
          Les prix affichés sont en euros, toutes taxes comprises. SWELTR se réserve le droit de
          modifier ses prix à tout moment, les produits étant facturés sur la base des tarifs en
          vigueur au moment de la validation de la commande.
        </p>
      </section>

      <section>
        <h2>3. Commande et paiement</h2>
        <p>
          Les commandes sont passées directement sur le site et le paiement s'effectue en ligne de
          manière sécurisée via Stripe. La commande est considérée comme définitive après
          confirmation du paiement.
        </p>
      </section>

      <section>
        <h2>4. Livraison</h2>
        <p>
          Les produits sont expédiés depuis les entrepôts de nos fournisseurs partenaires. Le délai
          de livraison moyen est de <strong>7 à 15 jours ouvrés</strong> selon la destination, à
          compter de la confirmation de commande. Ce délai est indicatif et peut varier selon les
          conditions logistiques.
        </p>
      </section>

      <section>
        <h2>5. Droit de rétractation</h2>
        <p>
          Conformément à la législation en vigueur, le client dispose d'un délai de{" "}
          <strong>14 jours calendaires</strong> à compter de la réception du produit pour exercer
          son droit de rétractation, sans avoir à justifier de motif. Pour exercer ce droit, le
          client doit contacter SWELTR à l'adresse indiquée dans les Mentions légales. Les frais de
          retour sont à la charge du client, sauf si le produit est défectueux ou non conforme.
        </p>
      </section>

      <section>
        <h2>6. Garantie</h2>
        <p>
          SWELTR offre une garantie satisfait ou remboursé de 30 jours à compter de la réception du
          produit. Les produits restent par ailleurs couverts par la garantie légale de conformité
          et la garantie contre les vices cachés, conformément au Code de la consommation et au
          Code civil.
        </p>
      </section>

      <section>
        <h2>7. Responsabilité</h2>
        <p>
          SWELTR ne saurait être tenu responsable des retards de livraison liés à des événements
          hors de son contrôle (douane, transporteur, force majeure).
        </p>
      </section>

      <section>
        <h2>8. Litiges</h2>
        <p>
          En cas de litige, le client peut recourir gratuitement à un médiateur de la consommation
          conformément à l'article L.616-1 du Code de la consommation. À défaut d'accord amiable,
          les tribunaux français seront seuls compétents.
        </p>
      </section>
    </LegalPage>
  );
}
