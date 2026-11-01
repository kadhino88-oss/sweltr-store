"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { TIERS, type Tier } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

const kitGuides: Record<string, { who: string; benefit: string; usage: string; precaution: string }> = {
  solo: {
    who: "Pour celles et ceux qui souhaitent équiper leurs mains lors des trajets, promenades ou journées froides.",
    benefit: "Le Solo est une formule ciblée : une paire de gants, un prix complet facile à repérer et aucun accessoire supplémentaire à choisir.",
    usage: "Utilise les gants selon la notice du modèle livré. Les consignes détaillées d’alimentation, de recharge, de réglage et d’entretien doivent être celles fournies avec l’article.",
    precaution: "Avant la première utilisation, lis la notice du fabricant et respecte les précautions indiquées pour les accessoires chauffants. N’utilise pas un article dont le câble ou le boîtier serait visiblement endommagé.",
  },
  duo: {
    who: "Pour celles et ceux qui souhaitent réunir des accessoires pour les mains et le cou dans un même kit.",
    benefit: "Le Duo réunit deux accessoires pour les mains et le cou dans un seul kit. Tu peux vérifier les articles inclus et le prix total avant de l’ajouter au panier.",
    usage: "Suis les notices fournies pour chacun des articles. Elles précisent le branchement, l’utilisation, les réglages éventuels et l’entretien correspondant au modèle livré.",
    precaution: "Lis les consignes du fabricant avant d’utiliser ou de nettoyer les accessoires chauffants. N’utilise pas un article dont le câble ou le boîtier serait visiblement endommagé.",
  },
  trio: {
    who: "Pour celles et ceux qui préfèrent réunir trois accessoires d’hiver dans un seul kit.",
    benefit: "C’est la composition la plus complète de la sélection d’hiver : les mains, le cou et les pieds sont représentés par un article chacun, détaillés dans le contenu du kit.",
    usage: "Suis la notice de chaque accessoire. Les gants et l’écharpe s’utilisent selon les consignes du modèle livré ; les consignes d’entretien des chaussettes figurent sur leur étiquette.",
    precaution: "Lis les consignes du fabricant pour les accessoires chauffants avant utilisation. N’utilise pas un article dont le câble ou le boîtier serait visiblement endommagé.",
  },
};

export default function ProductDetailClient({ tier }: { tier: Tier }) {
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const guide = kitGuides[tier.id] ?? kitGuides.solo;
  const gallery = [...new Set([...tier.images, ...tier.cardImages])];
  const relatedTiers = TIERS.filter((item) => item.id !== tier.id);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Le paiement est momentanément indisponible.");
      window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue. Réessaie plus tard.");
      setLoading(false);
    }
  }

  const faqs = [
    { question: "Que contient ce kit ?", answer: tier.items.join(" · ") + "." },
    { question: "Quelle est la différence avec les autres kits ?", answer: `${tier.name} : ${tier.items.join(", ")}. Tu peux comparer les contenus et les tarifs sur la page boutique.` },
    { question: "Quelles sont l’autonomie et les consignes d’entretien ?", answer: "Ces informations dépendent du modèle fourni. Consulte la notice jointe à chaque article ; seules les caractéristiques confirmées sont publiées sur le site." },
    { question: "Où livrez-vous et quels sont les délais ?", answer: "Les destinations et délais sont précisés avant le paiement et sur la page Livraison et retours. Ils dépendent de la destination et du traitement logistique." },
  ];

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-10">
        <Link href="/boutique" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"><ArrowLeft size={16} /> Retour à la boutique</Link>

        <section className="mt-5 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm xl:grid-cols-2">
          <div className="bg-slate-100 p-3 md:p-5">
            <motion.div key={activeImage} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative aspect-square overflow-hidden rounded-2xl bg-white">
              <Image src={gallery[activeImage]} alt={`${tier.name} — visuel des articles inclus`} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-2" />
            </motion.div>
            {gallery.length > 1 && <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label="Galerie des articles du kit">
              {gallery.slice(0, 8).map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(index)} aria-label={`Afficher le visuel ${index + 1} de ${tier.name}`} aria-pressed={activeImage === index} className={`relative aspect-square overflow-hidden rounded-xl border bg-white transition ${activeImage === index ? "border-amber-500 ring-2 ring-amber-200" : "border-slate-200 hover:border-amber-400"}`}>
                <Image src={image} alt="" fill sizes="(max-width: 640px) 22vw, 100px" className="object-contain p-1" />
              </button>)}
            </div>}
            <p className="mt-3 px-1 text-xs leading-5 text-slate-500">Les images montrent les articles associés à ce kit. Les caractéristiques précises suivent le modèle et la notice fournis.</p>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12">
            <p className="font-mono text-xs font-bold uppercase tracking-[.22em] text-amber-700">SWELTR · Collection hiver</p>
            <h1 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{tier.name}</h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-amber-800">{tier.tagline}</p>
            <p className="mt-5 text-base leading-7 text-slate-600">{tier.description}</p>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-600">Prix du kit complet</p>
              <p className="mt-1 font-display text-4xl font-black">{formatPrice(tier.price)}</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">Prix affiché en francs suisses. La destination et les frais éventuels sont précisés avant le paiement.</p>
            </div>
            <h2 className="mt-6 text-lg font-bold">Dans ton kit</h2>
            <ul className="mt-3 space-y-2.5">
              {tier.items.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-slate-700"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>{item}</span></li>)}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5"><Truck size={15} className="text-amber-700" /> Livraison selon destination</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-amber-700" /> Total affiché avant validation</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <AddToCartButton tierId={tier.id} />
              <button type="button" onClick={handleCheckout} disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-amber-500 hover:bg-amber-50 disabled:cursor-wait disabled:opacity-60">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ShoppingBag size={16} />}{loading ? "Ouverture du paiement…" : "Commander directement"}
              </button>
            </div>
            {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <p className="mt-4 text-xs leading-5 text-slate-500">Les accessoires chauffants doivent être utilisés conformément à la notice du fabricant.</p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-amber-700">Pour qui ?</p>
            <h2 className="mt-2 text-2xl font-black">Un kit pensé pour ton hiver</h2>
            <p className="mt-3 leading-7 text-slate-600">{guide.who} {guide.benefit}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">{tier.items.map((item) => <li key={item} className="flex gap-2"><span className="text-amber-600" aria-hidden="true">✓</span><span>{item}</span></li>)}</ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-amber-700">Fonctionnement et usage</p>
            <h2 className="mt-2 text-2xl font-black">Comment l’utiliser ?</h2>
            <p className="mt-3 leading-7 text-slate-600">{guide.usage}</p>
            <div className="mt-5 rounded-xl bg-amber-50 p-4">
              <h3 className="text-sm font-bold text-slate-900">Précautions</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{guide.precaution}</p>
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8" aria-labelledby="kit-faq-title">
          <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-amber-700">Avant de choisir</p>
          <h2 id="kit-faq-title" className="mt-2 text-2xl font-black">Questions fréquentes</h2>
          <div className="mt-4 divide-y divide-slate-200">
            {faqs.map((faq) => <details key={faq.question} className="group py-4">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600">{faq.question}<span className="float-right text-amber-700 transition group-open:rotate-45" aria-hidden="true">＋</span></summary>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>)}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-amber-700">Comparer</p><h2 className="mt-2 text-2xl font-black">Les autres kits d’hiver</h2></div><Link href="/boutique" className="text-sm font-bold text-amber-800 underline underline-offset-4">Voir la boutique</Link></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{relatedTiers.map((relatedTier) => <div key={relatedTier.id}><ProductCard tier={relatedTier} /></div>)}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
