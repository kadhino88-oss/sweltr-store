import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Comment mieux s’équiper contre le froid en hiver | SWELTR",
  description: "Conseils pour choisir des accessoires d’hiver selon les zones exposées, les habitudes et le contenu vérifié des kits SWELTR.",
  alternates: { canonical: `${siteUrl}/guide/ne-plus-avoir-froid-hiver` },
  openGraph: { title: "Mieux s’équiper contre le froid en hiver | SWELTR", description: "Quelques repères pour comparer les accessoires d’hiver et les kits SWELTR.", url: `${siteUrl}/guide/ne-plus-avoir-froid-hiver`, siteName: "SWELTR", locale: "fr_CH", type: "article" },
};

export default function GuideFroidHiver() {
  return (
    <LegalPage title="Mieux s’équiper contre le froid en hiver" updated="Novembre 2026">
      <section><h2>Commence par les moments où tu as froid</h2><p>Avant de choisir un accessoire, repère les situations où tu en as besoin : trajets, promenades, attente dehors ou moments de détente à la maison. La durée passée à l’extérieur, ton niveau d’activité et la liberté de mouvement souhaitée peuvent orienter le choix.</p></section>
      <section><h2>Choisis la zone que tu veux équiper</h2><p>Si ce sont surtout tes mains qui te gênent, un kit centré sur les gants peut suffire. Si tu souhaites réunir un accessoire pour les mains et un autre pour le cou, compare le Duo. Pour retrouver aussi des chaussettes thermiques dans le même ensemble, regarde le Kit Grand Froid.</p></section>
      <section><h2>Vérifie le confort et les consignes</h2><p>Un accessoire doit convenir à ton usage et rester confortable. Pour les articles chauffants, lis la notice avant la première utilisation et suis les consignes d’alimentation, d’entretien et de sécurité du modèle livré. Pour les articles textiles, consulte l’étiquette d’entretien.</p></section>
      <section><h2>Compare le contenu et le prix complet</h2><p>Les trois prix confirmés sont : Solo Chaleur Mains, 36,99 CHF ; Duo Chaleur Totale, 52,99 CHF ; Kit Grand Froid, 62,99 CHF. Chaque fiche précise les articles inclus. Ces accessoires sont proposés en kits ; aucun prix unitaire séparé n’est affiché.</p><p>Les nouveautés en sélection restent indiquées « Bientôt disponible · prix à confirmer » tant que le modèle et les modalités de vente ne sont pas validés.</p></section>
      <section><h2>Les kits d’hiver SWELTR</h2><ul><li><Link href="/produit/solo">Solo Chaleur Mains</Link> : une paire de gants chauffants, 36,99 CHF.</li><li><Link href="/produit/duo">Duo Chaleur Totale</Link> : gants chauffants et écharpe chauffante USB, 52,99 CHF.</li><li><Link href="/produit/trio">Kit Grand Froid</Link> : gants, écharpe chauffante USB et chaussettes thermiques, 62,99 CHF.</li></ul><p>Consulte aussi les <Link href="/guide/gants-chauffants-avis">repères pour choisir des gants chauffants</Link>, le <Link href="/guide/chaussettes-thermiques-pieds-froids">guide des chaussettes thermiques</Link> et nos <Link href="/guides">autres guides d’hiver</Link>.</p></section>
      <section><h2>Avant de commander</h2><p>Vérifie les détails de l’offre, le contenu du kit et les modalités qui s’appliquent à ta destination sur la page <Link href="/livraison-retours">Livraison et retours</Link>. En cas de doute sur un produit ou une commande, l’équipe SWELTR est joignable depuis la page <Link href="/contact">Contact</Link>.</p></section>
    </LegalPage>
  );
}
