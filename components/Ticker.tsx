"use client";

const MSG =
  "⚠ ALERTE GRAND FROID — COMMANDE AUJOURD'HUI POUR RECEVOIR AVANT LA PROCHAINE VAGUE DE FROID  •  LIVRAISON OFFERTE DÈS 40€  •  GARANTIE CHALEUR 30 JOURS  •  ";

export default function Ticker() {
  return (
    <div className="font-mono text-[11px] tracking-widest uppercase py-2 overflow-hidden whitespace-nowrap bg-[linear-gradient(90deg,#FF2E63,#FF7A3C,#FFD23F)] text-ink">
      <div className="inline-block animate-[scroll_22s_linear_infinite]">
        {MSG.repeat(2)}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
