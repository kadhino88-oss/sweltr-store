import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getWinterProduct, WINTER_PRODUCTS } from "@/lib/winter-products";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import ThermalUnderwearProduct from "@/components/ThermalUnderwearProduct";

const siteUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app")).replace(/\/$/, "");

export function generateStaticParams() {
  return WINTER_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getWinterProduct(params.slug);
  if (!product) return {};
  const title = `${product.name} | SWELTR`;
  const description = `${product.short} Découvrez la collection hiver SWELTR et ses accessoires pour le froid.`;
  const productUrl = `${siteUrl}/produits/${product.slug}`;
  return {
    title,
    description,
    alternates: { canonical: productUrl },
    openGraph: {
      title, description, url: productUrl, siteName: "SWELTR", locale: "fr_CH",
      images: product.image ? [{ url: product.image, alt: product.alt }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default function WinterProductPage({ params }: { params: { slug: string } }) {
  const product = getWinterProduct(params.slug);
  if (!product) notFound();
  if (product.slug === "sous-vetements-thermiques") return <ThermalUnderwearProduct />;
  const productUrl = `${siteUrl}/produits/${product.slug}`;
  const productJsonLd = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, image: product.images?.length ? product.images : [product.image], category: product.category, url: productUrl, brand: { "@type": "Brand", name: "SWELTR" } };
  const relatedTiers = product.slug === "gants-chauffants" ? TIERS : product.slug === "echarpe-chauffante" ? TIERS.filter((tier) => tier.id !== "solo") : product.slug === "chaussettes-thermiques" ? TIERS.filter((tier) => tier.id === "trio") : [];

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/produits" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"><ArrowLeft size={16} /> Retour au catalogue</Link><Link href="/boutique" className="text-sm font-semibold text-amber-800 hover:text-slate-950">Comparer les kits →</Link></div>
        <div className="mt-6 grid overflow-hidden rounded-[2rem] bg-white shadow-sm lg:grid-cols-2">
          <div className="bg-slate-100 p-3 md:p-5">
            <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-slate-200 md:min-h-[480px]">
              {product.image ? (
                <>
                  <Image src={product.image} alt={product.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" unoptimized className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-amber-100 p-8 text-center">
                  <span className="max-w-xs font-mono text-xs uppercase tracking-[.2em] text-slate-500">Photo du produit à venir</span>
                </div>
              )}
              <span className="absolute bottom-5 left-5 rounded-full border border-white/35 bg-black/35 px-4 py-2 font-mono text-[10px] uppercase tracking-[.2em] text-white backdrop-blur">{product.category}</span>
            </div>
            {(product.images?.length ?? 0) > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label="Galerie photos du produit">
                {product.images?.slice(0, 8).map((image, index) => (
                  <div key={image} className="relative aspect-square overflow-hidden rounded-xl border border-white bg-white">
                    <Image src={image} alt={`${product.name} — photo ${index + 1}`} fill sizes="(max-width: 640px) 30vw, 120px" unoptimized className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
            <p className="font-mono text-xs uppercase tracking-[.22em] text-amber-700">{product.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{product.short}</p>
            <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Disponibilité</p><p className="mt-1 text-sm font-semibold">{product.availability === "existing" ? "Inclus dans les kits SWELTR disponibles" : "Bientôt disponible · prix à confirmer"}</p><p className="mt-1 text-xs leading-5 text-slate-500">{product.availability === "existing" ? "Les prix des kits restent affichés : Solo 36,99 CHF, Duo 52,99 CHF et Kit Grand Froid 62,99 CHF. Le prix unitaire de cet accessoire n’est pas vendu séparément." : "Nous confirmerons le prix, les variantes, le stock et les frais d’expédition avant l’ouverture des commandes."}</p></div>
            <div className="mt-7 space-y-3">
              {product.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>{highlight}</span>
                </div>
              ))}
            </div>
            <Link href={product.href || "/boutique"} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              {product.availability === "existing" ? "Voir les kits et leurs prix" : "Voir les produits disponibles"} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700">Mode d’utilisation</p>
            <h2 className="mt-2 text-2xl font-bold">Comment l’utiliser ?</h2>
            <p className="mt-3 leading-7 text-slate-600">{product.slug === "gants-chauffants" ? "Choisis le kit qui contient les gants, vérifie les instructions du fabricant et les accessoires fournis, puis utilise-les conformément à la notice. Avant une utilisation prolongée, contrôle le niveau de charge et les consignes d’entretien." : product.slug === "echarpe-chauffante" ? "L’écharpe est incluse dans les kits qui la proposent. Vérifie la source d’alimentation et les consignes du fabricant avant utilisation ; débranche-la avant tout nettoyage et suis la notice d’entretien fournie." : product.slug === "chaussettes-thermiques" ? "Porte-les comme des chaussettes classiques dans des chaussures adaptées. Elles sont un accessoire isolant passif : elles ne contiennent ni batterie ni système de chauffage électrique." : product.slug === "plaid-velours-bulle" ? "Déplie la couverture sur un canapé ou un lit et utilise-la comme couche de confort lors des moments de détente. Vérifie les dimensions et les consignes de lavage de la variante définitive avant achat." : product.slug === "pyjama-plaid" ? "Enfile ce vêtement ample par-dessus une tenue confortable pour lire, regarder un film ou te détendre à la maison. Consulte le guide des tailles dès qu’il sera confirmé pour choisir une coupe adaptée." : product.slug === "bottes-plaid" ? "Porte-les à l’intérieur sur un sol sec et propre. Vérifie la pointure, la matière et l’adhérence de la semelle sur la fiche de la variante avant commande." : product.slug === "chauffe-mains" ? "Le modèle est encore en sélection. Avant publication, nous confirmerons le mode de recharge, les commandes, les protections, l’autonomie et les consignes de sécurité exactes du modèle retenu." : product.slug === "sous-vetements-thermiques" ? "Porte le haut et le pantalon comme première couche sous tes vêtements habituels. Choisis la taille selon le guide fournisseur et respecte les instructions de lavage indiquées sur l’étiquette." : "Les instructions détaillées seront publiées après validation du modèle, de ses caractéristiques et de la notice fournisseur."}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700">Pourquoi le choisir ?</p>
            <h2 className="mt-2 text-2xl font-bold">À qui convient-il ?</h2>
            <p className="mt-3 leading-7 text-slate-600">{product.slug === "gants-chauffants" ? "Pour les personnes qui se déplacent par temps froid, attendent dehors ou pratiquent des activités hivernales et souhaitent une solution dédiée aux mains. Le kit Solo est le choix le plus simple si tu veux commencer par cet accessoire." : product.slug === "echarpe-chauffante" ? "Pour celles et ceux qui veulent compléter la protection du cou pendant les trajets et les journées froides. Le Duo combine l’écharpe et les gants pour une solution coordonnée." : product.slug === "chaussettes-thermiques" ? "Pour compléter un équipement d’hiver et améliorer le confort des pieds. Elles sont comprises dans le Kit Grand Froid ; le prix de 62,99 CHF correspond au kit entier." : product.slug === "plaid-velours-bulle" ? "Pour créer une ambiance cocooning sur le canapé, lire, regarder une série ou offrir un cadeau douillet. Le produit reste en préparation tant que les dimensions, variantes et le prix livré ne sont pas confirmés." : product.slug === "pyjama-plaid" ? "Pour les soirées fraîches à la maison, les journées de télétravail et les moments de détente. Sa coupe ample vise le confort ; les tailles et le prix seront confirmés avant la vente." : product.slug === "bottes-plaid" ? "Pour garder une sensation de confort aux pieds à la maison, notamment le matin ou en soirée. Les pointures et les délais seront validés avant l’ouverture des commandes." : product.slug === "chauffe-mains" ? "Pour les sorties par temps froid lorsque l’on souhaite réchauffer ses mains, à condition que les performances et la sécurité du modèle soient confirmées. Il n’est pas encore disponible à la vente." : product.slug === "sous-vetements-thermiques" ? "Pour les journées froides, les promenades ou les activités en extérieur, sous une tenue habituelle. L’intérêt est d’ajouter une couche près du corps sans multiplier les vêtements épais." : "Cette fiche sera enrichie avec les avantages vérifiés lorsque le produit et ses caractéristiques auront été validés."}</p>
          </article>
        </section>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-5 divide-y divide-slate-200">
            <details className="py-4"><summary className="cursor-pointer font-semibold">Le produit est-il disponible maintenant ?</summary><p className="mt-2 leading-7 text-slate-600">{product.availability === "existing" ? "Cet accessoire est proposé dans un ou plusieurs kits SWELTR. Les prix affichés sont ceux des kits complets, pas un prix unitaire." : "Pas encore. Il est en préparation ; le prix, les variantes et la disponibilité seront publiés après validation."}</p></details>
            <details className="py-4"><summary className="cursor-pointer font-semibold">Quel est le prix ?</summary><p className="mt-2 leading-7 text-slate-600">{product.availability === "existing" ? "Solo Chaleur Mains : 36,99 CHF ; Duo Chaleur Totale : 52,99 CHF ; Kit Grand Froid : 62,99 CHF. Le contenu de chaque kit est précisé sur sa fiche." : "Le prix n’est pas encore confirmé. Nous préférons vérifier le coût fournisseur, la livraison et les variantes avant d’annoncer un tarif."}</p></details>
            <details className="py-4"><summary className="cursor-pointer font-semibold">Pourquoi acheter chez SWELTR ?</summary><p className="mt-2 leading-7 text-slate-600">SWELTR rassemble des accessoires de confort sélectionnés par usage, avec un contenu de kit explicite et des prix visibles pour les offres confirmées. Pour les nouveautés, nous affichons clairement ce qui reste à vérifier au lieu de promettre des caractéristiques non validées.</p></details>
          </div>
        </section>
        {relatedTiers.length > 0 && <section className="mt-10"><h2 className="text-2xl font-bold">Retrouvez ce produit dans nos kits</h2><p className="mt-2 text-sm text-slate-600">Les tarifs ci-dessous correspondent au kit complet, pas à un prix unitaire du produit.</p><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{relatedTiers.map((tier) => <article key={tier.id} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">{tier.name}</h3><p className="mt-2 text-xl font-bold">{formatPrice(tier.price)}</p><p className="mt-2 text-xs leading-5 text-slate-600">{tier.items.join(" · ")}</p><Link href={`/boutique#${tier.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800">Voir ce kit <ArrowRight size={15}/></Link></article>)}</div></section>}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {["Sélection soignée", "Informations transparentes", "Suisse & France"].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-semibold text-slate-700">{item}</div>
          ))}
        </section>
      </div>
    </main>
  );
}
