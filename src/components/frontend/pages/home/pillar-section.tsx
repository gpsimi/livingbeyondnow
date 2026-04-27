import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import { pillars } from '@/constants'

const PillarSection = () => {
  return (
    <section className=" py-20 md:py-28 bg-surface">
      <div className="container-narrow mx-auto max-md:px-4">
      <div className="grid lg:grid-cols-3 gap-12">
        <div>
          <FadeIn>
            <p className="section-label">Our Model</p>
            <h2 className="heading-lg mb-8">OUR LEADERSHIP ARCHITECTURE</h2>
            <Link href="/contact" className="btn-gold">Schedule a Free Consultation</Link>
          </FadeIn>
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="card-prime bg-background">
                <h3 className="font-heading text-lg text-navy mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.5}>
            <Link href="/services" className="card-prime bg-gold flex items-center justify-center">
              <span className="font-heading text-lg text-gold-foreground">VIEW ALL →</span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
  )
}

export default PillarSection