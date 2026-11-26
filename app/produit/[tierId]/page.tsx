import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { TIERS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return TIERS.map((tier) => ({ tierId: tier.slug }));
}

function getTierForRoute(route: string) {
  return TIERS.find((item) => item.slug === route || item.id === route);
}

export async function generateMetadata({ params }: { params: Promise<{ tierId: string }> }): Promise<Metadata> {
  const { tierId } = await params;
  const tier = getTierForRoute(tierId);
  if (!tier) return {};
  const title = `${tier.name} — kit d’hiver SWELTR`;
  const description = `${tier.description} Prix du kit : ${tier.price.toFixed(2).replace(".", ",")} CHF. Consulte le contenu, les conseils d’usage et les réponses aux questions fréquentes.`;
  const canonical = `${siteUrl}/produit/${tier.slug}`;
  const shareImage = tier.cardImages.at(-1) || tier.images[0];
  const shareAlt = `${tier.name} : ${tier.items.join(" · ")}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: "SWELTR", locale: "fr_CH", type: "website", images: [{ url: shareImage, alt: shareAlt }] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ tierId: string }> }) {
  const { tierId } = await params;
  const tier = getTierForRoute(tierId);
  if (!tier) notFound();
  if (tierId !== tier.slug) permanentRedirect(`/produit/${tier.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `SWELTR — ${tier.name}`,
    description: tier.description,
    image: tier.images,
    brand: { "@type": "Brand", name: "SWELTR" },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/produit/${tier.slug}`,
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
