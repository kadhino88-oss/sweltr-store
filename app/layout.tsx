import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const siteUrl = process.env.SITE_URL || "https://sweltr-store-bk-entreprise.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SWELTR — Kit chaleur qui tient vraiment le froid à distance",
  description:
    "Gants chauffants, écharpe chauffante et chaussettes thermiques pour vous équiper pendant les journées froides.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "SWELTR — Kit anti-froid",
    description: "Découvrez les kits chauffants et accessoires thermiques SWELTR.",
    type: "website",
    url: siteUrl,
    siteName: "SWELTR",
    locale: "fr_FR",
    images: [
      {
        url: "https://cf.cjdropshipping.com/20180920/2155711379153.jpg",
        width: 800,
        height: 800,
        alt: "Gants chauffants SWELTR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWELTR — Kit anti-froid",
    description: "Découvrez les kits chauffants et accessoires thermiques SWELTR.",
    images: ["https://cf.cjdropshipping.com/20180920/2155711379153.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
