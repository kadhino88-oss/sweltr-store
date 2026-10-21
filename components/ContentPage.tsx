import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

export default function ContentPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <SiteHeader />

      <article className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">{title}</h1>
        {description && <p className="text-soft max-w-3xl mb-10">{description}</p>}
        <div className="space-y-8 text-sm leading-relaxed text-soft">{children}</div>
      </article>

      <Footer />
    </main>
  );
}
