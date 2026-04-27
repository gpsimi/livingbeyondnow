import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: Request) {
  try {
    const { productId, quantity = 1 } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Fetch the product directly from Payload Local API (secure, server-side)
    const payload = await getPayload({ config: configPromise })
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
      depth: 0,
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.title,
              description: product.shortDescription || undefined,
            },
            unit_amount: Math.round(product.price * 100), // Stripe uses cents
          },
          quantity,
        },
      ],
      metadata: {
        productId: String(product.id),
        productSlug: product.slug || '',
        productType: product.type || 'session',
      },
      success_url: `${siteUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}&slug=${product.slug}`,
      cancel_url: `${siteUrl}/shop/${product.slug}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    )
  }
}
