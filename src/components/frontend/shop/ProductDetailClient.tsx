'use client'

import React from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store'
import type { Product, Media } from '@/payload-types'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Clock, MapPin, Calendar, CheckCircle2 } from 'lucide-react'

export const ProductDetailClient = ({ product }: { product: Product }) => {
  const { addItem, setAddModalOpen } = useCartStore()
  const handlePrimaryAction = async () => {
    // ALL PRODUCTS → Add to Cart
    addItem(product)
    setAddModalOpen(true, product)
  }

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦'
    return `${symbol} ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  }

  // Dynamic button label based on product type
  const getButtonLabel = () => {
    if (product.type === 'session') {
      return product.buttonText || 'Proceed to Payment →'
    }
    return product.buttonText || 'Add to Cart →'
  }

  const heroImage = typeof product.heroImage === 'object' ? (product.heroImage as Media) : null

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Top Section - Hero Image & Floating Card */}
        <div className="grid md:grid-cols-[1fr_400px] gap-8 mb-12 items-start">
          {/* Left: Product Image */}
          <div className="w-full h-full relative aspect-3/4 md:aspect-auto md:h-[600px] rounded-xl overflow-hidden shadow-sm">
            {heroImage?.url && (
              <Image
                src={heroImage.url}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Right: Floating Buy Card */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/40 p-8 sticky top-24">
            <h1 className="font-heading text-2xl text-navy uppercase leading-tight mb-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-navy">
                PC
              </div>
              <span className="text-xs font-bold text-navy tracking-wider uppercase">
                Prime Counsel
              </span>
            </div>

            <div className="w-full p-3 border border-border rounded-xl text-sm font-bold text-navy mb-6 flex justify-between items-center bg-surface">
              <span className="truncate">
                {formatPrice(product.price, product.currency)} - {product.title}
              </span>
              <span className="text-muted-foreground ml-2 text-xs">↕</span>
            </div>

            <div className="flex items-center justify-between mb-8 gap-4">
              <p className="font-heading text-2xl text-navy whitespace-nowrap">
                {formatPrice(product.price, product.currency)}
              </p>
              <button
                onClick={handlePrimaryAction}
                className="btn-gold flex-1 text-xs py-3.5 tracking-widest shadow-md"
              >
                {getButtonLabel()}
              </button>
            </div>

            <div className="space-y-4 text-sm text-navy/80 font-body mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Duration</span>
                </div>
                <span className="font-bold">{product.duration || 'Tailored'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Location</span>
                </div>
                <span className="font-bold">{product.location || 'Online / In-Person'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Booking</span>
                </div>
                <span className="font-bold">{product.booking || 'Flexible'}</span>
              </div>
            </div>

            {product.gains && product.gains.length > 0 && (
              <Accordion
                type="single"
                collapsible
                className="w-full border-t border-border/50 pt-2"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="text-sm hover:no-underline font-bold text-navy hover:text-gold uppercase tracking-wider py-3">
                    What&apos;s Included
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pb-4 text-sm leading-relaxed">
                    <ul className="space-y-2">
                      {product.gains.map((gain, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{gain.gain}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>

        {/* Bottom Section - Details & Rich text */}
        <div className="bg-white rounded-2xl shadow-sm border border-border/30 p-8 md:p-12 mb-12 max-w-4xl w-full">
          <div className="prose prose-navy prose-sm max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wider prose-headings:text-navy">
            <RichText data={product.description} enableGutter={false} />
          </div>

          {product.whoFor && (
            <div className="mt-12">
              <h3 className="font-heading text-lg text-navy mb-4 uppercase tracking-widest">
                Who This Is For
              </h3>
              <p className="font-body text-sm text-foreground/80 leading-relaxed border-l-2 border-gold pl-4">
                {product.whoFor}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 mt-12">
            <p className="font-heading text-2xl text-navy whitespace-nowrap">
              {formatPrice(product.price, product.currency)}
            </p>
            <button
              onClick={handlePrimaryAction}
              className="btn-gold flex-1 text-xs py-3.5 tracking-widest shadow-md"
            >
              {getButtonLabel()}
            </button>
          </div>

          {/* <div className="mt-12 p-6 border border-dashed border-navy/20 rounded-xl bg-surface flex items-start gap-4">
             
             
           </div> */}
        </div>
      </div>
    </div>
  )
}
