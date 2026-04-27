import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import Layout from '@/components/frontend/layout/Layout'
import { ProductDetailClient } from '@/components/frontend/shop/ProductDetailClient'
import type { Product } from '@/payload-types'
import FadeIn from '@/components/frontend/FadeIn'

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/shop/' + decodedSlug
  const product = await queryProductBySlug({ slug: decodedSlug })
  
  let recommendations: Product[] = []
  if (product) {
    recommendations = await queryRecommendations({ product: product as Product }) as Product[]
  }

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 text-center h-[60vh] flex flex-col justify-center items-center">
          <h1 className="heading-lg mb-4">Resource Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The resource you are looking for does not exist or has been moved.
          </p>
          <Link href="/shop" className="btn-primary inline-block">
            ← Back to Shop
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="pt-16 pb-20 md:pt-16 md:pb-20 gradient-navy text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24 pb-16 max-w-2xl">
          <FadeIn>
            <p className="page-label">Shop With Us</p>
          </FadeIn>
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[60px] text-primary-foreground leading-[1.05]">
              RESOURCE LIBRARY
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-primary-foreground/70 text-[17px] leading-relaxed">
              Explore our exclusive resources and materials designed to elevate your leadership
              journey.
            </p>
          </FadeIn>
        </div>
      </section>
      <article>
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <ProductDetailClient product={product as Product} />
      </article>

      {/* Recommendations Section */}
      {recommendations && recommendations.length > 0 && (
        <section className="py-16 md:py-24 bg-[#FAF9F6] border-t border-border/40">
          <div className="container max-w-5xl mx-auto px-4 md:px-8">
            <FadeIn>
              <div className="flex flex-col items-center mb-12">
                <span className="text-gold font-bold text-xs tracking-widest uppercase mb-2">Explore More</span>
                <h2 className="font-heading text-3xl md:text-4xl text-navy uppercase text-center">
                  You May Also Like
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 max-w-3xl flex-wrap justify-center mx-auto">
                {recommendations.map((p, i) => {
                  const typedP = p as Product
                  const formatPrice = (price: number, currency?: string | null) => {
                    const c = currency || 'GBP'
                    const symbol = c === 'GBP' ? '£' : c === 'USD' ? '$' : '₦'
                    return `${symbol} ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                  }
                  
                  return (
                    <FadeIn key={typedP.id} delay={i * 0.1}>
                      <Link
                        href={`/shop/${typedP.slug}`}
                        className="group block bg-white rounded-2xl p-6 shadow-sm border border-border/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                      >
                        <div className="h-56 rounded-xl overflow-hidden mb-6 bg-surface">
                          {typeof typedP.heroImage === 'object' && typedP.heroImage?.url && (
                            <Image 
                              src={typedP.heroImage.url}
                              alt={typedP.title}
                              width={500}
                              height={500}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          )}
                        </div>
                        <span className="inline-block font-body text-[10px] font-bold tracking-wider uppercase text-gold bg-gold/10 rounded-full px-3 py-1 mb-3">
                          {typeof typedP.category === 'object' ? typedP.category?.title : 'Resource'}
                        </span>
                        <h3 className="font-heading text-xl text-navy mb-2 leading-tight group-hover:text-gold transition-colors">{typedP.title}</h3>
                        <p className="font-body text-sm text-foreground/70 mb-5 line-clamp-2 leading-relaxed">{typedP.shortDescription}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-border/40">
                          <p className="font-heading text-lg text-navy">{formatPrice(typedP.price, typedP.currency)}</p>
                          <span className="text-xs font-bold text-navy uppercase tracking-widest group-hover:text-gold transition-colors">View →</span>
                        </div>
                      </Link>
                    </FadeIn>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </Layout>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug: decodeURIComponent(slug) })
  return generateMeta({ doc: product as Product })
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 1,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})

const queryRecommendations = cache(async ({ product, limit = 2 }: { product: Product, limit?: number }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit,
    overrideAccess: draft,
    depth: 1,
    where: {
      id: { not_equals: product.id },
    },
  })

  return result.docs || []
})
