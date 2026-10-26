import type { Metadata } from "next";
import { ArrowUpRight, Mail, Phone, ShieldCheck } from "lucide-react";
import ContentPage from "@/components/ContentPage";

const siteUrl = process.env.SITE_URL || "https://sweltr-store-five.vercel.app";

export const metadata: Metadata = {
  title: "Contact — Service client SWELTR",
  description:
    "Une question sur un produit ou une commande SWELTR ? Contacte notre service client par e-mail ou par téléphone.",
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="SERVICE CLIENT · CONTACT"
      title="Contacte SWELTR"
      description="Une question avant de commander ou besoin d'aide pour un achat ? Écris-nous par e-mail ou appelle-nous ; nous t'orienterons vers les informations utiles."
    >
      <section className="grid gap-5 md:grid-cols-2" aria-label="Coordonnées du service client">
        <article className="rounded-2xl border border-line bg-panel p-6 md:p-8">
          <Mail className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Écris-nous</h2>
          <p className="mt-2">Pour toute question sur un produit ou une commande.</p>
          <a
            className="mt-5 inline-flex items-center gap-2 break-all font-semibold text-gold-deep underline underline-offset-4"
            href="mailto:contact@bkentreprise.com"
          >
            contact@bkentreprise.com <ArrowUpRight size={16} />
          </a>
        </article>
        <article className="rounded-2xl border border-line bg-panel p-6 md:p-8">
          <Phone className="text-gold-deep" size={24} />
          <h2 className="mt-5 font-display text-xl font-semibold text-ink">Appelle-nous</h2>
          <p className="mt-2">Notre ligne de contact pour tes demandes liées à SWELTR.</p>
          <a
            className="mt-5 inline-flex items-center gap-2 font-semibold text-gold-deep underline underline-offset-4"
            href="tel:+41799349946"
          >
            +41 79 934 99 46 <ArrowUpRight size={16} />
          </a>
        </article>
      </section>
      <section className="rounded-2xl border border-gold/40 bg-panel2 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 shrink-0 text-gold-deep" size={22} />
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Préparer ta demande</h2>
            <p className="mt-3">
              Pour une demande liée à une commande, indique son numéro et l'adresse e-mail utilisée
              au paiement. Pour une question sur un produit, précise le nom du kit et ce que tu
              souhaites vérifier afin que nous puissions t'orienter vers les informations utiles.
            </p>
            <p className="mt-3">
              Pour ta sécurité, ne transmets jamais de numéro de carte bancaire, de code de
              sécurité ou de mot de passe. Le règlement s'effectue sur la page sécurisée de Stripe.
            </p>
          </div>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-display text-xl font-semibold text-ink">Une question avant de commander ?</h2>
          <p className="mt-3">
            Consulte les réponses sur l'autonomie, les produits, la livraison et les retours dans
            notre <a className="text-gold-deep underline" href="/faq">FAQ</a>.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-display text-xl font-semibold text-ink">Tu hésites entre deux kits ?</h2>
          <p className="mt-3">
            Compare leur contenu et leurs caractéristiques dans la{" "}
            <a className="text-gold-deep underline" href="/boutique">boutique SWELTR</a>, puis
            ouvre la fiche du kit qui correspond le mieux à ton besoin.
          </p>
        </div>
      </section>
    </ContentPage>
  );
}
