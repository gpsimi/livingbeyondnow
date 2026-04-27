'use client'

import React from 'react'
import Link from 'next/link'
import type { Product } from '@/payload-types'
import { CheckCircle2, Clock, MapPin, Download, BookOpen, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

interface BookingSuccessClientProps {
  product: Product | null
  sessionId: string | null
}

export const BookingSuccessClient = ({ product, sessionId }: BookingSuccessClientProps) => {
  const isSession = product?.type === 'session'
  const isBook = product?.type === 'book'
  const isDigital = product?.type === 'digital'

  const formatPrice = (price?: number, currency?: string) => {
    if (price === undefined) return ''
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦'
    return `${symbol} ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  }

  // Get Calendly link from product, fallback to env variable if not set
  const calendlyUrl = product?.calendlyLink || process.env.NEXT_PUBLIC_CALENDLY_URL

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {/* Section 1: Payment Confirmation Banner */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-navy uppercase tracking-wider mb-4">
              {isSession ? 'Payment Confirmed' : 'Purchase Complete'}
            </h1>
            <p className="font-body text-navy/70 text-lg max-w-lg mx-auto leading-relaxed">
              {isSession
                ? 'Your session has been successfully secured. Please select a time below that aligns with your availability.'
                : 'Thank you for your purchase. Your order has been securely processed.'}
            </p>
          </motion.div>

          {/* Section 2: Session/Product Summary Card */}
          {product && (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-border/40 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border/40 pb-6 mb-6">
                <div>
                  <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">
                    {isSession ? 'Mentorship Session' : isBook ? 'Physical Book' : 'Digital Resource'}
                  </p>
                  <h2 className="font-heading text-2xl text-navy uppercase">{product.title}</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Amount Paid</p>
                  <p className="font-heading text-2xl text-navy">
                    {formatPrice(product.price, product.currency)}
                  </p>
                </div>
              </div>

              {isSession && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-0.5">Duration</p>
                      <p className="font-body text-navy text-sm">{product.duration || 'Tailored'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-0.5">Location</p>
                      <p className="font-body text-navy text-sm">{product.location || 'Online'}</p>
                    </div>
                  </div>
                </div>
              )}

              {(isBook || isDigital) && (
                <div className="flex items-start gap-4 bg-surface p-6 rounded-xl mt-2">
                  {isBook ? <BookOpen className="w-6 h-6 text-gold shrink-0" /> : <Download className="w-6 h-6 text-gold shrink-0" />}
                  <p className="font-body text-sm text-navy/80 leading-relaxed">
                    {isBook 
                      ? 'We are processing your order. You will receive an email shortly with shipping and tracking details.'
                      : 'Your digital product is ready. A download link has been sent directly to your email.'}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Section 3: Calendly Embed (Only for sessions) */}
          {isSession && calendlyUrl && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-border/40 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="bg-navy p-6 text-center">
                <h3 className="font-heading text-xl text-white uppercase tracking-wider">
                  Select Your Time
                </h3>
              </div>
              <div className="w-full h-[750px] relative bg-white">
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="absolute inset-0"
                  title="Schedule your session with Prime Counsel"
                />
              </div>
            </motion.div>
          )}

          {/* Fallback if Calendly URL is missing */}
          {isSession && !calendlyUrl && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-border/40 p-8 text-center shadow-sm">
              <p className="text-navy font-body mb-4">Your payment was successful, but the scheduling link is currently unavailable.</p>
              <p className="text-sm text-muted-foreground">Our team will reach out to you via email shortly to schedule your session.</p>
            </motion.div>
          )}

          {/* Navigation & Metadata */}
          <motion.div variants={itemVariants} className="flex flex-col items-center pt-8 border-t border-border/40">
            <Link
              href="/shop"
              className="btn-navy inline-flex items-center gap-2 py-4 px-8 text-xs font-bold uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all mb-8"
            >
              Return to Shop
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            {sessionId && (
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Ref: <span className="font-mono font-normal ml-1">{sessionId}</span>
              </p>
            )}
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
