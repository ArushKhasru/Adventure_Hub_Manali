"use client";

import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  type: "activity" | "hotel" | "travel";
  title: string;
  price?: string;
  image?: string;
  detail?: string;
  date?: string;
  guests?: number;
  selected?: boolean;
}

const CART_KEY = "ahm_trip_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch custom event to sync other components on the same page
    window.dispatchEvent(new Event("cart-updated"));
  } catch (e) {
    console.error("Error writing cart to localStorage", e);
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial load
    setItems(getCart());
    setIsLoaded(true);

    const handleCartUpdate = () => {
      setItems(getCart());
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const addToCart = (item: Omit<CartItem, "date" | "guests">) => {
    const current = getCart();
    const exists = current.find((i) => i.id === item.id);
    if (exists) return; // Avoid duplicate entries

    const newItem: CartItem = {
      ...item,
      date: "",
      guests: 2,
    };
    const updated = [...current, newItem];
    saveCart(updated);
  };

  const removeFromCart = (id: string) => {
    const current = getCart();
    const updated = current.filter((i) => i.id !== id);
    saveCart(updated);
  };

  const updateCartItem = (id: string, fields: Partial<Pick<CartItem, "date" | "guests" | "selected">>) => {
    const current = getCart();
    const updated = current.map((i) => (i.id === id ? { ...i, ...fields } : i));
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return {
    items,
    isLoaded,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    count: items.length,
  };
}
