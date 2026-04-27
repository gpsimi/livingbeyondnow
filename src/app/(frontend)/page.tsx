import React from 'react'
import {
  HeroSection,
  InstitutionalIdentity,
  PillarSection,
  // PhilosophyPreview,
  ServicesOverview,
  AskPrimeSection,
  HomeBlogPreview,
  TrustedOrganisations,
  MeetCoach,
  Testimonials,
  Statistics,
} from '@/components/frontend/pages/home'
import Layout from '@/components/frontend/layout/Layout'

export const metadata = {
  title: 'Prime Counsel | Raising Leaders, Redifining Futures',
  description:
    'Prime Counsel is a UK-registered leadership and personal development organisation committed to helping emerging leaders move from potential to structured impact.',
}

export default function Page() {

  return (
    <Layout>
      <HeroSection />
      <InstitutionalIdentity />
      <PillarSection />
      {/* <PhilosophyPreview /> */}
      <ServicesOverview />  
      <AskPrimeSection />
      <TrustedOrganisations />
      <Statistics />
      <MeetCoach />
      <Testimonials />
      <HomeBlogPreview />
    </Layout>
  )
}
