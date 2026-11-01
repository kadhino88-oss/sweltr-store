import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Gants chauffants : les critères à vérifier avant achat | SWELTR",
  description: "Comment choisir des gants chauffants : confort, taille, consignes du fabricant et comparaison des kits SWELTR.",
  alternates: { canonical: `${siteUrl}/guide/gants-chauffants-avis` },
  openGraph: { title: "Bien choisir ses gants chauffants | SWELTR", description: "Repères pratiques pour examiner une paire de gants chauffants et comparer les kits SWELTR.", url: `${siteUrl}/guide/gants-chauffants-avis`, siteName: "SWELTR", locale: "fr_CH", type: "article" },
};

export default function GuideGantsChauffants() {
  return (
    <LegalPage title="Gants chauffants : les critères à vérifier avant achat" updated="Novembre 2026">
      <section><h2>Pars de l’usage prévu</h2><p>Réfléchis aux situations où tu porteras les gants : trajet quotidien, promenade ou activité en plein air. Vérifie que la coupe et la liberté de mouvement te conviennent pour cet usage. La taille et les consignes exactes dépendent toujours du modèle retenu.</p></section>
      <section><h2>Lis les informations du modèle</h2><p>Avant d’acheter un accessoire chauffant, consulte sa fiche et sa notice. Vérifie les consignes d’alimentation et de recharge, les commandes disponibles, les précautions d’utilisation et les instructions de nettoyage. N’applique pas à un produit les chiffres ou les consignes d’un autre modèle.</p><p>Les détails techniques précis des modèles SWELTR sont ceux de la notice fournie. Nous n’affichons pas de durée d’autonomie, de température ou de temps de recharge qui n’a pas été confirmé.</p></section>
      <section><h2>Choisis le contenu qui te sera utile</h2><p>Le <Link href="/produit/solo">Solo Chaleur Mains</Link> contient une paire de gants chauffants et coûte 36,99 CHF. Le <Link href="/produit/duo">Duo Chaleur Totale</Link> ajoute une écharpe chauffante USB pour 52,99 CHF. Le <Link href="/produit/trio">Kit Grand Froid</Link> ajoute aussi des chaussettes thermiques et coûte 62,99 CHF.</p><p>Ces prix concernent les kits complets ; les gants ne sont pas affichés comme article vendu séparément. Compare le contenu avant de décider.</p></section>
      <section><h2>Utilise et entretiens les gants avec soin</h2><p>Suis les consignes du fabricant pour l’utilisation, l’alimentation et le nettoyage. N’utilise pas l’article si son câble ou son boîtier est visiblement abîmé. Si une instruction n’est pas claire, contacte le service client avant utilisation.</p></section>
      <section><h2>Questions fréquentes</h2><p><strong>Quelle est l’autonomie des gants SWELTR ?</strong> Elle dépend du modèle livré ; consulte la notice correspondante. Aucun chiffre non confirmé n’est annoncé sur le site.</p><p><strong>Peut-on laver les gants en machine ?</strong> Vérifie la notice du modèle avant le nettoyage et respecte ses instructions.</p><p><strong>Les gants sont-ils disponibles seuls ?</strong> Ils sont proposés dans les kits d’hiver SWELTR. Les prix et le contenu complets figurent sur chaque fiche de kit.</p></section>
      <section><h2>Pour aller plus loin</h2><p>Découvre les autres repères dans notre <Link href="/guide/ne-plus-avoir-froid-hiver">guide pour mieux s’équiper en hiver</Link>, le <Link href="/guide/chaussettes-thermiques-pieds-froids">guide des chaussettes thermiques</Link> et la page de <Link href="/boutique">comparaison des kits</Link>.</p></section>
    </LegalPage>
  );
}
