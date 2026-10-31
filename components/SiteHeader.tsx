"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe2, ShoppingBag, Menu, X } from "lucide-react";

const languages = [
  { code: "fr", label: "Français", flag: "🇫🇷" }, { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" }, { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" }, { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
];
function setTranslateCookie(language: string) {
  const value = language === "fr" ? "/fr/fr" : "/fr/" + language;
  document.cookie = "googtrans=" + value + ";path=/;max-age=31536000;SameSite=Lax";
  document.cookie = "googtrans=" + value + ";path=/;domain=" + window.location.hostname + ";max-age=31536000;SameSite=Lax";
}
export default function SiteHeader() {
  const [language, setLanguage] = useState("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("sweltr-language");
    const browserLanguage = (navigator.language || "fr").slice(0, 2).toLowerCase();
    const supported = languages.some((item) => item.code === browserLanguage) ? browserLanguage : "en";
    const selected = saved || supported;
    setLanguage(selected);
    const cookie = document.cookie.split("; ").find((entry) => entry.startsWith("googtrans="));
    if (!saved && selected !== "fr" && !cookie && !sessionStorage.getItem("sweltr-locale-detected")) {
      sessionStorage.setItem("sweltr-locale-detected", "1");
      window.localStorage.setItem("sweltr-language", selected);
      setTranslateCookie(selected);
      window.location.reload();
    }
  }, []);
  function changeLanguage(value: string) {
    setLanguage(value);
    window.localStorage.setItem("sweltr-language", value);
    setTranslateCookie(value);
    window.location.reload();
  }
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10151D]/95 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="SWELTR accueil">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-200 to-amber-500 text-lg font-black text-slate-950 shadow-md shadow-amber-500/20">S</span>
          <span className="leading-tight"><span className="block font-display text-xl font-black tracking-[.12em]">SWELTR</span><span className="hidden text-[9px] uppercase tracking-[.2em] text-white/55 sm:block">Comfort all year round</span></span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-white/80 lg:flex">
          <Link href="/boutique" className="transition hover:text-amber-300">Toutes les collections</Link>
          <a href="/#saisons" className="transition hover:text-amber-300">Les 4 saisons</a>
          <Link href="/guides" className="transition hover:text-amber-300">Guides</Link>
          <Link href="/contact" className="transition hover:text-amber-300">Contact</Link>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-2 text-xs text-white/90" aria-label="Choisir la langue">
            <Globe2 size={15} className="text-amber-300" />
            <select value={language} onChange={(event) => changeLanguage(event.target.value)} className="max-w-[92px] cursor-pointer bg-transparent text-white outline-none [&>option]:text-slate-900" aria-label="Langue du site">
              {languages.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.code.toUpperCase()}</option>)}
            </select>
          </label>
          <Link href="/boutique" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-amber-200 sm:text-sm"><ShoppingBag size={15} /> <span className="hidden sm:inline">Explorer</span></Link>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
        </div>
      </nav>
      {menuOpen && <div className="border-t border-white/10 px-5 py-4 lg:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm"><Link href="/boutique" onClick={() => setMenuOpen(false)}>Toutes les collections</Link><a href="/#saisons" onClick={() => setMenuOpen(false)}>Les 4 saisons</a><Link href="/guides" onClick={() => setMenuOpen(false)}>Guides</Link><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></div></div>}
      <div id="google_translate_element" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true" />
    </header>
  );
}
