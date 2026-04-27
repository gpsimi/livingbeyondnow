import Image from 'next/image'
import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'

const FinalCTA = () => {
  return (
    <section className="bg-navy">
      <div className="grid lg:grid-cols-2">
        <div className="h-64 lg:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
            alt="Diverse young professionals"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center p-8 md:p-16">
          <div>
            <FadeIn>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-[1.1] mb-6">
                THE NEXT GENERATION OF LEADERS WILL NOT BE ACCIDENTAL.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-body text-primary-foreground/60 mb-8 leading-relaxed">
                Whether you&apos;re stepping into leadership for the first time or refining decades
                of experience, Prime Counsel provides the architecture for your next level.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link href="/contact" className="btn-gold">
                Begin Your Journey
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FinalCTA
