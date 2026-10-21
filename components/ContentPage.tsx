import Link from "next/link";
import { Snowflake } from "lucide-react";
import Footer from "@/components/Footer";

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
    <main className="min-h-screen bg-ink text-cream">
      <header className="border-b border-line">
        <nav
          aria-label="Navigation principale"
          className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-12 max-w-7xl mx-auto"
        >
          <Link href="/" className="font-display text-xl font-bold tracking-tight flex items-center gap-2">
            <Snowflake size={22} className="text-orange" />
            SWELTR
          </Link>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono uppercase tracking-widest text-muted">
            <Link href="/boutique" className="hover:text-cream transition-colors">Boutique</Link>
            <Link href="/guides" className="hover:text-cream transition-colors">Guides</Link>
            <Link href="/faq" className="hover:text-cream transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-cream transition-colors">Contact</Link>
          </div>
        </nav>
      </header>

      <article className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">{title}</h1>
        {description && <p className="text-soft max-w-3xl mb-10">{description}</p>}
        <div className="space-y-8 text-sm leading-relaxed text-soft">{children}</div>
      </article>

      <Footer />
    </main>
  );
}
