import type { Metadata } from "next";
import Link from "next/link";
import { Battery, Hand, Layers3 } from "lucide-react";
import ContentPage from "@/components/ContentPage";

const siteUrl = process.env.SITE_URL || "https://sweltr-store-bk-entreprise.vercel.app";

export const metadata: Metadata = {
  title: "À propos de SWELTR — Des équipements pensés pour le froid",
  description:
    "Découvre l'approche SWELTR : des accessoires pour protéger les mains, le cou et les pieds lors des journées froides.",
  alternates: { canonical: `${siteUrl}/a-propos` },
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="LA MARQUE · SWELTR"
      title="Mieux vivre les journées froides"
      description="SWELTR rassemble des accessoires destinés à rendre les sorties et les activités par temps froid plus confortables."
    >
      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-line bg-panel p-6">
          <Hand className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Protéger les zones exposées</h2>
          <p className="mt-3">
            La gamme s'organise autour des mains, du cou et des pieds, des zones souvent exposées
            lorsque l'on se déplace ou travaille dehors en hiver.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-panel p-6">
          <Battery className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Chaleur active</h2>
          <p className="mt-3">
            Les gants et l'écharpe de la gamme sont des accessoires chauffants rechargeables par
            USB. Leur autonomie dépend notamment du niveau de chauffe et des conditions d'utilisation.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-panel p-6">
          <Layers3 className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Isolation complémentaire</h2>
          <p className="mt-3">
            Les chaussettes du kit Trio sont thermiques et sans batterie : elles retiennent la
            chaleur naturelle du pied au lieu d'en produire.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-line bg-panel2 p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">Une gamme simple à comparer</h2>
        <p className="mt-4">
          Le kit Solo est centré sur les mains, le Duo associe gants et écharpe chauffante, et le
          Kit Grand Froid ajoute des chaussettes thermiques. Cette composition permet de choisir
          selon tes usages sans confondre chauffage actif et isolation.
        </p>
        <p className="mt-3">
          Les caractéristiques connues, les prix et les détails de chaque offre sont présentés
          dans la <Link href="/boutique" className="text-gold-deep underline">boutique</Link> et sur
          les <Link href="/produit/solo" className="text-gold-deep underline">fiches produit</Link>.
          Tu peux aussi consulter nos <Link href="/guides" className="text-gold-deep underline">guides pratiques</Link>
          avant de choisir.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink">Une question ?</h2>
        <p className="mt-3">
          Consulte la <Link href="/faq" className="text-gold-deep underline">FAQ</Link> pour les
          questions courantes sur les produits, le paiement et la livraison. Pour une demande
          personnelle, retrouve les coordonnées du service client sur la page{" "}
          <Link href="/contact" className="text-gold-deep underline">Contact</Link>.
        </p>
      </section>
    </ContentPage>
  );
}
