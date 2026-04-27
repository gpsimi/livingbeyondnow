'use client'

import React, { useState } from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import Image from 'next/image'
import type { Product, Category } from '@/payload-types'
import { useCartStore } from '@/store/cart-store'
import { ShoppingBag, ArrowRight } from 'lucide-react'

interface ShopGridProps {
  initialProducts: Product[]
  initialCategories: Category[]
}

const ShopGrid: React.FC<ShopGridProps> = ({ initialProducts, initialCategories }) => {
  const [filter, setFilter] = useState('All')

  const filterableCategories = ['All', ...initialCategories.map((c) => c.title)]

  const filtered = initialProducts.filter((p) => {
    if (filter === 'All') return true
    const productCategory = typeof p.category === 'object' ? p.category?.title : ''
    return productCategory === filter
  })

  // Helper to format price
  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦'
    return `${symbol}${price}`
  }

  const { addItem, setAddModalOpen } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent, p: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(p)
    setAddModalOpen(true, p)
  }

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-narrow mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="flex overflow-x-auto gap-2 mb-12 pb-4 scrollbar-hide md:justify-center">
            {filterableCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`btn-pill shrink-0 text-sm py-2 px-6 ${filter === c ? 'bg-secondary text-primary-foreground' : 'bg-surface text-navy hover:bg-navy/10'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <div className="group block bg-white rounded-2xl p-4 shadow-sm border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden">
                <Link href={`/shop/${p.slug}`} className="block">
                  <div className="h-56 rounded-xl overflow-hidden mb-5 bg-muted relative">
                    {typeof p.heroImage === 'object' && p.heroImage?.url && (
                      <Image
                        src={p.heroImage.url}
                        alt={p.title}
                        width={1000}
                        height={500}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="inline-block font-body text-[10px] font-bold tracking-widest text-white bg-gold/70 backdrop-blur-md rounded-lg px-3 py-1.5 uppercase">
                        {typeof p.category === 'object' ? p.category?.title : ''}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-lg text-navy mb-2 line-clamp-1 group-hover:text-gold transition-colors">{p.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2 h-10">{p.shortDescription}</p>
                </Link>

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-border/40">
                  <p className="font-heading text-xl text-navy">{formatPrice(p.price, p.currency)}</p>
                  
                  {p.type === 'session' ? (
                    <Link 
                      href={`/shop/${p.slug}`}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors"
                    >
                      View Session <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="p-2.5 bg-surface hover:bg-gold hover:text-navy text-navy rounded-xl transition-all shadow-sm hover:shadow-md"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopGrid
