'use client'

import { AUDIENCE_ITEMS, NOTAUDIENCE_ITEMS } from '@/components/frontend/spm/data/constants'
import { FiCheck, FiX } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'

const WhoIsThisForSection = () => {
  return (
    <section className="section-padding section-muted overflow-hidden">
      <div className="container mx-auto max-w-6xl space-y-14">
        {/* Heading */}
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
            Is This <span className="text-secondary">Right for You?</span>
          </h2>
          <p className="font-body text-muted-foreground text-center text-lg max-w-2xl mx-auto">
            If you are working hard but feel under-positioned and are ready to move from survival to
            structured thriving, SPM 2.0 is for you.
          </p>
        </AnimatedSection>

        {/* Two-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* IS For You */}
          <AnimatedSection delay={0.1}>
            <div className="h-full rounded-2xl border border-secondary/30 bg-card p-8 flex flex-col gap-6">
              {/* Card header */}
              <div className="flex items-center gap-3">
                <FiCheck className="w-5 h-5 text-secondary shrink-0" />
                <h3 className="font-heading text-xl md:text-2xl text-secondary font-bold">
                  This IS for you if...
                </h3>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-4">
                {AUDIENCE_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheck className="w-4 h-4 text-secondary mt-1 shrink-0" />
                    <p className="font-body text-foreground/80 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* NOT For You */}
          <AnimatedSection delay={0.2}>
            <div className="h-full rounded-2xl border border-border bg-card/60 p-8 flex flex-col gap-6">
              {/* Card header */}
              <div className="flex items-center gap-3">
                <FiX className="w-5 h-5 text-muted-foreground shrink-0" />
                <h3 className="font-heading text-xl md:text-2xl text-foreground/70 font-bold">
                  This is NOT for you if...
                </h3>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-4">
                {NOTAUDIENCE_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiX className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                    <p className="font-body text-foreground/50 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Footer note */}
        <AnimatedSection delay={0.4}>
          <p className="font-body text-center text-muted-foreground text-sm italic">
            This is not for spectators. It is for individuals ready to reposition.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default WhoIsThisForSection
