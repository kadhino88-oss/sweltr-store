import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { TIERS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return TIERS.map((tier) => ({ tierId: tier.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ tierId: string }> }): Promise<Metadata> {
  const { tierId } = await params;
  const tier = TIERS.find((item) => item.id === tierId);
  if (!tier) return {};
  const title = `${tier.name} — kit d’hiver SWELTR`;
  const description = `${tier.description} Prix du kit : ${tier.price.toFixed(2).replace(".", ",")} CHF. Consulte le contenu, les conseils d’usage et les réponses aux questions fréquentes.`;
  const canonical = `${siteUrl}/produit/${tier.id}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: "SWELTR", locale: "fr_CH", type: "website", images: [{ url: tier.cardImages[0], alt: `${tier.name} — articles inclus dans le kit` }] },
    twitter: { card: "summary_large_image", title, description, images: [tier.cardImages[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ tierId: string }> }) {
  const { tierId } = await params;
  const tier = TIERS.find((item) => item.id === tierId);
  if (!tier) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `SWELTR — ${tier.name}`,
    description: tier.description,
    image: tier.images,
    brand: { "@type": "Brand", name: "SWELTR" },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/produit/${tier.id}`,
      priceCurrency: "CHF",
      price: tier.price.toFixed(2),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductDetailClient tier={tier} />
    </>
  );
}
