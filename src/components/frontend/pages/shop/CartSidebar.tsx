"use client";

import { useShop } from "./shopContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function CartSidebar() {
  const { cart, cartCount, cartSubtotal, updateQuantity, removeFromCart, isMounted } = useShop();

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl p-0 z-50 bg-[#8B2C2C] hover:bg-[#732424]"
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingBag className="h-6 w-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="font-heading uppercase tracking-tight text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Your Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-20">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
              <p className="text-lg font-medium text-muted-foreground">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => {
                const image = item.product.heroImage
                const imageUrl =
                  image && typeof image === 'object' && 'url' in image ? image.url || '' : ''

                return (
                  <div key={item.product.id} className="flex gap-4">
                    {imageUrl ? (
                      <div className="h-24 w-16 overflow-hidden rounded shrink-0 relative">
                        <Image
                          src={imageUrl}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-16 bg-linear-to-br from-[#8B2C2C] to-[#1B3629] rounded shrink-0" />
                    )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-sm leading-tight line-clamp-2">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.product.format || (typeof item.product.category === 'object' && item.product.category !== null ? item.product.category.title : 'Book')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-input rounded overflow-hidden h-8 w-24">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex-1 flex justify-center items-center h-full hover:bg-muted transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex-1 text-center font-medium text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex-1 flex justify-center items-center h-full hover:bg-muted transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-[#8B2C2C]">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/20">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground italic">Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold uppercase tracking-wider">
                <span>Total</span>
                <span>${cartSubtotal}</span>
              </div>
            </div>
            
            <Button
              className="w-full h-12 bg-[#1B3629] hover:bg-[#13261C] text-white"
              onClick={() => {
                window.location.href = "/checkout";
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
