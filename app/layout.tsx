import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from "@/components/CartProvider";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SWELTR — Kits d’hiver et accessoires de confort",
  description: "Choisissez votre kit d’hiver SWELTR : gants chauffants, écharpe chauffante USB et chaussettes thermiques. Contenu et prix clairement indiqués.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "SWELTR — Kits et accessoires pour l’hiver",
    description: "Découvrez les kits d’hiver SWELTR et leurs accessoires chauffants.",
    type: "website",
    url: siteUrl,
    siteName: "SWELTR",
    locale: "fr",
    images: [{ url: "/images/sweltr-winter-hero.png", width: 1536, height: 1024, alt: "Ambiance hivernale chaleureuse SWELTR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWELTR — Kits d’hiver et accessoires de confort",
    description: "Découvrez les kits d’hiver SWELTR, leurs articles inclus et leurs prix en CHF.",
    images: ["/images/sweltr-winter-hero.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        className="font-body bg-ivory text-ink antialiased"
        style={{
          ["--font-display" as string]: "Arial, Helvetica, sans-serif",
          ["--font-body" as string]: "Arial, Helvetica, sans-serif",
          ["--font-mono" as string]: "ui-monospace, SFMono-Regular, monospace",
          ["--font-serif" as string]: "Georgia, 'Times New Roman', serif",
        } as React.CSSProperties}
      >
        <CartProvider>
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
