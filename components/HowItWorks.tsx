"use client";

import Reveal from "@/components/Reveal";

const STEPS = [
  { n: "01", t: "Commande", d: "Choisis ton kit et règle ta commande via le paiement sécurisé Stripe." },
  {
    n: "02",
    t: "Préparation",
    d: "Après confirmation du paiement, les informations de commande sont transmises à notre partenaire logistique.",
  },
  {
    n: "03",
    t: "Livraison",
    d: "Le délai moyen indiqué est de 7 à 15 jours ouvrés selon la destination. Consulte les CGV pour les détails.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 py-20 border-t border-line bg-panel2/40">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {STEPS.map((s, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <span className="font-mono text-sm text-gold-deep">{s.n}</span>
            <h3 className="font-display font-semibold text-lg mt-2 mb-1">{s.t}</h3>
            <p className="text-sm text-muted">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
