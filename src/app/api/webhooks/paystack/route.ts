import { NextResponse } from "next/server"
import crypto from "crypto"

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-paystack-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY || ''
    
    // Paystack signature verification: HMAC SHA512 of the raw body using secret key
    const hash = crypto
      .createHmac("sha512", paystackSecret)
      .update(body)
      .digest("hex")

    if (hash !== signature) {
      console.error("Paystack webhook signature verification failed.")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === "charge.success") {
      const data = event.data
      const metadata = data.metadata
      const email = data.customer?.email

      console.log(`Payment confirmed via Paystack for email: ${email}`, metadata)

      // TODO: Perform post-payment actions here:
      // - Fulfill product orders (e.g. send download links for digital products)
      // - Confirm mentorship bookings
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Paystack Webhook Error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
