import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import SiteHeader from "@/components/SiteHeader";

export default function ContentPage({
  eyebrow = "SWELTR · BOUTIQUE ET CONSEILS",
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      <PageIntro eyebrow={eyebrow} title={title} description={description} />

      <article className="mx-auto max-w-5xl px-4 py-12 md:px-12 md:py-16">
        <div className="space-y-10 text-sm leading-relaxed text-soft md:text-base">{children}</div>
      </article>

      <Footer />
    </main>
  );
}
