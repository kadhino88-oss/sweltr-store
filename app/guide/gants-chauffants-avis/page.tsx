import Link from "next/link";
import LegalPage from "@/components/LegalPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

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
          Les gants chauffants USB fonctionnent en basse tension (généralement 3,7V à 7,4V selon la
          batterie), ce qui les rend sûrs pour un usage normal, contrairement à certains modèles
          filaires bas de gamme. Évite de les faire tremper entièrement ou de les passer en machine
          avec la batterie encore en place — vérifie toujours les instructions du fabricant avant
          lavage. En cas de forte humidité prolongée (pluie battante, neige fondante), privilégie un
          séchage à l'air libre plutôt qu'une source de chaleur directe.
        </p>
      </section>

      <section>
        <h2>Ce que propose SWELTR</h2>
        <p>
          Les <Link href="/produit/solo">gants chauffants SWELTR</Link> tiennent jusqu'à 4h de
          chaleur constante par charge, se rechargent en USB en environ 2h, et existent en trois
          coloris (gris, kaki, rouge). Ils sont pensés pour un usage quotidien — vélo, chantier,
          trajets à pied — plutôt que pour l'alpinisme extrême. Si tu veux couvrir aussi le cou et
          les pieds, le <Link href="/produit/duo">Duo Chaleur Totale</Link> et le{" "}
          <Link href="/produit/trio">Kit Grand Froid</Link> ajoutent une écharpe chauffante et des
          chaussettes thermiques au même prix par article que la vente à l'unité.
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
          <strong>Les gants chauffants marchent-ils sous la pluie ?</strong> Oui pour une exposition
          courte, mais évite l'immersion complète — ce sont des produits résistants aux intempéries
          usuelles, pas étanches à 100%.
        </p>
        <p>
          <strong>Peut-on recharger en roulant, avec une batterie externe ?</strong> Oui, tant que la
          batterie externe fournit une sortie USB standard.
        </p>
        <p>
          <strong>Combien de temps dure la batterie avant de devoir la remplacer ?</strong> Comme
          toute batterie lithium rechargeable, l'autonomie diminue progressivement après plusieurs
          centaines de cycles de charge — un usage quotidien en hiver, avec une pause en été, donne
          généralement plusieurs saisons d'usage normal.
        </p>
      </section>
    </LegalPage>
  );
}
