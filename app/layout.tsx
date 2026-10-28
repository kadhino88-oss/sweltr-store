import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const siteUrl = (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : (process.env.SITE_URL || "https://sweltr-store-five.vercel.app")).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SWELTR — Kits et accessoires pour affronter le froid",
  description: "Découvrez les kits d’hiver SWELTR, les accessoires chauffants et les vêtements thermiques pour rester au chaud pendant la saison froide.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "SWELTR — Kits et accessoires pour l’hiver",
    description: "Explorez les kits et accessoires SWELTR pour les journées froides.",
    type: "website",
    url: siteUrl,
    siteName: "SWELTR",
    locale: "fr_CH",
    images: [{ url: "https://cf.cjdropshipping.com/20180920/2155711379153.jpg", width: 800, height: 800, alt: "Accessoires d’hiver SWELTR" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWELTR — Kits et accessoires pour l’hiver",
    description: "Explorez les kits et accessoires SWELTR pour les journées froides.",
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
