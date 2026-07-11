export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-line font-mono text-xs uppercase tracking-widest flex flex-col md:flex-row justify-between gap-4 items-center text-[#6B6B74]">
      <span>SWELTR © 2026 — Gear anti-canicule</span>
      <div className="flex gap-6">
        <a href="#" className="hover:text-cream transition-colors">Livraison</a>
        <a href="#" className="hover:text-cream transition-colors">Retours</a>
        <a href="#" className="hover:text-cream transition-colors">Contact</a>
      </div>
    </footer>
  );
}
