import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import WinterShowcase from "@/components/WinterShowcase";
import ProductTiers from "@/components/ProductTiers";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app");

export const metadata: Metadata = {
  title: "Kits d’hiver et accessoires de confort | SWELTR",
  description: "Découvrez les trois kits d’hiver SWELTR : gants chauffants, écharpe chauffante USB et chaussettes thermiques. Contenu et prix confirmés visibles dès l’accueil.",
  alternates: { canonical: siteUrl.replace(/\/$/, "") },
  openGraph: { title: "SWELTR — Les kits d’hiver", description: "Comparez les kits SWELTR et leurs accessoires pour l’hiver. Prix en CHF et contenu affichés.", url: siteUrl.replace(/\/$/, ""), siteName: "SWELTR", locale: "fr_CH", type: "website", images: [{ url: "/images/sweltr-winter-hero.png", alt: "Ambiance d’hiver chaleureuse SWELTR" }] },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <WinterShowcase />
      <ProductTiers />
      <TrustBar />
      <HowItWorks />
      <Footer />
    </main>
  );
}
