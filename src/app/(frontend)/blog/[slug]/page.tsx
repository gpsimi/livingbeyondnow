import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import type { Media, Category, Blog } from '@/payload-types'
import Layout from '@/components/frontend/layout/Layout'
import { BlogCard } from '@/components/frontend/blog/blog-card'
import FadeIn from '@/components/frontend/FadeIn'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'blog',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/blog/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const recentPosts = await queryRecentPosts({ excludeSlug: decodedSlug })

  const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
  const imageUrl =
    heroImage?.sizes?.xlarge?.url || heroImage?.sizes?.large?.url || heroImage?.url || null

  const allCategories = (post.categories ?? []).filter(
    (cat): cat is Category => typeof cat === 'object',
  )

  return (
    <Layout>
      <article>
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}

        {/* ── Hero ── */}
        <section className="relative min-h-[340px] md:min-h-[420px] flex flex-col justify-end bg-primary overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/70 to-primary/30" />

          {/* Hero content */}
          <div className="relative z-10 container-narrow px-4 pb-12 pt-28">
            <FadeIn direction="up">
              {/* Category breadcrumb */}
              {allCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {allCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-heading text-3xl md:text-5xl text-white uppercase leading-tight mb-4 max-w-3xl">
                {post.title}
              </h1>

              {post.publishedAt && (
                <p className="text-white/50 text-sm">{formatDate(post.publishedAt)}</p>
              )}
            </FadeIn>
          </div>
        </section>

        {/* ── Article Body ── */}
        <section className="bg-white py-12 px-4">
          <div className="container-narrow">
            <div className="max-w-2xl mx-auto">
              <FadeIn direction="up" delay={0.2}>
                <RichText
                  data={post.content}
                  enableGutter={false}
                  className="
                  prose prose-base max-w-none
                  prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-primary
                  prose-p:font-body prose-p:text-foreground/80 prose-p:leading-relaxed
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-accent
                  prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-foreground/70
                  prose-strong:text-primary
                "
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Recent Posts ── */}
        {recentPosts.length > 0 && (
          <section className="bg-surface py-16 px-4 border-t border-border">
            <div className="container-narrow">
              <FadeIn direction="up">
                <h2 className="font-heading text-2xl md:text-3xl text-primary mb-8 uppercase tracking-wide text-center">
                  Recent Insights
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {recentPosts.map((recentPost, i) => (
                  <FadeIn key={recentPost.id} direction="up" delay={0.1 * i}>
                    <BlogCard post={recentPost as Blog} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Navigation Footer ── */}
        <section className="bg-white border-t border-border py-8 px-4">
          <div className="container-narrow">
            <FadeIn direction="up" delay={0.1}>
              <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 flex-wrap">
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform duration-200">
                    ←
                  </span>
                  Back to Insights
                </Link>
                <Link href="/contact" className="btn-secondary text-sm">
                  Begin Your Journey
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug: decodeURIComponent(slug) })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 2,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})

const queryRecentPosts = cache(async ({ excludeSlug }: { excludeSlug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    limit: 2,
    overrideAccess: false,
    sort: '-createdAt',
    depth: 2,
    where: {
      slug: { not_equals: excludeSlug },
    },
  })

  return result.docs || []
})
