"use client";

import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductGallery from "@/components/ProductGallery";
import TrustBar from "@/components/TrustBar";
import ProductTiers from "@/components/ProductTiers";
import HowItWorks from "@/components/HowItWorks";
import FieldReports from "@/components/FieldReports";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <main className="relative">
      <AnimatedBackground />
      <Ticker />
      <Nav cartCount={cartCount} />
      <Hero />
      <ProductGallery />
      <TrustBar />
      <ProductTiers onAdd={() => setCartCount((c) => c + 1)} />
      <HowItWorks />
      <FieldReports />
      <FAQ />
      <Footer />
    </main>
  );
}
