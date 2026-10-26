import SiteHeader from "@/components/SiteHeader";
import WinterShowcase from "@/components/WinterShowcase";
import ProductTiers from "@/components/ProductTiers";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

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
