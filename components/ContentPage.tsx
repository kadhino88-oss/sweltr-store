import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import SiteHeader from "@/components/SiteHeader";

export default function ContentPage({
  eyebrow = "SWELTR · BOUTIQUE ET CONSEILS",
  title,
  description,
  wide = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <PageIntro eyebrow={eyebrow} title={title} description={description} />

      <article
        className={`mx-auto px-4 py-12 md:px-12 md:py-16 ${wide ? "max-w-7xl" : "max-w-5xl"}`}
      >
        <div className="space-y-10 text-sm leading-relaxed text-soft md:text-base">{children}</div>
      </article>

      <Footer />
    </main>
  );
}
