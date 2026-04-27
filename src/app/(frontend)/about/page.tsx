import Layout from '@/components/frontend/layout/Layout'
import { AboutHero, AboutBody, AboutConviction, AboutMission, AboutVision, OurTeam } from '@/components/frontend/pages/about'

export default function About() {
  return (
    <Layout>
      <AboutHero />
      <AboutBody />
      <AboutVision />
      <AboutMission />
      <OurTeam />
      <AboutConviction />
    </Layout>
  )
}
