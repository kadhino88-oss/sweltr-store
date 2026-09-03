export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-line font-mono text-xs uppercase tracking-widest flex flex-col md:flex-row justify-between gap-4 items-center text-[#6B6B74]">
      <span>SWELTR © 2026 — Gear anti-froid</span>
      <div className="flex gap-6">
        <a href="/guide/gants-chauffants-avis" className="hover:text-cream transition-colors">Guide</a>
        <a href="/cgv" className="hover:text-cream transition-colors">CGV</a>
        <a href="/confidentialite" className="hover:text-cream transition-colors">Confidentialité</a>
        <a href="/mentions-legales" className="hover:text-cream transition-colors">Mentions légales</a>
      </div>
    </footer>
  );
}
