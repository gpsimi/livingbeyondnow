"use client";

import { useState } from "react";
import { Product } from "@/constants";
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
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center border border-input rounded-md overflow-hidden h-12 w-32 shrink-0">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex-1 flex justify-center items-center h-full hover:bg-muted transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="flex-1 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex-1 flex justify-center items-center h-full hover:bg-muted transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          className="h-12 flex-1 min-w-[200px] bg-[#8B2C2C] hover:bg-[#732424] text-white"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            toggleWishlist(product);
            toast.success(
              wishlisted ? "Removed from wishlist" : "Added to wishlist"
            );
          }}
          className="h-12 w-12 shrink-0"
        >
          <Heart className={`h-5 w-5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>

      <Button
        onClick={handleBuyNow}
        className="w-full h-12 bg-[#1B3629] hover:bg-[#13261C] text-white"
      >
        Buy Now
      </Button>
    </div>
  );
}
