'use client'

import { useState, useMemo } from 'react'
import type { Blog, Category } from '@/payload-types'
import { BlogCard } from '@/components/frontend/blog/blog-card'
import FadeIn from '@/components/frontend/FadeIn'

type Props = {
  posts: Blog[]
  categories: Category[]
}

export default function BlogGrid({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return posts
    return posts.filter((post) =>
      post.categories?.some((cat) =>
        typeof cat === 'object' ? String(cat.id) === activeCategory : false,
      ),
    )
  }, [activeCategory, posts])

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(String(cat.id))}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeCategory === String(cat.id)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg">No articles in this category yet.</p>
        </div>
      )}
    </div>
  )
}
