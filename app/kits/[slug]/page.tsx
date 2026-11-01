import { notFound, permanentRedirect } from "next/navigation";
import { TIERS } from "@/lib/data";

export default async function LegacyKitRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tier = TIERS.find((item) => item.id === slug);
  if (!tier) notFound();
  permanentRedirect(`/produit/${tier.id}`);
}
