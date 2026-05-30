import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { productId, quantity = 1, email } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
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

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(product.price * 100), // Paystack uses subunit (kobo/cents)
        currency: product.currency ? product.currency.toUpperCase() : undefined,
        callback_url: `${siteUrl}/booking-success?slug=${product.slug}`,
        metadata: {
          productId: String(product.id),
          productSlug: product.slug || '',
          productType: product.type || 'session',
          quantity,
        },
      }),
    })

    const paystackData = await paystackRes.json()

    if (!paystackData.status) {
      console.error('Paystack initialization error:', paystackData)
      return NextResponse.json(
        { error: paystackData.message || 'Payment initialization failed' },
        { status: 400 },
      )
    }

    return NextResponse.json({ url: paystackData.data.authorization_url })
  } catch (error) {
    console.error('Paystack checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    )
  }
}
