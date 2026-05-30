import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    
    let totalAmount = 0
    let currency = 'USD'
    let primarySessionId = ''

    // Securely fetch each product's latest price from the database
    for (const item of items) {
      const product = await payload.findByID({
        collection: 'products',
        id: item.id,
        depth: 0,
      })

      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 404 })
      }

      if (product.type === 'session' && !primarySessionId) {
        primarySessionId = String(product.id)
      }

      totalAmount += Math.round(product.price * 100) * item.quantity
      if (product.currency) {
        currency = product.currency.toUpperCase()
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: totalAmount,
        currency,
        callback_url: `${siteUrl}/mentorship/success`,
        metadata: {
          isCart: 'true',
          primarySessionId, // Will be empty string if no session is in the cart
          items: items.map(item => ({ id: item.id, quantity: item.quantity })),
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
    console.error('Cart Checkout Error:', error)
    return NextResponse.json({ error: 'Something went wrong during checkout' }, { status: 500 })
  }
}
