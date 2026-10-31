import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const siteUrl = (
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app")
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SWELTR — Confort et essentiels pour les quatre saisons",
  description: "Explorez les essentiels SWELTR pour la maison, les voyages et le plein air : une sélection pensée pour accompagner chaque saison.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "SWELTR — Confort en toute saison",
    description: "Découvrez les collections SWELTR pensées pour les quatre saisons.",
    type: "website",
    url: siteUrl,
    siteName: "SWELTR",
    locale: "fr",
    images: [{ url: "https://cf.cjdropshipping.com/20180920/2155711379153.jpg", width: 800, height: 800, alt: "Sélection d’accessoires SWELTR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWELTR — Confort en toute saison",
    description: "Découvrez les collections SWELTR pensées pour les quatre saisons.",
    images: ["https://cf.cjdropshipping.com/20180920/2155711379153.jpg"],
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
