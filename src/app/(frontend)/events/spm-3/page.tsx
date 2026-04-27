import Layout from '@/components/frontend/layout/Layout'
import { Spm3Hero, Spm3Waitlist } from '@/components/frontend/pages/events/spm-3'
import React from 'react'

const SPM3 = () => {
  return (
    <Layout>
      <Spm3Hero />
      <Spm3Waitlist />
    </Layout>
  )
}

export default SPM3