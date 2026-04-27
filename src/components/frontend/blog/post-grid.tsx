import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Blog, Category } from '@/payload-types'
import BlogGrid from '@/app/(frontend)/blog/page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function PostGrid() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    depth: 2,
    limit: 100,
    overrideAccess: false,
    sort: '-createdAt',
  })

  const allPosts = result.docs as Blog[]

  const posts = allPosts // Show all posts in the grid, including the featured one

  // Extract unique populated categories from all posts
  const categoryMap = new Map<number, Category>()
  allPosts.forEach((post) => {
    post.categories?.forEach((cat) => {
      if (typeof cat === 'object' && cat.id) {
        categoryMap.set(cat.id, cat as Category)
      }
    })
  })
  const categories = Array.from(categoryMap.values())

  return (
    <section className="bg-white py-12 px-4 pb-20">
      <div className="container-narrow">
        {posts.length > 0 ? (
          <BlogGrid posts={posts} categories={categories} />
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">More articles coming soon.</p>
          </div>
        )}
      </div>
    </section>
  )
}