import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Blog, Media, Category } from '@/payload-types'
import FadeIn from '@/components/frontend/FadeIn'

export const dynamic = 'force-dynamic'
export const revalidate = 600

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default async function FeaturedPost() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    depth: 2,
    limit: 1,
    overrideAccess: false,
    sort: '-createdAt',
  })

  const featured = result.docs[0] as Blog | undefined

  if (!featured) return null

  const featuredImage =
    typeof featured.heroImage === 'object' ? (featured.heroImage as Media) : null
  const featuredImageUrl =
    featuredImage?.sizes?.large?.url || featuredImage?.sizes?.medium?.url || featuredImage?.url

  const featuredCategory =
    featured.categories && featured.categories.length > 0
      ? typeof featured.categories[0] === 'object'
        ? (featured.categories[0] as Category)
        : null
      : null

  return (
    <section className="bg-white py-10 px-4 border-b border-border">
      <div className="container-narrow">
        <FadeIn delay={0.2} direction="up">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden min-h-[340px] md:min-h-[400px] flex flex-col justify-end bg-primary shadow-lg">
              {/* Background image */}
              {featuredImageUrl && (
                <Image
                  src={featuredImageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-55 transition-opacity duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-7 md:p-10 max-w-2xl">
                {featuredCategory && (
                  <p className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                    {featuredCategory.title}
                  </p>
                )}
                <h2 className="font-heading text-2xl md:text-4xl text-white uppercase leading-tight mb-3">
                  {featured.title}
                </h2>
                {featured.meta?.description && (
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5 line-clamp-3">
                    {featured.meta.description}
                  </p>
                )}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="btn-secondary text-xs px-5 py-2.5">Read Article</span>
                  {featured.publishedAt && (
                    <span className="text-white/50 text-xs">{formatDate(featured.publishedAt)}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
