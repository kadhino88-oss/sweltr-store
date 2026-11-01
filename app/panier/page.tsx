import type { Metadata } from "next";
import CartPageClient from "@/components/CartPageClient";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app");

export const metadata: Metadata = {
  title: "Mon panier — SWELTR",
  description: "Consulte le contenu et le montant des kits SWELTR ajoutés à ton panier avant de poursuivre la commande.",
  alternates: { canonical: `${siteUrl.replace(/\/$/, "")}/panier` },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartPageClient />;
}
