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
  title: "SWELTR — Kit anti-canicule qui tient vraiment la chaleur à distance",
  description:
    "Ventilateur de cou, mini turbo et serviette rafraîchissante. Testés en conditions réelles de canicule. Expédié sous 48h, garantie 30 jours.",
  openGraph: {
    title: "SWELTR — Kit anti-canicule",
    description:
      "Le gear qui rend les journées à 38°C supportables. Livraison rapide, garantie 30 jours.",
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
