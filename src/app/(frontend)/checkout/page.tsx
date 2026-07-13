'use client'

import { useState } from 'react'
import { useShop } from '@/components/frontend/pages/shop/shopContext'
import { ShoppingBag, ArrowLeft, Loader2, CreditCard, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, isMounted } = useShop()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/checkout/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          items: cart.map((i) => ({ id: i.product.id, quantity: i.quantity })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize payment')
      }

      // Clear local cart before redirecting
      clearCart()

      // Redirect user to Paystack checkout screen
      window.location.href = data.url
    } catch (err) {
      console.error(err)
      const errMsg = err instanceof Error ? err.message : 'Checkout failed. Please try again.'
      toast.error(errMsg)
      setLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm uppercase tracking-wider mb-12 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-12">
          Secure Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl bg-muted/20 max-w-lg mx-auto">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-xl text-foreground font-semibold">Your cart is empty.</p>
            <p className="text-muted-foreground mt-2">Go back to the shop to add some books.</p>
            <Link href="/shop" className="inline-block mt-6">
              <Button className="bg-[#8B2C2C] hover:bg-[#732424] text-white">Browse Books</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Left Column - Order Summary */}
            <div className="md:col-span-7 bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
              <h2 className="font-heading text-xl font-bold uppercase tracking-wider mb-6">
                Order Summary
              </h2>

              <div className="space-y-6">
                {cart.map((item) => {
                  const image = item.product.heroImage
                  const imageUrl =
                    image && typeof image === 'object' && 'url' in image ? image.url || '' : ''

                  return (
                    <div key={item.product.id} className="flex gap-4">
                      {imageUrl ? (
                        <div className="h-20 w-14 overflow-hidden rounded shrink-0 relative">
                          <Image
                            src={imageUrl}
                            alt={item.product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-20 w-14 bg-linear-to-br from-[#8B2C2C] to-[#1B3629] rounded shrink-0" />
                      )}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm leading-tight line-clamp-2">
                            {item.product.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.product.format ||
                              (typeof item.product.category === 'object' &&
                              item.product.category !== null
                                ? item.product.category.title
                                : 'Book')}
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="font-bold text-[#8B2C2C]">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${cartSubtotal}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-[#1B3629] uppercase tracking-wider pt-1">
                  <span>Total to Pay</span>
                  <span>${cartSubtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Billing / Payment Form */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold uppercase tracking-wider mb-6">
                  Customer Info
                </h2>

                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-wider font-bold text-muted-foreground"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      disabled={loading}
                    />
                    <p className="text-[10px] text-muted-foreground">
                      We will email your PDF book download links to this address.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#8B2C2C] hover:bg-[#732424] text-white flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirecting to Paystack...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Pay ${cartSubtotal.toLocaleString()}
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border text-xs text-muted-foreground">
                <ShieldCheck className="h-8 w-8 text-[#D4AF37] shrink-0" />
                <p>
                  Payments are secure and processed in USD ($) by Paystack. Your download links are
                  delivered instantly on payment confirmation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
