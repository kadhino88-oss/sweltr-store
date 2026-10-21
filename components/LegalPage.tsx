import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

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
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <article className="px-6 md:px-12 py-16 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">{title}</h1>
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-10">
          Dernière mise à jour : {updated}
        </p>
        <div className="space-y-8 text-sm leading-relaxed text-soft [&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:text-ink [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-gold-deep [&_a]:underline">
          {children}
        </div>
      </article>

      <Footer />
    </main>
  );
}
