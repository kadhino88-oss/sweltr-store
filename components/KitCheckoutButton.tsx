"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function KitCheckoutButton({ tierId, label = "Commander ce kit" }: { tierId: string; label?: string }) {
  const router = useRouter();
  const { addItem } = useCart();

  function checkout() {
    addItem(tierId);
    router.push("/panier");
  }

  return (
    <div>
      <button type="button" onClick={checkout} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">
        <ShoppingBag size={17} />{label}
      </button>
    </div>
  );
}
