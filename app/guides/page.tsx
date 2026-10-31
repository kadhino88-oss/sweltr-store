import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

const siteUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ((process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app")).replace(/\/$/, ""))).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Guides et conseils contre le froid — SWELTR",
  description:
    "Retrouve les guides SWELTR pour mieux choisir tes gants chauffants, protéger tes pieds du froid et préparer l'hiver.",
  alternates: { canonical: `${siteUrl}/guides` },
};

const guides = [
  {
    href: "/guide/ne-plus-avoir-froid-hiver",
    title: "Ne plus avoir froid cet hiver",
    description: "Des conseils pratiques pour protéger les mains, le cou et les pieds du froid.",
    category: "Guide général",
    readingTime: "5 min de lecture",
  },
  {
    href: "/guide/gants-chauffants-avis",
    title: "Bien choisir ses gants chauffants",
    description: "Autonomie, température, recharge et entretien : les critères à comparer.",
    category: "Mains",
    readingTime: "4 min de lecture",
  },
  {
    href: "/guide/chaussettes-thermiques-pieds-froids",
    title: "En finir avec les pieds froids",
    description: "Comprendre l'isolation thermique et choisir des chaussettes adaptées.",
    category: "Pieds",
    readingTime: "4 min de lecture",
  },
  {
    href: "/guide/cadeaux-hiver-chauffants",
    title: "Quel équipement chauffant offrir ?",
    description: "Une idée cadeau utile selon la personne, l'usage et le budget.",
    category: "Idées cadeaux",
    readingTime: "4 min de lecture",
  },
];

export default function GuidesPage() {
  return (
    <ContentPage
      eyebrow="CONSEILS · GUIDES PRATIQUES"
      title="Guides et conseils"
      description="Des ressources détaillées pour comprendre comment le froid agit, comparer les équipements thermiques et choisir une solution adaptée à ton quotidien."
    >
      <section className="rounded-2xl border border-line bg-panel2 p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">Par où commencer ?</h2>
        <p className="mt-4">
          Si tu ne sais pas encore quel équipement choisir, commence par le guide général contre
          le froid. Il présente les différentes zones à protéger et t'aide à identifier ton besoin.
          Tu peux ensuite consulter le guide correspondant aux mains, aux pieds ou à la recherche
          d'un cadeau.
        </p>
        <p className="mt-3">
          Nos articles expliquent aussi la différence entre chaleur active et isolation passive :
          les gants et l'écharpe SWELTR chauffent grâce à une alimentation USB, tandis que les
          chaussettes thermiques retiennent la chaleur naturelle du pied.
        </p>
      </section>
      <div className="grid gap-5 md:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.href} className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 md:p-7">
            <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-gold-deep">
              <span>{guide.category}</span>
              <span className="text-muted">{guide.readingTime}</span>
            </div>
            <h2 className="font-display text-xl font-semibold text-ink">{guide.title}</h2>
            <p className="mt-3 flex-1">{guide.description}</p>
            <Link
              href={guide.href}
              className="mt-6 inline-flex text-xs font-mono uppercase tracking-widest text-gold-deep hover:text-ink transition-colors"
            >
              Lire le guide →
            </Link>
          </article>
        ))}
      </div>
      <section>
        <h2 className="font-display text-2xl font-bold text-ink">Choisir un équipement adapté</h2>
        <p className="mt-4">
          Pour faire un choix utile, pars de ta situation : le temps passé dehors, ton niveau
          d'activité, la partie du corps la plus exposée et la possibilité de recharger les
          accessoires. Une personne qui attend immobile dans le froid n'a pas les mêmes besoins
          qu'une personne qui marche. La taille, la liberté de mouvement et l'entretien comptent
          également, au même titre que l'autonomie annoncée.
        </p>
        <p className="mt-3">
          Nos guides sont informatifs et ne remplacent pas les instructions du fabricant. Pour
          comparer les produits de la gamme, rends-toi dans la{" "}
          <Link href="/boutique" className="text-gold-deep underline">boutique SWELTR</Link>.
          Pour les réponses sur les commandes, la livraison et les retours, consulte notre{" "}
          <Link href="/faq" className="text-gold-deep underline">foire aux questions</Link>.
        </p>
      </section>
    </ContentPage>
  );
}
