import { NextResponse } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { productId, email } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const product = await payload.findByID({
      collection: "products",
      id: productId,
    })

    if (!product || product.type !== "session") {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 })
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
        amount: Math.round(product.price * 100),
        currency: product.currency ? product.currency.toUpperCase() : undefined,
        callback_url: `${siteUrl}/mentorship/success`,
        metadata: {
          productId: String(product.id),
          productTitle: product.title,
          productType: product.type,
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
    console.error("Paystack Error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}