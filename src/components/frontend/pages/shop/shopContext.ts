"use client";

import { createContext, useContext } from "react";
import { Product } from "@/constants";

export type CartItem = { product: Product; quantity: number };

export type ShopContextValue = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  isMounted: boolean;
};

export const ShopContext = createContext<ShopContextValue | null>(null);

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
};
