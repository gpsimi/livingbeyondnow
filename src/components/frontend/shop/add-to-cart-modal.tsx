'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCartStore } from '@/store/cart-store'
import type { Product, Media } from '@/payload-types'

export const AddToCartModal = () => {
  const { isAddModalOpen, setAddModalOpen, lastAddedProduct, items, setCartOpen, addItem } = useCartStore()
  const [crossSells, setCrossSells] = useState<Product[]>([])

  useEffect(() => {
    // Fetch related products dynamically or arbitrarily for now
    const fetchCrossSells = async () => {
      if (lastAddedProduct) {
        try {
          const categoryId = typeof lastAddedProduct.category === 'object' ? lastAddedProduct.category.id : lastAddedProduct.category
          const res = await fetch(`/api/products?where[and][0][id][not_equals]=${lastAddedProduct.id}&where[and][1][category][equals]=${categoryId}&limit=2`)
          const data = await res.json()
          setCrossSells(data.docs || [])
        } catch (error) {
          console.error("Failed to fetch cross sells", error)
        }
      }
    }
    
    if (isAddModalOpen) {
      fetchCrossSells()
    }
  }, [isAddModalOpen, lastAddedProduct])

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  // Format price
  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦'
    return `${symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  }

  const handleProceedToCheckout = () => {
    setAddModalOpen(false)
    setCartOpen(true)
  }

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg p-0 overflow-hidden bg-white border-border/50 rounded-2xl">
        <DialogHeader className="p-6 pb-2 border-b border-border/30">
          <DialogTitle className="text-xl font-heading text-navy uppercase tracking-widest text-center">
            You may also like these
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {crossSells.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">No additional recommendations at this time.</p>
          ) : (
            crossSells.map((product) => {
              const productInCart = items.some(item => item.id === product.id)
              const heroImage = typeof product.heroImage === 'object' ? (product.heroImage as Media) : null
              
              return (
                <div key={product.id} className="flex gap-4 p-4 border border-border/40 rounded-xl hover:border-gold/30 transition-colors">
                  <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted relative">
                    {heroImage?.url && (
                      <Image 
                        src={heroImage.url} 
                        alt={product.title} 
                        fill 
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-sm text-navy line-clamp-1">{product.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.shortDescription}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-sm text-navy">{formatPrice(product.price, product.currency)}</span>
                      <button 
                        disabled={productInCart}
                        onClick={() => addItem(product)}
                        className={`text-xs font-bold px-4 py-1.5 rounded-full transition-colors ${
                          productInCart ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-navy text-white hover:bg-gold'
                        }`}
                      >
                        {productInCart ? 'Added' : '+ Add'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="bg-surface p-6 border-t border-border/30">
          <div className="flex items-center justify-between text-sm font-bold text-navy mb-4">
            <span>Items: {items.reduce((acc, item) => acc + item.quantity, 0)}</span>
            <span>Subtotal: {formatPrice(subtotal, items[0]?.currency || 'GBP')}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => { setAddModalOpen(false); setCartOpen(true); }}
              className="px-4 py-3 text-xs font-bold uppercase tracking-wider bg-transparent border border-navy text-navy rounded-xl hover:bg-navy/5 transition-colors"
            >
              View Cart
            </button>
            <button 
              onClick={handleProceedToCheckout}
              className="px-4 py-3 text-xs font-bold uppercase tracking-wider bg-navy text-white rounded-xl hover:bg-gold hover:text-navy transition-colors focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
