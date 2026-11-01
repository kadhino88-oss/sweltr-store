import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Idée cadeau hiver : comparer les kits SWELTR | SWELTR",
  description: "Choisissez un cadeau d’hiver en comparant les accessoires inclus, les prix confirmés et les modalités de livraison SWELTR.",
  alternates: { canonical: `${siteUrl}/guide/cadeaux-hiver-chauffants` },
  openGraph: { title: "Choisir un cadeau d’hiver | SWELTR", description: "Comparez les trois kits d’hiver SWELTR selon leur contenu et leur prix.", url: `${siteUrl}/guide/cadeaux-hiver-chauffants`, siteName: "SWELTR", locale: "fr_CH", type: "article" },
};

export default function GuideCadeauxHiver() {
  return (
    <LegalPage title="Idée cadeau hiver : quel kit choisir ?" updated="Novembre 2026">
      <section><h2>Un cadeau à choisir selon ses habitudes</h2><p>Pour offrir un accessoire d’hiver, pense aux moments où la personne sort et aux zones qu’elle souhaite couvrir. Si tu ne connais pas encore ses préférences, comparer le contenu des kits peut t’aider à choisir sans supposer ses besoins.</p></section>
      <section><h2>Trois compositions, trois prix confirmés</h2><ul><li><Link href="/produit/solo">Solo Chaleur Mains</Link> — une paire de gants chauffants, 36,99 CHF.</li><li><Link href="/produit/duo">Duo Chaleur Totale</Link> — gants chauffants et écharpe chauffante USB, 52,99 CHF.</li><li><Link href="/produit/trio">Kit Grand Froid</Link> — gants, écharpe chauffante USB et chaussettes thermiques, 62,99 CHF.</li></ul><p>Les tarifs affichés sont ceux des kits complets. Leur contenu est détaillé sur chaque fiche pour t’aider à comparer ce qui est inclus avant de choisir.</p></section>
      <section><h2>Vérifie les détails avant de commander</h2><p>Ouvre la fiche du kit pour relire les articles inclus, les conseils d’utilisation et les précautions. Pour un article chauffant, les informations propres au modèle se trouvent dans la notice qui l’accompagne. Pour un textile, consulte l’étiquette d’entretien.</p><p>Les modalités de livraison, de retour et les conditions applicables figurent sur la page <Link href="/livraison-retours">Livraison et retours</Link>. Vérifie la date estimée selon ta destination avant d’offrir le cadeau.</p></section>
      <section><h2>À propos des nouveautés</h2><p>Les autres références visibles dans le catalogue sont encore en préparation. Leur disponibilité, leurs variantes et leurs prix seront confirmés avant l’ouverture des commandes.</p></section>
      <section><h2>Questions fréquentes</h2><p><strong>Quel kit convient si je veux offrir un seul accessoire ?</strong> Le Solo réunit les gants chauffants. Tu peux consulter sa fiche pour voir les détails avant de choisir.</p><p><strong>Comment vérifier la date de livraison ?</strong> Consulte les informations de livraison et les modalités proposées pour ta destination avant le paiement.</p><p><strong>Que faire si je ne connais pas la taille ?</strong> Les tailles et variantes doivent être consultées sur la fiche de la référence choisie ; pour un produit encore en préparation, elles ne sont pas confirmées.</p></section>
      <section><h2>Plus de conseils</h2><p>Pour choisir un accessoire chauffant, lis notre <Link href="/guide/gants-chauffants-avis">guide des gants chauffants</Link>. Pour parcourir les offres, retrouve les trois kits dans la <Link href="/boutique">boutique SWELTR</Link>.</p></section>
    </LegalPage>
  );
}
