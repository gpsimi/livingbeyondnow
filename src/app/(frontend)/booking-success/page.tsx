import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Layout from '@/components/frontend/layout/Layout'
import { BookingSuccessClient } from '@/components/frontend/shop/BookingSuccessClient'
import type { Product } from '@/payload-types'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia',
})

export const metadata: Metadata = {
  title: 'Booking Confirmed | Prime Counsel',
  description: 'Your purchase has been confirmed. Thank you for choosing Prime Counsel.',
}

type Props = {
  searchParams: Promise<{ session_id?: string; slug?: string }>
}

export default async function BookingSuccessPage({ searchParams: searchParamsPromise }: Props) {
  const searchParams = await searchParamsPromise
  const slug = searchParams.slug || ''
  const sessionId = searchParams.session_id

  if (!sessionId) {
    redirect('/shop')
  }

  // Verify the Stripe session server-side
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      redirect('/shop')
    }
  } catch (error) {
    console.error('Failed to retrieve Stripe session:', error)
    redirect('/shop')
  }

  let product: Product | null = null

  if (slug) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      limit: 1,
      depth: 1,
      where: {
        slug: { equals: slug },
      },
    })
    product = (result.docs?.[0] as Product) || null
  }

  return (
    <Layout>
      <BookingSuccessClient product={product} sessionId={searchParams.session_id || null} />
    </Layout>
  )
}
