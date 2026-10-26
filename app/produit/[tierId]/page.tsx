import { TIERS } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export function generateStaticParams() {
  return TIERS.map((t) => ({ tierId: t.id }));
}

export function generateMetadata({ params }: { params: { tierId: string } }) {
  const tier = TIERS.find((t) => t.id === params.tierId);
  if (!tier) return {};
  const siteUrl = process.env.SITE_URL || "https://sweltr-store-five.vercel.app";
  return {
    title: `${tier.name} — SWELTR`,
    description: tier.description,
    alternates: {
      canonical: `${siteUrl}/produit/${tier.id}`,
    },
    openGraph: {
      title: `${tier.name} — SWELTR`,
      description: tier.description,
      images: tier.cardImages?.[0] ? [tier.cardImages[0]] : undefined,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: { params: { tierId: string } }) {
  const tier = TIERS.find((t) => t.id === params.tierId);
  if (!tier) notFound();

  const siteUrl = process.env.SITE_URL || "https://sweltr-store-five.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `SWELTR — ${tier.name}`,
    description: tier.description,
    image: tier.images,
    brand: {
      "@type": "Brand",
      name: "SWELTR",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/produit/${tier.id}`,
      priceCurrency: "CHF",
      price: tier.price,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProductDetailClient tier={tier} />
    </>
  );
}
