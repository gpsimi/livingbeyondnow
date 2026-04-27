import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'

const AboutVision = () => {
  return (
    <section className="py-20 md:py-28 bg-navy text-center">
      <div className="container-narrow mx-auto px-4 md:px-8 max-w-3xl">
        <FadeIn>
          <p className="section-label">Our Vision</p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-8">
            WHERE WE ARE GOING
          </h2>
          <p className="font-body text-primary-foreground/70 text-lg leading-relaxed">
            To be the world&apos;s most trusted institution for leadership development — producing
            leaders who are visionary, ethically grounded, and globally positioned.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export default AboutVision
