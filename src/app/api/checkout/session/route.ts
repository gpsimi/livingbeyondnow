import { NextResponse } from "next/server"
import Stripe from "stripe"
import payload from "payload"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
})

export async function POST(req: Request) {
  try {
    const { productId } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const product = await payload.findByID({
      collection: "products",
      id: productId,
    })

    if (!product || product.type !== "session") {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.title,
              description: product.shortDescription,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: String(product.id),
        productTitle: product.title,
        productType: product.type,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/mentorship/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/${product.slug}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe Error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}