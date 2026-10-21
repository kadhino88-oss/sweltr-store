import Link from "next/link";
import { Snowflake } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-md">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-12"
      >
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <Snowflake size={22} className="text-gold" />
          SWELTR
        </Link>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-muted md:gap-7 md:text-xs">
          <Link href="/boutique" className="transition-colors hover:text-gold-deep">Boutique</Link>
          <Link href="/guides" className="transition-colors hover:text-gold-deep">Guides</Link>
          <Link href="/faq" className="transition-colors hover:text-gold-deep">FAQ</Link>
          <Link href="/contact" className="transition-colors hover:text-gold-deep">Contact</Link>
          <Link
            href="/boutique"
            className="rounded-full bg-gold-strong px-4 py-2 font-semibold text-ink transition-colors hover:bg-gold"
          >
            Choisir un kit
          </Link>
        </div>
      </nav>
    </header>
  );
}
