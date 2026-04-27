'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { useCartStore } from '@/store/cart-store'
import type { Media } from '@/payload-types'
import { X, Trash2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'

export const CartDrawer = () => {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeItem } = useCartStore()
  const [view, setView] = useState<'cart' | 'checkout'>('cart')

  // Reset to cart view when closed
  const handleOpenChange = (open: boolean) => {
    setCartOpen(open)
    if (!open) {
      setTimeout(() => setView('cart'), 300)
    }
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦'
    return `${symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  }
  const currency = items.length > 0 ? items[0].currency : 'GBP'

  const [isLoading, setIsLoading] = useState(false)

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/checkout/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: items.map(item => ({ id: item.id, quantity: item.quantity }))
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned:', data)
        alert('Failed to initialize checkout. Please try again.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('An error occurred during checkout. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-white border-l-0 sm:border-l sm:rounded-l-3xl shadow-2xl">
        {/* Header */}
        <SheetHeader className="p-6 border-b border-border/30 sticky top-0 bg-white z-10 flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2 font-heading text-lg text-navy uppercase tracking-widest">
            {view === 'checkout' ? (
              <>
                <button onClick={() => setView('cart')} className="hover:text-gold transition-colors flex items-center">
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  My Cart
                </button>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-gold">Checkout</span>
              </>
            ) : (
              'My Cart'
            )}
          </SheetTitle>
          <SheetClose className="rounded-full p-2 hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-navy" />
          </SheetClose>
        </SheetHeader>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🛒</span>
              </div>
              <h3 className="font-heading text-xl text-navy uppercase tracking-widest mb-2">Cart is empty</h3>
              <p className="text-muted-foreground text-sm font-body mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="btn-gold w-full max-w-[200px]"
              >
                Continue Shopping
              </button>
            </div>
          ) : view === 'cart' ? (
            <div className="flex flex-col h-full">
              <div className="p-6 space-y-6 flex-1">
                {items.map((item) => {
                  const heroImage = typeof item.heroImage === 'object' ? (item.heroImage as Media) : null

                  return (
                    <div key={item.id} className="flex gap-4 p-4 border border-border/50 rounded-2xl relative group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted relative shrink-0">
                        {heroImage?.url && <Image src={heroImage.url} alt={item.title} fill className="object-cover" sizes="80px" />}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-heading text-sm text-navy leading-tight pr-6">{item.title}</h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 border border-border bg-surface rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded hover:shadow-sm transition-all"
                            >-</button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded hover:shadow-sm transition-all"
                            >+</button>
                          </div>
                          <span className="font-bold text-sm text-navy">{formatPrice(item.price * item.quantity, item.currency)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-8 pb-32">
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg text-navy mb-4 uppercase tracking-wider">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-1 block">Full Name *</label>
                      <input required type="text" placeholder="John Doe" className="w-full p-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-1 block">Email *</label>
                      <input required type="email" placeholder="example@email.com" className="w-full p-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-1 block">Phone Number *</label>
                      <div className="flex gap-2">
                        <select className="p-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold w-24">
                          <option>+44</option>
                          <option>+1</option>
                          <option>+234</option>
                        </select>
                        <input required type="tel" placeholder="Phone number" className="w-full p-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold flex-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer (Sticky at bottom) */}
        {items.length > 0 && (
          <div className="p-6 bg-surface border-t border-border/30 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-10 transition-all duration-300">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-bold text-navy">{formatPrice(subtotal, currency)}</span>
              </div>
              {view === 'checkout' && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>VAT (0%)</span>
                  <span className="font-bold text-navy">{formatPrice(0, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-navy border-t border-border/50 pt-3">
                <span>Total</span>
                <span className="text-gold">{formatPrice(subtotal, currency)}</span>
              </div>
            </div>

            {view === 'cart' ? (
              <button 
                onClick={() => setView('checkout')}
                className="w-full btn-navy py-4 text-sm font-bold uppercase tracking-widest shadow-xl flex justify-between items-center px-6"
              >
                <span>Proceed To Checkout</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="space-y-3">
                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isLoading}
                  className="w-full btn-gold py-4 text-sm font-bold uppercase tracking-widest shadow-xl disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </button>
                {/* <button 
                  type="button"
                  className="w-full p-4 text-sm font-bold uppercase tracking-widest border border-border text-navy rounded-full hover:bg-surface transition-colors"
                >
                  StableCoin (USDT)
                </button> */}
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
