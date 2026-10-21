import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Truck } from "lucide-react";
import ContentPage from "@/components/ContentPage";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";

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
      eyebrow="BOUTIQUE · ÉQUIPEMENT ANTI-FROID"
      title="La boutique SWELTR"
      description="Compare les kits SWELTR et choisis un équipement adapté à tes sorties, à tes trajets ou à tes journées de travail par temps froid."
    >
      <section aria-label="Les engagements SWELTR" className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4">
          <Truck className="shrink-0 text-gold-deep" size={20} />
          <span>Expédition annoncée sous 48 h</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4">
          <ShieldCheck className="shrink-0 text-gold-deep" size={20} />
          <span>Garantie commerciale de 30 jours</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-panel p-4">
          <Check className="shrink-0 text-gold-deep" size={20} />
          <span>Paiement sécurisé via Stripe</span>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-gold-deep">Comparer les offres</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">Choisis le niveau de protection qui te convient</h2>
          <p className="mt-3 max-w-3xl">
            Chaque kit associe des accessoires sélectionnés pour une zone du corps ou pour une
            protection plus complète. Les gants et l'écharpe produisent de la chaleur avec une
            alimentation USB ; les chaussettes du kit Trio sont isolantes et ne contiennent pas de
            batterie.
          </p>
        </div>
      </section>

      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <article key={tier.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel">
            <div className="relative aspect-[4/3] bg-panel2">
              <Image
                src={tier.cardImages[0]}
                alt={tier.items[0] || tier.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                unoptimized
              />
              {tier.cardImages.length > 1 && (
                <div className="absolute bottom-3 left-3 flex -space-x-2">
                  {tier.cardImages.slice(1).map((image, index) => (
                    <span
                      key={image}
                      className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-panel2 shadow"
                    >
                      <Image
                        src={image}
                        alt={tier.items[index + 1] || tier.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-gold-deep">{tier.tagline}</p>
              <h2 className="font-display text-xl font-semibold text-ink mt-2">{tier.name}</h2>
              <div className="mt-4 flex items-baseline gap-3">
                <p className="font-display text-2xl font-bold text-ink">{formatPrice(tier.price)}</p>
                <p className="font-mono text-sm text-muted line-through">{formatPrice(tier.compare)}</p>
              </div>
              <p className="mt-3">{tier.description}</p>
              <ul className="mt-5 space-y-2">
                {tier.specs.slice(0, 3).map((spec) => (
                  <li key={spec.label} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 shrink-0 text-gold-deep" size={16} />
                    <span><strong className="text-ink">{spec.label} :</strong> {spec.value}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/produit/${tier.id}`}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold-strong px-5 py-3 font-display text-xs font-semibold uppercase tracking-wide text-ink hover:bg-gold transition-colors"
              >
                Voir la fiche et commander <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-line bg-panel2 p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">Quel kit choisir ?</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <p><strong className="text-ink">Pour les mains :</strong> le Solo est le choix ciblé pour les trajets, les promenades et les activités où les mains sont exposées.</p>
          <p><strong className="text-ink">Pour le cou et les mains :</strong> le Duo associe les gants chauffants à l'écharpe chauffante à trois paliers.</p>
          <p><strong className="text-ink">Pour plusieurs zones :</strong> le Trio ajoute des chaussettes thermiques à isolation passive pour compléter l'équipement.</p>
        </div>
        <p className="mt-6">
          Les délais de livraison et les conditions de retour sont détaillés dans les{" "}
          <Link href="/cgv" className="text-gold-deep underline">conditions générales de vente</Link>.
          Pour toute question avant l'achat, consulte la <Link href="/faq" className="text-gold-deep underline">FAQ</Link> ou{" "}
          <Link href="/contact" className="text-gold-deep underline">contacte le service client</Link>.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink">Questions fréquentes avant l'achat</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-line bg-panel p-5">
            <h3 className="font-display font-semibold text-ink">Les accessoires ont-ils tous une batterie ?</h3>
            <p className="mt-2">Non. Les gants et l'écharpe sont chauffants et rechargeables par USB. Les chaussettes du kit Trio sont thermiques et fonctionnent sans batterie.</p>
          </article>
          <article className="rounded-xl border border-line bg-panel p-5">
            <h3 className="font-display font-semibold text-ink">Où voir les caractéristiques détaillées ?</h3>
            <p className="mt-2">Chaque fiche produit rassemble le contenu du kit, sa galerie d'images et les caractéristiques disponibles. Ouvre la fiche depuis le bouton du kit qui t'intéresse.</p>
          </article>
          <article className="rounded-xl border border-line bg-panel p-5">
            <h3 className="font-display font-semibold text-ink">Quel est le délai de livraison ?</h3>
            <p className="mt-2">L'expédition est annoncée sous 48 heures et le délai de livraison moyen est de 7 à 15 jours ouvrés selon la destination. Les conditions complètes figurent dans les CGV.</p>
          </article>
          <article className="rounded-xl border border-line bg-panel p-5">
            <h3 className="font-display font-semibold text-ink">Besoin d'aide pour choisir ?</h3>
            <p className="mt-2">Consulte la <Link href="/faq" className="text-gold-deep underline">FAQ complète</Link> ou contacte le <Link href="/contact" className="text-gold-deep underline">service client</Link> avant de commander.</p>
          </article>
        </div>
      </section>
    </ContentPage>
  );
}
