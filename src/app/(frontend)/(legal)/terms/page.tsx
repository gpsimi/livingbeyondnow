import React from 'react'
import { LegalPage } from '@/components/frontend/pages/legal/LegalPage'
import Layout from '@/components/frontend/layout/Layout'

export const metadata = {
  title: 'Terms of Use | Prime Counsel',
  description: 'The terms and conditions governing your use of our website and services.',
}

const sections = [
  {
    title: 'Use of Website',
    content: [
      'By accessing and using the Prime Counsel website, you agree to use it for lawful purposes only.',
      'You must not misuse the website, attempt unauthorised access, or use it in a way that may damage, disrupt, or impair its functionality.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content on this website, including text, frameworks, branding, logos, and materials, is the intellectual property of Prime Counsel Limited unless otherwise stated.',
      'You may not reproduce, distribute, or use any content without prior written permission.',
    ],
  },
  {
    title: 'Coaching & Advisory Disclaimer',
    content: [
      'Prime Counsel provides coaching, mentorship, and advisory services designed to support personal and professional development.',
      'Our services do not constitute legal, financial, medical, or psychological advice.',
      'Outcomes depend on individual effort, implementation, and external factors. We do not guarantee specific results.',
    ],
  },
  {
    title: 'Payments & Refunds',
    content: [
      'All payments for services, programmes, or events must be made in full prior to delivery unless otherwise agreed.',
      'Refund policies may vary depending on the service or programme. Where applicable, refund terms will be clearly stated at the point of purchase.',
      'Prime Counsel reserves the right to refuse or cancel bookings in line with our policies.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'Prime Counsel shall not be held liable for any direct, indirect, or consequential loss arising from the use of our website or services.',
      'Users engage with our services at their own discretion and responsibility.',
    ],
  },
]

export default function TermsPage() {
  return (
    <Layout>
      <LegalPage
        title="Terms"
        titleHighlight="Of Use."
        lastUpdated="1 March 2026"
        shortVersion="By using our services, you agree to act lawfully, respect our intellectual property, and understand the nature of our professional advisory services."
        sections={sections}
      />
    </Layout>
  )
}
