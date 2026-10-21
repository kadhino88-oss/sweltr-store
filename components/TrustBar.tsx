import { Battery, Box, PlugZap } from "lucide-react";
import { TIERS } from "@/lib/data";

const FEATURES = [
  { icon: Battery, label: "Accessoires chauffants" },
  { icon: PlugZap, label: "Recharge USB" },
  { icon: Box, label: `${TIERS.length} kits à comparer` },
];

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-panel2/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {FEATURES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-3 px-4 py-5 text-center">
            <Icon size={18} className="shrink-0 text-gold-deep" />
            <span className="font-mono text-xs uppercase tracking-wide text-soft">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
