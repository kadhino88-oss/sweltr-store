const STEPS = [
  { number: "01", title: "Choisis", detail: "Compare les kits et leurs photos." },
  { number: "02", title: "Commande", detail: "Paie de façon sécurisée avec Stripe." },
  { number: "03", title: "Reçois", detail: "Consulte les délais selon ta destination." },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-line bg-panel2/40 px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.number} className="rounded-xl border border-line bg-panel p-5">
            <p className="font-mono text-xs tracking-widest text-gold-deep">{step.number}</p>
            <h2 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h2>
            <p className="mt-1 text-sm text-muted">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
