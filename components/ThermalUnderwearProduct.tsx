"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck, Truck } from "lucide-react";

type SupplierVariant = {
  vid: string;
  name: string;
  key: string;
  sku: string;
  image: string;
  supplierPrice: number;
  weightGrams: number;
};

const PRODUCT_IMAGE = "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2380523575462.jpg";
const GALLERY = [
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2380523575462.jpg",
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/839569554813.jpg",
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/7611432973773.jpg",
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/15163317572484.jpg",
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2075896965584.jpg",
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/1213570991083.jpg",
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2943572117001.jpg",
  "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/5609032418762.jpg"
];
const SALE_PRICE_EUR = 39.90;
const SALE_PRICE_CHF = 39.90;

function parseVariant(key: string) {
  const parts = key.split(/[-_]/).map((part) => part.trim()).filter(Boolean);
  const size = parts.length ? parts[parts.length - 1] : "";
  const color = parts.slice(0, -1).join(" ").replace(/\b(male|female|men|women|unisex)\b/gi, "").replace(/\s+/g, " ").trim();
  return { size, color: color || "Autre" };
}

export default function ThermalUnderwearProduct() {
  const [variants, setVariants] = useState<SupplierVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [variantsMessage, setVariantsMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(PRODUCT_IMAGE);
  const [country, setCountry] = useState<"FR" | "CH">("FR");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    let alive = true;
    fetch("/api/products/thermal-underwear/variants")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Impossible de charger les variantes.");
        return data.variants as SupplierVariant[];
      })
      .then((items) => {
        if (!alive) return;
        setVariants(items);
        const parsed = items.map((item) => ({ item, ...parseVariant(item.key) }));
        const colors = Array.from(new Set(parsed.map((item) => item.color)));
        const black = colors.find((color) => /black|noir/i.test(color));
        setSelectedColor(black || colors[0] || "");
        const first = parsed.find((item) => item.color === (black || colors[0]));
        setSelectedSize(first?.size || "");
        if (first?.item.image) setActiveImage(first.item.image);
      })
      .catch(() => {
        // Do not expose supplier diagnostics; explain why checkout is unavailable.
        if (alive) {
          setVariantsMessage("Ce produit est en cours de validation fournisseur. Les commandes seront ouvertes après confirmation des variantes, du stock et de la livraison.");
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => { alive = false; };
  }, []);

  const parsedVariants = useMemo(
    () => variants.map((variant) => ({ ...variant, ...parseVariant(variant.key) })),
    [variants],
  );
  const colors = useMemo(() => Array.from(new Set(parsedVariants.map((variant) => variant.color))), [parsedVariants]);
  const sizes = useMemo(
    () => parsedVariants.filter((variant) => variant.color === selectedColor).map((variant) => variant.size).filter(Boolean),
    [parsedVariants, selectedColor],
  );
  const selectedVariant = parsedVariants.find((variant) => variant.color === selectedColor && variant.size === selectedSize);

  function chooseColor(color: string) {
    setSelectedColor(color);
    const first = parsedVariants.find((variant) => variant.color === color);
    setSelectedSize(first?.size || "");
    if (first?.image) setActiveImage(first.image);
  }

  const price = country === "FR" ? SALE_PRICE_EUR : SALE_PRICE_CHF;
  const money = new Intl.NumberFormat(country === "FR" ? "fr-FR" : "fr-CH", {
    style: "currency", currency: country === "FR" ? "EUR" : "CHF",
  });

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950">
          <ArrowLeft size={16} /> Retour à la collection
        </Link>

        <div className="mt-6 grid overflow-hidden rounded-[2rem] bg-white shadow-sm lg:grid-cols-2">
          <div className="bg-slate-100 p-3 md:p-5">
            <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-white md:min-h-[480px]">
              <Image src={activeImage} alt="Ensemble thermique SWELTR" fill priority sizes="(max-width: 1024px) 100vw, 50vw" unoptimized className="object-contain" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {GALLERY.map((image) => (
                <button key={image} onClick={() => setActiveImage(image)} className={`relative aspect-square overflow-hidden rounded-xl border bg-white ${activeImage === image ? "border-amber-600" : "border-slate-200"}`} aria-label="Afficher la photo du produit">
                  <Image src={image} alt="Photo de l'ensemble thermique" fill sizes="(max-width: 640px) 45vw, 220px" unoptimized className="object-contain" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
            <p className="font-mono text-xs uppercase tracking-[.22em] text-amber-700">SWELTR · COLLECTION HIVER</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">Ensemble thermique Winter Warm</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">Un ensemble deux pièces à porter comme couche supplémentaire lorsque les températures baissent.</p>
            <div className="mt-5 text-3xl font-bold">{money.format(price)}</div>

            <div className="mt-7">
              <label htmlFor="thermal-country" className="mb-2 block text-sm font-semibold">Destination de livraison</label>
              <select id="thermal-country" value={country} onChange={(event) => setCountry(event.target.value as "FR" | "CH")} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3">
                <option value="FR">France</option>
                <option value="CH">Suisse</option>
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="thermal-color" className="mb-2 block text-sm font-semibold">Couleur</label>
              {loading ? <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 size={16} className="animate-spin" /> Chargement des options…</div> :
                colors.length ? <select id="thermal-color" value={selectedColor} onChange={(event) => chooseColor(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3">{colors.map((color) => <option key={color} value={color}>{color}</option>)}</select> :
                <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">{variantsMessage || "Les options de ce produit sont momentanément indisponibles. Merci de réessayer un peu plus tard."}</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="thermal-size" className="mb-2 block text-sm font-semibold">Taille</label>
              <select id="thermal-size" value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} disabled={loading || sizes.length === 0} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 disabled:bg-slate-100">
                {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
              </select>
              <p className="mt-2 text-xs leading-5 text-slate-500">Les tailles asiatiques peuvent tailler petit. Consulte le guide des tailles et mesure-toi avant de choisir.</p>
            </div>


            <div className="mt-7 space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>Ensemble deux pièces : haut à enfiler et pantalon.</span></div>
              <div className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>Matière annoncée par le fournisseur : 100 % polyester.</span></div>
              <div className="flex items-start gap-3"><Truck size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>Les frais et délais de livraison sont confirmés lors de la commande.</span></div>
              <div className="flex items-start gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-amber-700" /><span>Vérifie la composition et les mesures sur la fiche avant l'achat.</span></div>
            </div>

            {checkoutError && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{checkoutError}</p>}
            <button
              type="button"
              disabled={loading || !selectedVariant || checkoutLoading}
              onClick={async () => {
                if (!selectedVariant) return;
                setCheckoutLoading(true);
                setCheckoutError("");
                try {
                  const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productType: "thermal-underwear", variantId: selectedVariant.vid, country }),
                  });
                  const data = await response.json();
                  if (!response.ok || typeof data.url !== "string") throw new Error(data.error || "Le paiement est indisponible. Réessaie plus tard.");
                  window.location.assign(data.url);
                } catch (error) {
                  setCheckoutError(error instanceof Error ? error.message : "Impossible de démarrer le paiement.");
                  setCheckoutLoading(false);
                }
              }}
              className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-base font-bold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkoutLoading ? <><Loader2 size={18} className="mr-2 animate-spin" /> Préparation du paiement…</> : "Commander et payer"}
            </button>
            <p className="mt-3 text-xs leading-5 text-slate-500">Paiement sécurisé via Stripe. Les options disponibles sont vérifiées avant la commande.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
