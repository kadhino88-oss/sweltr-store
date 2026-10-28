import type { MetadataRoute } from "next";
import { TIERS } from "@/lib/data";
import { WINTER_PRODUCTS } from "@/lib/winter-products";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.SITE_URL || "https://sweltr-store-bk-entreprise.vercel.app").replace(/\/$/, "");

  const kitPages: MetadataRoute.Sitemap = TIERS.map((tier) => ({
    url: `${siteUrl}/kits/${tier.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const productPages: MetadataRoute.Sitemap = WINTER_PRODUCTS.map((product) => ({
    url: `${siteUrl}/produits/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { path: "/boutique", priority: 0.9 },
    { path: "/guides", priority: 0.7 },
    { path: "/a-propos", priority: 0.5 },
    { path: "/livraison-retours", priority: 0.5 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
    { path: "/cgv", priority: 0.2 },
    { path: "/confidentialite", priority: 0.2 },
    { path: "/mentions-legales", priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const guidePages: MetadataRoute.Sitemap = [
    "gants-chauffants-avis",
    "ne-plus-avoir-froid-hiver",
    "cadeaux-hiver-chauffants",
    "chaussettes-thermiques-pieds-froids",
  ].map((slug) => ({
    url: `${siteUrl}/guide/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...kitPages,
    ...productPages,
    ...guidePages,
    ...staticPages,
  ];
}
