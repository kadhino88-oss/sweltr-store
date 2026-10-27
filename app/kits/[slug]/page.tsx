import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { TIERS } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import KitCheckoutButton from "@/components/KitCheckoutButton";

const siteUrl = process.env.SITE_URL || "https://sweltr-store-five.vercel.app";

export function generateStaticParams() {
  return TIERS.map((tier) => ({ slug: tier.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tier = TIERS.find((item) => item.id === params.slug);
  if (!tier) return {};
  return {
    title: `${tier.name} — Kit hiver | SWELTR`,
    description: `${tier.tagline}. ${tier.description}`,
    alternates: { canonical: `${siteUrl}/kits/${tier.id}` },
    openGraph: { title: `${tier.name} | SWELTR`, description: tier.description, images: tier.images.slice(0, 4), type: "website" },
  };
}

export default function KitPage({ params }: { params: { slug: string } }) {
  const tier = TIERS.find((item) => item.id === params.slug);
  if (!tier) notFound();
  const gallery = [...new Set([...tier.images, ...tier.cardImages])].slice(0, 8);

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-7 md:px-10">
        <Link href="/boutique" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950">
          <ArrowLeft size={16} /> Retour à la boutique
        </Link>
        <div className="mt-6 grid overflow-hidden rounded-[2rem] bg-white shadow-sm lg:grid-cols-2">
          <div className="bg-slate-100 p-3 md:p-5">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-200">
              <Image src={gallery[0]} alt={tier.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" unoptimized className="object-cover" />
              {tier.best && <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950">Le plus choisi</span>}
            </div>
            {gallery.length > 1 && <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label="Galerie photos du kit">
              {gallery.slice(1).map((src, index) => <div key={src} className="relative aspect-square overflow-hidden rounded-xl border border-white bg-white">
                <Image src={src} alt={`${tier.name} — photo ${index + 2}`} fill sizes="(max-width: 640px) 30vw, 120px" unoptimized className="object-cover" />
              </div>)}
            </div>}
            <p className="mt-3 px-1 text-xs leading-5 text-slate-500">Photos issues du catalogue fournisseur CJ Dropshipping. La correspondance exacte de chaque image avec la variante commandée doit être vérifiée avant la mise en vente définitive ; aucune image générée ne remplace les photos des articles.</p>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
            <p className="font-mono text-xs uppercase tracking-[.22em] text-amber-700">SWELTR · Collection hiver</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">{tier.name}</h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-amber-800">{tier.tagline}</p>
            <p className="mt-5 text-lg leading-8 text-slate-600">{tier.description}</p>
            <div className="mt-6 rounded-2xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-500">Prix du kit</p>
              <p className="mt-1 font-display text-4xl font-bold">{formatPrice(tier.price)}</p>
              <p className="mt-2 text-xs text-slate-500">Paiement sécurisé par carte via Stripe. Devise : CHF.</p>
            </div>
            <h2 className="mt-7 text-lg font-bold">Dans ton kit</h2>
            <ul className="mt-3 space-y-3">
              {tier.items.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-slate-700"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>{item}</span></li>)}
            </ul>
            {tier.specs.length > 0 && <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
              {tier.specs.map((spec) => <div key={spec.label} className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-between"><span className="text-slate-500">{spec.label}</span><span className="font-medium sm:max-w-[60%] sm:text-right">{spec.value}</span></div>)}
            </div>}
            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-slate-700">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-800" />
              <p>Livraison proposée en Suisse et en France. Le suivi et les délais exacts dépendent de la confirmation de la commande fournisseur.</p>
            </div>
            <div className="mt-7"><KitCheckoutButton tierId={tier.id} /></div>
            <Link href="/boutique" className="mt-4 text-center text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-slate-950">Comparer les autres kits</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
