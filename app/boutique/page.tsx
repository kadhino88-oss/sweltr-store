import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { TIERS } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata: Metadata = {
  title: "Boutique — Kits chauffants et accessoires anti-froid | SWELTR",
  description:
    "Découvre les kits chauffants SWELTR : gants, écharpe et chaussettes thermiques. Compare les offres et choisis ton équipement pour l'hiver.",
  alternates: { canonical: `${siteUrl}/boutique` },
};

export default function BoutiquePage() {
  return (
    <ContentPage
      title="La boutique SWELTR"
      description="Choisis l'équipement adapté à tes besoins : des gants chauffants au kit complet pour affronter le froid."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <article key={tier.id} className="overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="relative aspect-square">
              <Image
                src={tier.cardImages[0]}
                alt={tier.items[0] || tier.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-orange">{tier.tagline}</p>
              <h2 className="font-display text-xl font-semibold text-cream mt-2">{tier.name}</h2>
              <p className="font-display text-2xl font-bold text-cream mt-4">{tier.price} €</p>
              <p className="mt-3">{tier.description}</p>
              <Link
                href={`/produit/${tier.id}`}
                className="mt-6 inline-flex rounded-full bg-cream px-5 py-3 font-display text-xs font-semibold uppercase tracking-wide text-ink hover:bg-orange transition-colors"
              >
                Découvrir ce kit
              </Link>
            </div>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
