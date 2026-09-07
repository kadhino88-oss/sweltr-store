import Link from "next/link";
import LegalPage from "@/components/LegalPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata = {
  title: "Ne plus avoir froid cet hiver : 5 conseils concrets — SWELTR",
  description:
    "Mains, cou, pieds : pourquoi tu as froid en hiver malgré des vêtements chauds, et comment y remédier concrètement. Conseils pratiques et équipement adapté.",
  alternates: {
    canonical: `${siteUrl}/guide/ne-plus-avoir-froid-hiver`,
  },
};

export default function GuideFroidHiver() {
  return (
    <LegalPage title="Ne plus avoir froid cet hiver : ce qui marche vraiment" updated="Septembre 2026">
      <section>
        <h2>Pourquoi tu as froid même bien habillé</h2>
        <p>
          Le corps privilégie les organes vitaux en cas de froid : il réduit la circulation
          sanguine vers les extrémités (mains, pieds, oreilles) en premier. C'est pour ça qu'on
          peut avoir le torse au chaud sous une bonne veste et les doigts complètement gourds au
          bout de dix minutes dehors. L'isolation passive (duvet, laine, polaire) ralentit la perte
          de chaleur, mais ne compense pas cette baisse de circulation localisée — d'où l'intérêt
          d'une source de chaleur active sur les zones les plus exposées.
        </p>
      </section>

      <section>
        <h2>1. Cible les extrémités en priorité</h2>
        <p>
          Mains, cou et pieds perdent la chaleur plus vite que le reste du corps (surface
          d'échange élevée, moins de masse musculaire pour générer de la chaleur). C'est
          généralement là que ça vaut le coup d'investir en premier, avant une veste plus épaisse.
        </p>
      </section>

      <section>
        <h2>2. Ne néglige pas le cou</h2>
        <p>
          Le cou concentre des vaisseaux sanguins proches de la surface de la peau — le couvrir
          limite une vraie déperdition de chaleur, souvent sous-estimée par rapport aux mains.
        </p>
      </section>

      <section>
        <h2>3. Les couches actives valent mieux que les couches épaisses</h2>
        <p>
          Empiler les pulls limite les mouvements et n'apporte pas de chaleur au-delà d'un certain
          point. Un équipement chauffant actif (gants, écharpe) reste efficace même par grand froid,
          contrairement à l'isolation seule qui atteint vite ses limites sous -5°C en usage statique
          (attente, vélo lent, chantier extérieur).
        </p>
      </section>

      <section>
        <h2>4. Recharge la veille, pas le matin même</h2>
        <p>
          Les équipements chauffants USB (gants, écharpe) se rechargent en 2h environ — largement
          faisable le soir pour repartir avec l'autonomie complète le lendemain matin, plutôt que de
          découvrir une batterie vide au moment de sortir.
        </p>
      </section>

      <section>
        <h2>5. Adapte le palier de chauffe à la météo réelle</h2>
        <p>
          Utiliser le palier maximum tous les jours use la batterie plus vite qu'utile. Réserve-le
          aux journées vraiment froides (en dessous de -5°C) et reste sur un palier intermédiaire le
          reste du temps — l'autonomie s'en ressent directement.
        </p>
      </section>

      <section>
        <h2>L'équipement SWELTR pour appliquer ces principes</h2>
        <p>
          Les trois produits de la gamme couvrent les zones prioritaires citées ci-dessus :{" "}
          <Link href="/produit/solo">gants chauffants</Link> pour les mains, écharpe chauffante à 3
          paliers pour le cou (dans le <Link href="/produit/duo">Duo Chaleur Totale</Link>), et
          chaussettes thermiques pour les pieds (dans le{" "}
          <Link href="/produit/trio">Kit Grand Froid</Link>). Livré sous 48h, garantie 30 jours si
          ça ne convient pas.
        </p>
      </section>

      <section>
        <h2>Aller plus loin</h2>
        <p>
          Pour le détail des critères de choix des gants chauffants, voir notre{" "}
          <Link href="/guide/gants-chauffants-avis">guide d'achat des gants chauffants</Link>. Si tu
          cherches plutôt une idée cadeau pour quelqu'un de frileux, voir notre{" "}
          <Link href="/guide/cadeaux-hiver-chauffants">guide cadeau hiver chauffant</Link>. Pour les
          pieds froids en particulier, voir notre{" "}
          <Link href="/guide/chaussettes-thermiques-pieds-froids">guide des chaussettes thermiques</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
