import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import { missions } from '@/constants'

const AboutMission = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <FadeIn>
            <p className="section-label">Our Mission</p>
            <h2 className="heading-lg">WHAT DRIVES US</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <ul className="space-y-4">
              {missions.map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <span className="text-gold font-heading text-lg mt-0.5">—</span>
                  <span className="font-body text-base text-foreground/80">{m}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default AboutMission
