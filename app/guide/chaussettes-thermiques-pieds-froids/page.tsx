import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Chaussettes thermiques : comment les choisir | SWELTR",
  description: "Repères pour choisir des chaussettes thermiques, vérifier le confort dans ses chaussures et découvrir le Kit Grand Froid SWELTR.",
  alternates: { canonical: `${siteUrl}/guide/chaussettes-thermiques-pieds-froids` },
  openGraph: { title: "Comment choisir des chaussettes thermiques | SWELTR", description: "Conseils de confort et contenu du kit d’hiver SWELTR qui inclut des chaussettes thermiques.", url: `${siteUrl}/guide/chaussettes-thermiques-pieds-froids`, siteName: "SWELTR", locale: "fr_CH", type: "article" },
};

export default function GuideChaussettesThermiques() {
  return (
    <LegalPage title="Chaussettes thermiques : repères pour choisir" updated="Novembre 2026">
      <section><h2>Commence par le confort dans tes chaussures</h2><p>Une chaussette d’hiver doit rester agréable avec les chaussures que tu portes. Si une paire plus épaisse comprime ton pied, essaie une chaussure qui laisse davantage d’espace plutôt que de forcer dans une paire serrée.</p></section>
      <section><h2>Vérifie la matière et l’entretien</h2><p>La composition, les tailles et les consignes d’entretien dépendent du modèle. Regarde l’étiquette du produit et les informations de sa fiche pour savoir comment il doit être entretenu. Ne suppose pas qu’une chaussette peut passer en machine sans vérifier l’étiquette.</p></section>
      <section><h2>Comment elles s’intègrent à la collection SWELTR</h2><p>Les chaussettes thermiques sont incluses dans le <Link href="/produit/trio">Kit Grand Froid</Link>, avec des gants chauffants et une écharpe chauffante USB. Le prix de 62,99 CHF correspond au kit entier ; aucun prix séparé des chaussettes n’est confirmé.</p><p>La fiche produit du kit indique le contenu complet et les précautions à consulter avant de commander.</p></section>
      <section><h2>Questions fréquentes</h2><p><strong>Les chaussettes sont-elles vendues seules ?</strong> Non, elles sont incluses dans le Kit Grand Froid.</p><p><strong>Quel est leur prix ?</strong> Le tarif confirmé de 62,99 CHF correspond au Kit Grand Froid complet, pas aux chaussettes seules.</p><p><strong>Comment les laver ?</strong> Suis les indications de l’étiquette du modèle livré.</p></section>
      <section><h2>Continuer la comparaison</h2><p>Parcours la <Link href="/boutique">boutique d’hiver SWELTR</Link>, découvre <Link href="/guide/ne-plus-avoir-froid-hiver">nos repères pour mieux s’équiper contre le froid</Link> ou consulte <Link href="/faq">les réponses aux questions fréquentes</Link>.</p></section>
    </LegalPage>
  );
}
