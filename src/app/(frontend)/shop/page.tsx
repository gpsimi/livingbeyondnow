import { getPayload } from 'payload'
import config from '@payload-config'
import Layout from '@/components/frontend/layout/Layout'
import { ShopGrid, ShopHero } from '@/components/frontend/pages/shop'

export default async function ShopPage() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 100,
  })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return (
    <Layout>
      <ShopHero />
      <ShopGrid initialProducts={products} initialCategories={categories} />
    </Layout>
  )
}
