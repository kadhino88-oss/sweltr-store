import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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

export const metadata: Metadata = {
  title: "SWELTR — Kit chaleur qui tient vraiment le froid à distance",
  description:
    "Gants chauffants, écharpe chauffante et chaussettes thermiques. Testés en conditions réelles de grand froid. Expédié sous 48h, garantie 30 jours.",
  openGraph: {
    title: "SWELTR — Kit anti-froid",
    description:
      "Le gear qui rend les journées à -5°C supportables. Livraison rapide, garantie 30 jours.",
    type: "website",
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
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-ink text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
