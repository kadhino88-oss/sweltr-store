import Image from "next/image";
import type { Tier } from "@/lib/data";

export default function KitCompositionImage({
  tier,
  className = "",
}: {
  tier: Tier;
  className?: string;
}) {
  const images = (tier.cardImages.length ? tier.cardImages : tier.images).slice(0, 3);
  const grid = images.length === 1
    ? "grid-cols-1 grid-rows-1"
    : images.length === 2
      ? "grid-cols-2 grid-rows-1"
      : "grid-cols-[1.1fr_0.9fr] grid-rows-2";

  return (
    <div
      role="img"
      aria-label={`${tier.name} : ${tier.items.join(", ")}`}
      className={`relative grid ${grid} gap-2 overflow-hidden bg-gradient-to-br from-stone-50 to-white p-2 ${className}`}
    >
      {images.map((src, index) => (
        <div
          key={src}
          className={`relative min-h-0 min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white ${images.length === 3 && index === 0 ? "row-span-2" : ""}`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 30vw, 220px"
            className="object-contain p-2"
          />
        </div>
      ))}
    </div>
  );
}
