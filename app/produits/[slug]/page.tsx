import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getSiteUrl } from "@/lib/site";
import { getWinterProduct, WINTER_PRODUCTS } from "@/lib/winter-products";

const siteUrl = getSiteUrl();

const productGuides: Record<string, { forWho: string; reason: string; use: string; caution: string }> = {
  "plaid-velours-bulle": {
    forWho: "Pour aménager un coin lecture, regarder un film au chaud ou offrir une pause douce à la maison.",
    reason: "Son relief à bulles apporte une texture douce et du caractère au canapé. CJ propose plusieurs dimensions et couleurs ; SWELTR précisera la variante retenue avant l’ouverture des commandes. Prix public : 49,99 CHF.",
    use: "Déplie la couverture sur un canapé ou un lit, puis suis l’étiquette fournie pour le lavage et le séchage.",
    caution: "La composition et les consignes d’entretien dépendent de la variante finale ; vérifie l’étiquette avant le premier lavage.",
  },
  "pyjama-plaid": {
    forWho: "Pour celles et ceux qui aiment prolonger les soirées à la maison dans une tenue ample et décontractée.",
    reason: "Une pièce cocooning facile à enfiler pour lire, regarder un film ou télétravailler au calme. Prix public SWELTR : 44,99 CHF.",
    use: "Porte-le par-dessus une tenue adaptée à la température de la pièce et suis l’étiquette du vêtement pour l’entretien.",
    caution: "CJ indique une taille unique et précise qu’une mesure manuelle peut varier de 2 à 3 cm. Compare les mesures du vêtement avec celles d’un sweat que tu portes confortablement ; les couleurs peuvent aussi légèrement varier selon l’écran.",
  },
  "bottes-plaid": {
    forWho: "Pour compléter les moments cocooning à la maison avec une paire de chaussons fantaisie.",
    reason: "Un détail ludique qui accompagne une tenue détente et s’accorde au thème de la collection hiver. Prix public SWELTR : 29,99 CHF.",
    use: "À porter en intérieur avec une pointure adaptée. Vérifie le guide des tailles avant de choisir.",
    caution: "La pointure et les coloris disponibles doivent être confirmés avant l’ouverture des commandes.",
  },
  "chauffe-mains": {
    forWho: "Pour les personnes qui recherchent une option compacte à garder à portée de main pendant la saison froide.",
    reason: "Cette piste complète naturellement une gamme d’accessoires d’hiver. SWELTR attend la validation du modèle et de sa notice avant de le recommander ou de le vendre.",
    use: "Le mode d’utilisation sera indiqué après vérification de la référence et des consignes fabricant.",
    caution: "Ne commande pas cette référence à ce stade : alimentation, fonctionnement, précautions et disponibilité restent à vérifier.",
  },
  "sous-vetements-thermiques": {
    forWho: "Pour celles et ceux qui souhaitent étudier une couche supplémentaire sous leur tenue d’hiver.",
    reason: "Le haut pullover et le pantalon assorti réunissent deux pièces dans une seule tenue détente. Le prix public SWELTR est de 39,99 CHF.",
    use: "Consulte le tableau de tailles avant de choisir : CJ indique que ses tailles asiatiques taillent plus petit que les tailles européennes. Respecte l’étiquette pour l’entretien.",
    caution: "Le fournisseur indique une composition polyester à 100 %. Vérifie la taille choisie et les instructions de lavage de l’étiquette du vêtement reçu.",
  },
  "gants-chauffants": {
    forWho: "Pour les trajets, les promenades et les journées froides où tu veux un accessoire dédié aux mains.",
    reason: "Le même article est proposé dans les trois kits confirmés : tu peux commencer par les gants seuls ou choisir un kit qui les associe à d’autres accessoires.",
    use: "Utilise les gants selon la notice du modèle livré. Elle indique les consignes exactes d’alimentation, de réglage, d’entretien et d’utilisation.",
    caution: "Lis la notice avant la première utilisation. N’utilise pas un accessoire chauffant si son câble ou son boîtier est visiblement endommagé.",
  },
  "echarpe-chauffante": {
    forWho: "Pour les personnes qui souhaitent ajouter un accessoire pour le cou à leur équipement d’hiver.",
    reason: "Elle rejoint les gants dans les kits Duo et Grand Froid. Le contenu et le tarif du kit complet sont affichés avant l’ajout au panier.",
    use: "Suis la notice du modèle fourni pour l’alimentation et l’utilisation. Débranche l’accessoire avant de le nettoyer et respecte les instructions d’entretien.",
    caution: "Consulte la notice avant utilisation et nettoyage. N’utilise pas l’article si le câble ou le boîtier est visiblement endommagé.",
  },
  "chaussettes-thermiques": {
    forWho: "Pour compléter une tenue d’hiver avec un accessoire dédié au confort des pieds.",
    reason: "Elles sont incluses dans le Kit Grand Froid, avec les gants et l’écharpe. Le prix de 62,99 CHF correspond au kit complet.",
    use: "Respecte les consignes d’entretien inscrites sur l’étiquette du produit livré.",
    caution: "Vérifie l’étiquette d’entretien et choisis des chaussures adaptées à ton confort.",
  },
};

export function generateStaticParams() {
  return WINTER_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getWinterProduct(slug);
  if (!product) return {};
  const title = `${product.name} ${product.retailPrice !== undefined ? `à ${product.retailPrice.toFixed(2)} CHF` : ""} | SWELTR`;
  const description = product.availability === "existing"
    ? `${product.short} Découvrez les kits SWELTR qui le contiennent, leurs tarifs et les conseils d’utilisation.`
    : `${product.name} chez SWELTR : ${product.short} ${product.retailPrice !== undefined ? `Prix public ${product.retailPrice.toFixed(2)} CHF.` : "Produit en préparation, prix à confirmer."} Consultez les détails et les informations avant sa mise en vente.`;
  const canonical = `${siteUrl}/produits/${product.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: "SWELTR", locale: "fr_CH", type: "website", images: [{ url: product.image, alt: product.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [product.image] },
  };
}

export default async function WinterProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getWinterProduct(slug);
  if (!product) notFound();

  const isAvailable = product.availability === "existing";
  const guide = productGuides[product.slug];
  const relatedTiers = product.slug === "gants-chauffants"
    ? TIERS
    : product.slug === "echarpe-chauffante"
      ? TIERS.filter((tier) => tier.id === "duo" || tier.id === "trio")
      : product.slug === "chaussettes-thermiques"
        ? TIERS.filter((tier) => tier.id === "trio")
        : [];
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.length ? product.images : [product.image],
    category: product.category,
    url: `${siteUrl}/produits/${product.slug}`,
    brand: { "@type": "Brand", name: "SWELTR" },
    ...(isAvailable && product.retailPrice !== undefined ? { offers: { "@type": "Offer", url: `${siteUrl}/produits/${product.slug}`, priceCurrency: "CHF", price: product.retailPrice.toFixed(2), availability: "https://schema.org/InStock" } } : {}),
  };

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/produits" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"><ArrowLeft size={16}/> Retour au catalogue</Link><Link href="/boutique" className="text-sm font-semibold text-amber-800 hover:text-slate-950">Comparer les kits →</Link></div>

        <section className="mt-5 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="bg-slate-100 p-3 sm:p-5">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white"><Image src={product.image} alt={product.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4"/><span className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-slate-950/75 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white">{product.category}</span></div>
            {(product.images?.length ?? 0) > 1 && <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label="Photos du produit">{product.images?.slice(0, 8).map((image, index) => <div key={image} className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white"><Image src={image} alt={`${product.name} — photo ${index + 1}`} fill sizes="(max-width: 640px) 22vw, 100px" className="object-contain p-1"/></div>)}</div>}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.22em] text-amber-700 sm:text-xs">SWELTR · Collection hiver</p>
            <h1 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-base leading-7 text-slate-700">{product.short}</p>
            {product.retailPrice !== undefined && <p className="mt-4 text-3xl font-black">{formatPrice(product.retailPrice)} <span className="text-sm font-medium text-slate-500">prix public SWELTR</span></p>}
            <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>

            <ul className="mt-5 space-y-2" aria-label="Les points forts du produit">
              {product.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-amber-700"/><span>{highlight}</span></li>)}
            </ul>

            <div className={`mt-5 rounded-2xl border p-4 ${isAvailable ? "border-emerald-200 bg-emerald-50/70" : "border-amber-200 bg-amber-50/70"}`}>
              <p className="inline-flex items-center gap-2 text-sm font-bold">{isAvailable ? <CheckCircle2 size={17} className="text-emerald-700"/> : <Clock3 size={17} className="text-amber-800"/>}{isAvailable ? "Disponible dans les kits d’hiver" : product.retailPrice !== undefined ? "Prix public affiché · ouverture des commandes à venir" : "Bientôt disponible · prix à confirmer"}</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{isAvailable ? "Les articles ne sont pas vendus séparément. Le prix affiché sur chaque fiche correspond au kit complet." : product.variants?.length ? "Les variantes ci-dessous ont été relevées sur la fiche CJ. Le stock fournisseur peut évoluer et n’est pas synchronisé en direct avec SWELTR; la commande ouvrira après le dernier contrôle logistique." : product.retailPrice !== undefined ? "Le prix public SWELTR est affiché. La commande ouvrira après vérification finale des variantes et de l’expédition." : "Le produit n’est pas ouvert à la commande. Son modèle, ses variantes, son prix et sa disponibilité seront confirmés avant la vente."}</p>
            </div>

            {isAvailable && <div className="mt-6"><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Kits qui contiennent cet article</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{relatedTiers.map((tier) => <Link key={tier.id} href={`/produit/${tier.id}`} className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-amber-400 hover:bg-amber-50"><span className="block text-sm font-bold">{tier.name}</span><span className="mt-1 block text-lg font-black">{formatPrice(tier.price)}</span><span className="mt-1 block text-[11px] leading-4 text-slate-600">{tier.items.join(" · ")}</span></Link>)}</div></div>}

            {isAvailable
              ? <Link href={relatedTiers.length === 1 ? `/produit/${relatedTiers[0].id}` : "/boutique"} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300">Choisir un kit avec cet article <ArrowRight size={16}/></Link>
              : <Link href="/boutique" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800">Voir les kits disponibles <ArrowRight size={16}/></Link>}
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">L’usage au quotidien</p><h2 className="mt-2 text-2xl font-black">Comment l’utiliser ?</h2><p className="mt-3 text-sm leading-7 text-slate-600">{guide?.use || "Les consignes d’utilisation détaillées seront publiées après validation du modèle final et de la notice fournisseur."}</p></article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">Pourquoi ce choix ?</p><h2 className="mt-2 text-2xl font-black">Un achat facile à comparer</h2><p className="mt-3 text-sm leading-7 text-slate-600">{guide?.forWho || "Une référence envisagée pour compléter la sélection d’hiver SWELTR. Consulte cette fiche pour suivre son état de préparation."}</p><p className="mt-3 text-sm leading-7 text-slate-600">{guide?.reason || "Le produit reste en préparation. Nous confirmerons les caractéristiques, le contenu, le prix et la disponibilité avant de le proposer à l’achat."}</p></article>
        </section>

        {(product.variants?.length || product.supplierStock) && <section className="mt-5 grid gap-5 md:grid-cols-2" aria-label="Variantes et disponibilité fournisseur">
          {product.variants?.length ? <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">Choix fournisseur</p><h2 className="mt-2 text-2xl font-black">Coloris et tailles</h2><ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">{product.variants.map((variant) => <li key={variant} className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-amber-700"/>{variant}</li>)}</ul></article> : <div/>}
          {product.supplierStock && <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">Disponibilité observée</p><h2 className="mt-2 text-2xl font-black">Stock fournisseur</h2><p className="mt-3 text-sm leading-7 text-slate-600">{product.supplierStock}</p></article>}
        </section>}

        <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-6 md:p-8"><h2 className="text-xl font-black">Précautions et informations à vérifier</h2><p className="mt-3 text-sm leading-7 text-slate-700">{guide?.caution || "Les précautions, le mode d’emploi et l’entretien seront ajoutés après validation du produit retenu et des documents du fabricant."}</p></section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8" aria-labelledby="product-faq-title"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-amber-700">Questions fréquentes</p><h2 id="product-faq-title" className="mt-2 text-2xl font-black">Ce qu’il faut savoir avant de choisir</h2><div className="mt-4 divide-y divide-slate-200">
          <details className="group py-4"><summary className="cursor-pointer list-none font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600">Peut-on commander cet article seul ?<span className="float-right text-amber-700" aria-hidden="true">＋</span></summary><p className="mt-3 text-sm leading-7 text-slate-600">{isAvailable ? "Non, il est proposé dans un ou plusieurs kits SWELTR. Le prix unitaire de l’accessoire n’est pas confirmé ; seul le tarif du kit complet est affiché." : "Non. Le produit est en préparation et aucune commande n’est ouverte."}</p></details>
          <details className="group py-4"><summary className="cursor-pointer list-none font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600">Quel est son prix ?<span className="float-right text-amber-700" aria-hidden="true">＋</span></summary><p className="mt-3 text-sm leading-7 text-slate-600">{isAvailable ? "Les kits confirmés coûtent 36,99 CHF (Solo Chaleur Mains), 52,99 CHF (Duo Chaleur Totale) et 62,99 CHF (Kit Grand Froid). La fiche de chaque kit précise son contenu." : product.retailPrice !== undefined ? `Le prix public SWELTR est ${formatPrice(product.retailPrice)}. La commande sera ouverte après vérification finale des variantes et de l’expédition.` : "Bientôt disponible · prix à confirmer. Le tarif sera publié après validation de la référence et des coûts de livraison."}</p></details>
          <details className="group py-4"><summary className="cursor-pointer list-none font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600">Pourquoi acheter chez SWELTR ?<span className="float-right text-amber-700" aria-hidden="true">＋</span></summary><p className="mt-3 text-sm leading-7 text-slate-600">Tu peux comparer le contenu exact des kits, voir leur prix complet avant de choisir et consulter les consignes disponibles. Les nouveautés qui ne sont pas encore validées restent clairement indiquées comme en préparation.</p></details>
        </div></section>
      </div>
      <Footer />
    </main>
  );
}
