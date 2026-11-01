import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import ProductCard from "@/components/ProductCard";
import { TIERS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Boutique — Collections et accessoires toute l’année | SWELTR",
  description:
    "Compare les trois kits d’hiver SWELTR : articles inclus, photos et prix confirmés en CHF. Choisis l’équipement adapté à tes journées froides.",
  alternates: { canonical: `${siteUrl}/boutique` },
  openGraph: { title: "Boutique SWELTR — Kits d’hiver", description: "Comparez le contenu et le prix des trois kits SWELTR pour l’hiver.", url: `${siteUrl}/boutique`, siteName: "SWELTR", locale: "fr_CH", type: "website" },
};

export default function BoutiquePage() {
  return (
    <ContentPage
      wide
      eyebrow="BOUTIQUE · ÉQUIPEMENT ANTI-FROID"
      title="Choisis ton kit pour l’hiver"
      description={`${TIERS.length} kits, des photos et des prix clairs. Ouvre une fiche pour voir tous les détails.`}
    >
      <section
        aria-label="Kits SWELTR disponibles"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TIERS.map((tier) => <ProductCard key={tier.id} tier={tier} />)}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel2 p-5 md:px-7">
        <p className="font-display text-lg font-semibold text-ink">
          Besoin d’un conseil avant de choisir ?
        </p>
        <div className="flex gap-3">
          <Link
            href="/faq"
            className="rounded-full border border-line bg-panel px-5 py-2.5 text-sm font-semibold text-ink"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-gold-strong px-5 py-2.5 text-sm font-semibold text-ink"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </ContentPage>
  );
}
