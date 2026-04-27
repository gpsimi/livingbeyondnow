import Layout from '@/components/frontend/layout/Layout'
import { ServicesHero, ServiceBody } from '@/components/frontend/pages/services'
import { AskPrimeSection } from '@/components/frontend/pages/home'

export default function Services() {
  return (
    <Layout>
      <ServicesHero />
      <ServiceBody />
      <AskPrimeSection />
    </Layout>
  )
}
