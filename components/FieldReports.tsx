"use client";

import { Star } from "lucide-react";
import { REPORTS } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function FieldReports() {
  return (
    <section id="avis" className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <Reveal className="text-center mb-14">
        <span className="font-mono text-xs uppercase tracking-widest text-orange">
          Avis terrain
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl mt-3">
          Testé en conditions réelles de grand froid
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {REPORTS.map((r, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="p-6 rounded-2xl bg-panel border border-line h-full">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#FFD23F" color="#FFD23F" />
                ))}
              </div>
              <p className="text-sm mb-5 text-soft">« {r.quote} »</p>
              <div className="flex justify-between items-center font-mono text-xs text-[#6B6B74]">
                <span>{r.name}</span>
                <span className="text-orange">{r.temp} relevés</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
