import Stripe from "stripe"
import { redirect } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { BookingSuccessClient } from "@/components/frontend/shop/BookingSuccessClient"
import type { Product } from "@/payload-types"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
})

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const sessionId = resolvedSearchParams.session_id as string | undefined

  if (!sessionId) redirect("/shop")

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== "paid") {
      redirect("/shop")
    }
  } catch (error) {
    console.error("Stripe session retrieval failed:", error)
    redirect("/shop")
  }

  // Check if checkout was from Cart or legacy Direct Checkout
  const isCart = session.metadata?.isCart === 'true'
  const primarySessionId = session.metadata?.primarySessionId
  const legacyProductId = session.metadata?.productId
  const _legacyProductType = session.metadata?.productType

  const payload = await getPayload({ config })
  let product: Product | null = null

  if (isCart && primarySessionId) {
    // Cart checkout included a session, fetch that session for the booking UI
    product = await payload.findByID({
      collection: "products",
      id: primarySessionId,
    }) as Product
  } else if (!isCart && legacyProductId) {
    // Legacy single-item checkout
    product = await payload.findByID({
      collection: "products",
      id: legacyProductId,
    }) as Product
  }

  // Mentorship Flow (Luxury Standard - using the new BookingSuccessClient)
  if (product && product.type === "session") {
    // Using the BookingSuccessClient for animated luxury UI
    return <BookingSuccessClient product={product} sessionId={sessionId} />
  }

  // Book / Digital Flow (Standard Cart)
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center pt-20 pb-24">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-8 h-8 text-gold" />
        </div>

        <h1 className="font-heading text-3xl md:text-4xl text-navy uppercase tracking-widest mb-6">
          Order Confirmed
        </h1>

        <p className="font-body text-navy/70 text-lg max-w-md mx-auto leading-relaxed mb-12">
          Your order has been successfully processed. A confirmation email
          has been sent to you with your receipt and next steps.
        </p>

        <Link
          href="/shop"
          className="btn-navy inline-flex items-center gap-3 py-3 px-8 text-xs font-bold uppercase tracking-widest"
        >
          Return to Shop
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-16">
          Ref: <span className="font-mono font-normal ml-1">{sessionId}</span>
        </p>
      </div>
    </div>
  )
}