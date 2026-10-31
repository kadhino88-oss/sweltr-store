import Link from "next/link";
import LegalPage from "@/components/LegalPage";

const siteUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app")).replace(/\/$/, "");

export const metadata = {
  title: "Gants chauffants : guide d'achat 2026 (autonomie, sécurité, prix) — SWELTR",
  description:
    "Comment choisir des gants chauffants efficaces : autonomie réelle, paliers de température, sécurité au grand froid, entretien. Guide complet avant d'acheter.",
  alternates: {
    canonical: `${siteUrl}/guide/gants-chauffants-avis`,
  },
};

export default function GuideGantsChauffants() {
  return (
    <LegalPage title="Gants chauffants : comment bien choisir en 2026" updated="Septembre 2026">
      <section>
        <h2>Pourquoi un gant chauffant plutôt qu'un gant d'hiver classique</h2>
        <p>
          Un gant d'hiver classique isole — il ralentit la perte de chaleur, mais n'en produit pas.
          Sous -3°C, en dessous d'un certain seuil d'activité (vélo, chantier statique, attente en
          extérieur), l'isolation seule ne suffit plus : les mains finissent par se refroidir quand
          même. Un gant chauffant ajoute une source de chaleur active, généralement une résistance
          électrique alimentée par une batterie rechargeable, qui maintient une température
          constante indépendamment du froid extérieur.
        </p>
      </section>

      <section>
        <h2>Les critères qui comptent vraiment</h2>
        <p>
          <strong>Autonomie réelle</strong> — pas l'autonomie annoncée au palier le plus faible. La
          plupart des fabricants communiquent sur le meilleur cas (chaleur minimale). Vérifie
          l'autonomie au palier que tu utiliseras vraiment.
        </p>
        <p>
          <strong>Temps de recharge</strong> — une batterie qui met 4 à 5h à recharger est
          contraignante si tu comptes t'en servir tous les jours. Vise une recharge USB en 2h maximum.
        </p>
        <p>
          <strong>Nombre de paliers de température</strong> — un seul niveau de chauffe use la
          batterie plus vite qu'utile par temps doux, et peut être insuffisant par grand froid. Plusieurs
          paliers permettent d'adapter la consommation à la météo du jour.
        </p>
        <p>
          <strong>Poids et souplesse</strong> — un gant chauffant reste un gant : s'il est trop
          rigide ou trop lourd, il devient inutilisable pour du vélo ou du travail manuel précis.
        </p>
      </section>

      <section>
        <h2>Sécurité et entretien</h2>
        <p>
          Les caractéristiques électriques, les consignes de lavage et la résistance à l'eau
          dépendent du modèle. Avant toute utilisation ou tout nettoyage, vérifie la notice du
          fabricant. Ne mouille pas les batteries et ne lave pas les gants avec les batteries en
          place, sauf indication explicite du fabricant.
        </p>
      </section>

      <section>
        <h2>Ce que propose SWELTR</h2>
        <p>
          Consulte la fiche des{" "}
          <Link href="/produit/solo">gants chauffants SWELTR</Link> pour connaître les
          caractéristiques annoncées pour ce modèle. Le{" "}
          <Link href="/produit/duo">Duo Chaleur Totale</Link> et le{" "}
          <Link href="/produit/trio">Kit Grand Froid</Link> proposent d'autres compositions ;
          vérifie leur contenu et leur prix avant de choisir.
        </p>
      </section>

      <section>
        <h2>Aller plus loin</h2>
        <p>
          Ce guide se concentre sur les mains. Pour une vue d'ensemble (mains, cou, pieds) et les
          erreurs courantes qui font qu'on a froid malgré un bon équipement, voir{" "}
          <Link href="/guide/ne-plus-avoir-froid-hiver">notre guide complet contre le froid</Link>.
          Envie d'offrir plutôt que d'acheter pour toi ? Voir notre{" "}
          <Link href="/guide/cadeaux-hiver-chauffants">guide cadeau hiver chauffant</Link>. Pour les
          pieds spécifiquement, voir notre{" "}
          <Link href="/guide/chaussettes-thermiques-pieds-froids">guide des chaussettes thermiques</Link>.
        </p>
      </section>

      <section>
        <h2>Questions fréquentes</h2>
        <p>
          <strong>Les gants chauffants sont-ils résistants à l'eau ?</strong> Consulte la fiche et
          les instructions du fabricant du modèle choisi ; n'utilise pas un accessoire électrique
          mouillé ou endommagé.
        </p>
        <p>
          <strong>Peut-on recharger en roulant, avec une batterie externe ?</strong> Oui, tant que la
          batterie externe fournit une sortie USB standard.
        </p>
        <p>
          <strong>Combien de temps dure la batterie avant de devoir la remplacer ?</strong> La
          durée de vie varie selon la batterie et les conditions d'utilisation. Consulte les
          consignes du fabricant pour l'entretien et le remplacement.
        </p>
      </section>
    </LegalPage>
  );
}
