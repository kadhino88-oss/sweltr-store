import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

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
  },
  {
    href: "/guide/gants-chauffants-avis",
    title: "Bien choisir ses gants chauffants",
    description: "Autonomie, température, recharge et entretien : les critères à comparer.",
  },
  {
    href: "/guide/chaussettes-thermiques-pieds-froids",
    title: "En finir avec les pieds froids",
    description: "Comprendre l'isolation thermique et choisir des chaussettes adaptées.",
  },
  {
    href: "/guide/cadeaux-hiver-chauffants",
    title: "Quel équipement chauffant offrir ?",
    description: "Une idée cadeau utile selon la personne, l'usage et le budget.",
  },
];

export default function GuidesPage() {
  return (
    <ContentPage
      title="Guides et conseils"
      description="Des ressources pour comprendre le froid, choisir ton équipement et en prendre soin."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.href} className="rounded-2xl border border-line bg-panel p-6">
            <h2 className="font-display text-xl font-semibold text-cream">{guide.title}</h2>
            <p className="mt-3">{guide.description}</p>
            <Link
              href={guide.href}
              className="mt-5 inline-flex text-xs font-mono uppercase tracking-widest text-orange hover:text-cream transition-colors"
            >
              Lire le guide →
            </Link>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
