"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TIERS } from "@/lib/data";
import { WINTER_PRODUCTS } from "@/lib/winter-products";

export type CartItem = { tierId?: string; productSlug?: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  ready: boolean;
  addItem: (tierId: string, quantity?: number) => void;
  addProductItem: (productSlug: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number, kind?: "kit" | "product") => void;
  removeItem: (id: string, kind?: "kit" | "product") => void;
  clearCart: () => void;
};

const STORAGE_KEY = "sweltr-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function normalizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const quantities = new Map<string, number>();
  for (const row of value) {
    if (!row || typeof row !== "object") continue;
    const item = row as { tierId?: unknown; productSlug?: unknown; quantity?: unknown };
    const id = typeof item.tierId === "string" && TIERS.some((tier) => tier.id === item.tierId)
      ? { tierId: item.tierId, key: `kit:${item.tierId}` }
      : typeof item.productSlug === "string" && WINTER_PRODUCTS.some((product) => product.slug === item.productSlug && product.availability === "existing" && product.retailPrice !== undefined)
        ? { productSlug: item.productSlug, key: `product:${item.productSlug}` }
        : null;
    if (!id) continue;
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) continue;
    quantities.set(id.key, Math.min(10, (quantities.get(id.key) ?? 0) + quantity));
  }
  const kits = TIERS.flatMap((tier) => {
    const quantity = quantities.get(`kit:${tier.id}`);
    return quantity ? [{ tierId: tier.id, quantity }] : [];
  });
  const products = WINTER_PRODUCTS.flatMap((product) => {
    const quantity = quantities.get(`product:${product.slug}`);
    return quantity ? [{ productSlug: product.slug, quantity }] : [];
  });
  return [...kits, ...products];
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

  const addProductItem = useCallback((productSlug: string, quantity = 1) => {
    const product = WINTER_PRODUCTS.find((candidate) => candidate.slug === productSlug && candidate.availability === "existing" && candidate.retailPrice !== undefined);
    if (!product || !Number.isInteger(quantity) || quantity < 1) return;
    setItems((current) => normalizeCart([
      ...current.filter((item) => item.productSlug !== productSlug),
      { productSlug, quantity: Math.min(10, (current.find((item) => item.productSlug === productSlug)?.quantity ?? 0) + quantity) },
    ]));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number, kind: "kit" | "product" = "kit") => {
    const matches = (item: CartItem) => kind === "kit" ? item.tierId === id : item.productSlug === id;
    if (!Number.isInteger(quantity) || quantity < 1) {
      setItems((current) => current.filter((item) => !matches(item)));
      return;
    }
    setItems((current) => normalizeCart(current.map((item) => matches(item)
      ? { ...item, quantity: Math.min(10, quantity) }
      : item)));
  }, []);

  const removeItem = useCallback((id: string, kind: "kit" | "product" = "kit") => {
    setItems((current) => current.filter((item) => kind === "kit" ? item.tierId !== id : item.productSlug !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    ready,
    addItem,
    addProductItem,
    setQuantity,
    removeItem,
    clearCart,
  }), [items, ready, addItem, addProductItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider.");
  return context;
}
