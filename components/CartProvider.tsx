"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TIERS } from "@/lib/data";

export type CartItem = { tierId: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  ready: boolean;
  addItem: (tierId: string, quantity?: number) => void;
  setQuantity: (tierId: string, quantity: number) => void;
  removeItem: (tierId: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "sweltr-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function normalizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const quantities = new Map<string, number>();
  for (const row of value) {
    if (!row || typeof row !== "object") continue;
    const item = row as { tierId?: unknown; quantity?: unknown };
    if (typeof item.tierId !== "string" || !TIERS.some((tier) => tier.id === item.tierId)) continue;
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) continue;
    quantities.set(item.tierId, Math.min(10, (quantities.get(item.tierId) ?? 0) + quantity));
  }
  return TIERS.flatMap((tier) => {
    const quantity = quantities.get(tier.id);
    return quantity ? [{ tierId: tier.id, quantity }] : [];
  });
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setItems(normalizeCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")));
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((tierId: string, quantity = 1) => {
    if (!TIERS.some((tier) => tier.id === tierId) || !Number.isInteger(quantity) || quantity < 1) return;
    setItems((current) => normalizeCart([
      ...current.filter((item) => item.tierId !== tierId),
      { tierId, quantity: Math.min(10, (current.find((item) => item.tierId === tierId)?.quantity ?? 0) + quantity) },
    ]));
  }, []);

  const setQuantity = useCallback((tierId: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      setItems((current) => current.filter((item) => item.tierId !== tierId));
      return;
    }
    setItems((current) => normalizeCart(current.map((item) => item.tierId === tierId
      ? { ...item, quantity: Math.min(10, quantity) }
      : item)));
  }, []);

  const removeItem = useCallback((tierId: string) => {
    setItems((current) => current.filter((item) => item.tierId !== tierId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    ready,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  }), [items, ready, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider.");
  return context;
}
