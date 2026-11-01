import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Page introuvable | SWELTR",
  description: "Cette page n’existe pas ou a changé d’adresse. Retrouvez les kits et accessoires d’hiver SWELTR.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F6F0] text-slate-950">
      <SiteHeader />
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-20 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[.22em] text-amber-700">Erreur 404 · SWELTR</p>
        <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl">Cette page a pris froid.</h1>
        <p className="mt-4 max-w-xl leading-7 text-slate-600">Le lien n’est plus disponible. Tu peux retrouver ici les kits d’hiver SWELTR et leur contenu confirmé.</p>
        <Link href="/boutique" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Découvrir les kits</Link>
      </section>
      <Footer />
    </main>
  );
}
