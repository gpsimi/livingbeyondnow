import Image from 'next/image'
import Link from 'next/link'
import type { Blog, Category, Media } from '@/payload-types'

type BlogCardProps = {
  post: Blog
  variant?: 'grid' | 'compact'
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function BlogCard({ post, variant: _variant = 'grid' }: BlogCardProps) {
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
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-16/10 relative bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary/30 text-4xl font-heading">PC</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        {firstCategory && (
          <p className="text-accent text-[10px] font-bold uppercase tracking-[0.18em] mb-2">
            {firstCategory.title}
          </p>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading text-base leading-snug text-primary mb-2 group-hover:text-accent transition-colors line-clamp-3">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.meta?.description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {post.meta.description}
          </p>
        )}

        {/* Footer: date + read link */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          {post.publishedAt && (
            <span className="text-muted-foreground text-xs">{formatDate(post.publishedAt)}</span>
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="text-accent text-xs font-semibold hover:underline ml-auto flex items-center gap-1"
          >
            Read <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
