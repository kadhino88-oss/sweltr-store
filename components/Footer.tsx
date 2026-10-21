import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-line font-mono text-[10px] md:text-xs uppercase tracking-widest flex flex-col md:flex-row justify-between gap-6 items-center text-[#6B6B74]">
      <span>SWELTR © 2026 — Équipement anti-froid</span>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        <Link href="/boutique" className="hover:text-cream transition-colors">Boutique</Link>
        <Link href="/guides" className="hover:text-cream transition-colors">Guides</Link>
        <Link href="/faq" className="hover:text-cream transition-colors">FAQ</Link>
        <Link href="/contact" className="hover:text-cream transition-colors">Contact</Link>
        <Link href="/cgv" className="hover:text-cream transition-colors">CGV</Link>
        <Link href="/confidentialite" className="hover:text-cream transition-colors">Confidentialité</Link>
        <Link href="/mentions-legales" className="hover:text-cream transition-colors">Mentions légales</Link>
      </div>
    </footer>
  );
}
