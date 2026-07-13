"use client";

import { useState } from "react";
import { Product } from "@/payload-types";
import { useShop } from "./shopContext";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.title} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    // Ideally this redirects to checkout page
    window.location.href = "/checkout";
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Top Row: Quantity Selector + Add to Cart + Wishlist */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Quantity Selector */}
        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden h-12 w-36 shrink-0 bg-white shadow-xs">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-12 flex justify-center items-center h-full bg-neutral-100 hover:bg-neutral-200 border-r border-neutral-200 transition-colors text-neutral-600 font-medium"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="flex-1 text-center font-semibold text-neutral-800">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-12 flex justify-center items-center h-full bg-neutral-100 hover:bg-neutral-200 border-l border-neutral-200 transition-colors text-neutral-600 font-medium"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="h-12 flex-1 min-w-[180px] bg-[#8B2C2C] hover:bg-[#732424] text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </Button>

        {/* Wishlist Button */}
        <button
          onClick={() => {
            toggleWishlist(product);
            toast.success(
              wishlisted ? "Removed from wishlist" : "Added to wishlist"
            );
          }}
          className="h-12 w-12 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors flex items-center justify-center shrink-0 shadow-xs"
        >
          <Heart className={`h-5 w-5 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-neutral-600"}`} />
        </button>
      </div>

      {/* Full Width Buy Now Button */}
      <Button
        onClick={handleBuyNow}
        className="w-full h-12 bg-[#1B3629] hover:bg-[#13261C] text-white rounded-lg font-semibold shadow-xs transition-colors"
      >
        Buy Now
      </Button>
    </div>
  );
}
