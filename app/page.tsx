import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import ProductTiers from "@/components/ProductTiers";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <Hero />
      <ProductTiers />
      <TrustBar />
      <HowItWorks />
      <Footer />
    </main>
  );
}
