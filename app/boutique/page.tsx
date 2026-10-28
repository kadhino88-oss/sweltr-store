import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import ProductCard from "@/components/ProductCard";
import { TIERS } from "@/lib/data";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app");

export const metadata: Metadata = {
  title: "Boutique — Kits chauffants et accessoires anti-froid | SWELTR",
  description:
    "Découvre les kits SWELTR, compare leurs photos et leurs prix, puis choisis l'équipement adapté à tes journées froides.",
  alternates: { canonical: `${siteUrl}/boutique` },
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
