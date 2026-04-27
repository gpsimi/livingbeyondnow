import React from 'react'
import { LegalPage } from '@/components/frontend/pages/legal/LegalPage'
import Layout from '@/components/frontend/layout/Layout'

export const metadata = {
  title: 'Privacy Policy | Prime Counsel',
  description: 'Our commitment to protecting your personal information and privacy.',
}

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'Personal details such as name, email address, phone number',
      'Information submitted through forms (e.g. bookings, registrations, enquiries)',
      'Payment-related information (processed securely via third-party providers)',
      'Website usage data (e.g. cookies, analytics, IP address)',
      'We only collect information that is relevant and necessary for our services.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'Deliver coaching, mentorship, training, and advisory services',
      'Respond to enquiries and communicate with you',
      'Process bookings and payments',
      'Improve our website, programmes, and user experience',
      'Send relevant updates, resources, or event information (where consent is given)',
      'We do not sell or share your personal data with third parties for marketing purposes.',
    ],
  },
  {
    title: 'Data Protection & Security',
    content: [
      'Prime Counsel is committed to safeguarding your personal information.',
      'We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, or misuse.',
      'Access to personal data is restricted to authorised personnel only.',
      'Where third-party tools are used (e.g. payment processors, email platforms), they are selected based on their compliance with recognised data protection standards.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Access the personal data we hold about you',
      'Request correction of inaccurate or incomplete data',
      'Request deletion of your data where applicable',
      'Withdraw consent for communications at any time',
      'Object to or restrict certain types of data processing',
      'To exercise your rights, please contact us at: info@primecounsel.co.uk',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <Layout>
      <LegalPage
        title="Privacy"
        titleHighlight="Policy."
        lastUpdated="1 March 2026"
        shortVersion="Prime Counsel collects only what it needs to deliver effective services, respects your data rights, and ensures your information is never sold to third parties."
        sections={sections}
      />
    </Layout>
  )
}
