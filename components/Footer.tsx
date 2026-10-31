import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-line font-mono text-[10px] md:text-xs uppercase tracking-widest flex flex-col md:flex-row justify-between gap-6 items-center text-[#6B6B74]">
      <span>SWELTR © 2026 — Confort en toute saison</span>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        <Link href="/boutique" className="hover:text-gold-deep transition-colors">Boutique</Link>
        <Link href="/guides" className="hover:text-gold-deep transition-colors">Guides</Link>
        <Link href="/a-propos" className="hover:text-gold-deep transition-colors">À propos</Link>
        <Link href="/livraison-retours" className="hover:text-gold-deep transition-colors">Livraison et retours</Link>
        <Link href="/faq" className="hover:text-gold-deep transition-colors">FAQ</Link>
        <Link href="/contact" className="hover:text-gold-deep transition-colors">Contact</Link>
        <Link href="/cgv" className="hover:text-gold-deep transition-colors">CGV</Link>
        <Link href="/confidentialite" className="hover:text-gold-deep transition-colors">Confidentialité</Link>
        <Link href="/mentions-legales" className="hover:text-gold-deep transition-colors">Mentions légales</Link>
      </div>
    </footer>
  );
}
