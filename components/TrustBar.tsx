"use client";

import { Battery, Flame, Truck, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const STATS = [
  { icon: Battery, label: "Jusqu'à 4h de chaleur" },
  { icon: Flame, label: "3 paliers de température" },
  { icon: Truck, label: "Expédié sous 48h" },
  { icon: ShieldCheck, label: "Garantie chaleur 30 jours" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-panel2/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="flex flex-col items-center gap-2 py-8 px-4 text-center">
              <s.icon size={20} className="text-orange" />
              <span className="font-mono text-xs uppercase tracking-wide text-soft">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
