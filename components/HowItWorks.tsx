"use client";

import Reveal from "@/components/Reveal";

const STEPS = [
  { n: "01", t: "Commande", d: "Choisis ton kit. Le paiement prend moins d'une minute." },
  { n: "02", t: "Expédition", d: "Envoyé depuis notre entrepôt UE/US sous 24h." },
  { n: "03", t: "Fraîcheur", d: "Charge une fois, porte-le toute la journée, sens la différence dès réception." },
];

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 py-20 border-t border-line bg-panel2/40">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {STEPS.map((s, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <span className="font-mono text-sm text-orange">{s.n}</span>
            <h3 className="font-display font-semibold text-lg mt-2 mb-1">{s.t}</h3>
            <p className="text-sm text-muted">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
