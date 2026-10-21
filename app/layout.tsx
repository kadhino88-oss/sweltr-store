import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SWELTR — Kit chaleur qui tient vraiment le froid à distance",
  description:
    "Gants chauffants, écharpe chauffante et chaussettes thermiques. Testés en conditions réelles de grand froid. Expédié sous 48h, garantie 30 jours.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "SWELTR — Kit anti-froid",
    description:
      "Le gear qui rend les journées à -5°C supportables. Livraison rapide, garantie 30 jours.",
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
    description: "Le gear qui rend les journées à -5°C supportables.",
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
        className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable} font-body bg-ivory text-ink antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
