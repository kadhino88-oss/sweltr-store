import { TIERS } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export function generateStaticParams() {
  return TIERS.map((t) => ({ tierId: t.id }));
}

export function generateMetadata({ params }: { params: { tierId: string } }) {
  const tier = TIERS.find((t) => t.id === params.tierId);
  if (!tier) return {};
  return {
    title: `${tier.name} — SWELTR`,
    description: tier.description,
  };
}

export default function ProductPage({ params }: { params: { tierId: string } }) {
  const tier = TIERS.find((t) => t.id === params.tierId);
  if (!tier) notFound();

  return <ProductDetailClient tier={tier} />;
}
