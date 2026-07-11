import Link from "next/link";
import { ArrowLeft, ThermometerSun } from "lucide-react";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-ink text-cream">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-line">
        <Link href="/" className="font-display text-xl font-bold tracking-tight flex items-center gap-2">
          <ThermometerSun size={22} className="text-orange" />
          SWELTR
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-muted hover:text-cream transition-colors">
          <ArrowLeft size={16} /> Retour à la boutique
        </Link>
      </nav>

      <article className="px-6 md:px-12 py-16 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">{title}</h1>
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-10">
          Dernière mise à jour : {updated}
        </p>
        <div className="space-y-8 text-sm leading-relaxed text-soft [&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:text-cream [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-orange [&_a]:underline">
          {children}
        </div>
      </article>

      <Footer />
    </main>
  );
}
