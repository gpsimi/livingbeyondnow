import Layout from '@/components/frontend/layout/Layout'
import { BlogHero, FeaturedPost, PostGrid } from '@/components/frontend/blog'

export default function BlogPage() {
  return (
    <Layout>
      <BlogHero />
      <FeaturedPost />
      <PostGrid />
    </Layout>
  )
}
