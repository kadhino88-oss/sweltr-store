import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { FAQS } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata: Metadata = {
  title: "Questions fréquentes — Livraison, produits et garantie | SWELTR",
  description:
    "Toutes les réponses aux questions fréquentes sur les kits SWELTR, l'autonomie, la livraison et la garantie.",
  alternates: { canonical: `${siteUrl}/faq` },
};

export default function FaqPage() {
  return (
    <ContentPage
      title="Questions fréquentes"
      description="Les réponses aux questions les plus courantes sur les produits et les commandes SWELTR."
    >
      <div className="space-y-4">
        {FAQS.map((item) => (
          <details key={item.q} className="rounded-2xl border border-line bg-panel p-6">
            <summary className="cursor-pointer font-display text-lg font-semibold text-cream">
              {item.q}
            </summary>
            <p className="mt-4">{item.a}</p>
          </details>
        ))}
      </div>
      <p>
        Tu ne trouves pas ta réponse ?{" "}
        <Link href="/contact" className="text-orange underline">Contacte-nous.</Link>
      </p>
    </ContentPage>
  );
}
