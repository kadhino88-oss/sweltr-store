import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
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
      <PageIntro
        eyebrow="INFORMATIONS SWELTR"
        title={title}
        description={`Informations et documents SWELTR. Dernière mise à jour : ${updated}.`}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 md:px-12 md:py-16">
        <div className="space-y-8 text-sm leading-relaxed text-soft md:text-base [&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:text-ink [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-gold-deep [&_a]:underline">
          {children}
        </div>
      </article>

      <Footer />
    </main>
  );
}
