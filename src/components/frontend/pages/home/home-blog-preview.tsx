import Link from 'next/link'
import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Blog, Category, Media } from '@/payload-types'

const HomeBlogPreview = async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    depth: 2,
    limit: 2,
    overrideAccess: false,
    sort: '-createdAt',
  })

  const posts = result.docs as Blog[]

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-narrow mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <FadeIn>
              <p className="page-label">Our Blog</p>
              <h2 className="heading-lg mb-8 uppercase">Insights & Perspectives</h2>
              <Link href="/blog" className="btn-primary">
                View All Articles →
              </Link>
            </FadeIn>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {posts.map((post, i) => {
              const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
              const imageUrl =
                heroImage?.sizes?.medium?.url || heroImage?.sizes?.small?.url || heroImage?.url || null

              const firstCategory =
                post.categories && post.categories.length > 0
                  ? typeof post.categories[0] === 'object'
                    ? (post.categories[0] as Category)
                    : null
                  : null

              return (
                <FadeIn key={post.id} delay={i * 0.15}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border h-full flex flex-col bg-white">
                      <div className="h-48 overflow-hidden bg-muted relative shrink-0">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary/30 text-4xl font-heading">PC</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        {firstCategory && (
                          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 rounded-full px-3 py-1 mb-3 self-start">
                            {firstCategory.title}
                          </span>
                        )}
                        <h3 className="font-heading text-lg text-primary mb-4 line-clamp-3 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        <span className="text-accent font-body text-xs font-semibold mt-auto inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <span aria-hidden>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBlogPreview
