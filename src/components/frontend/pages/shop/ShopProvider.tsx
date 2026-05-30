"use client";

import { useEffect, useState, ReactNode } from "react";
import { Product } from "@/constants";
import { ShopContext, CartItem } from "./shopContext";

const load = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration safe load
  useEffect(() => {
    setCart(load("lbn-cart", []));
    setWishlist(load("lbn-wishlist", []));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("lbn-cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("lbn-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.product.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0)
    );

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) =>
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );

  const isWishlisted = (id: string) => wishlist.some((p) => p.id === id);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        cartSubtotal,
        isMounted,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
