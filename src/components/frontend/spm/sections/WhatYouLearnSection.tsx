import { LEARN_ITEMS } from '@/components/frontend/spm/data/constants'
import { FiArrowRight } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'

const WhatYouLearnSection = () => {
  return (
    <section id="curriculum" className="section-padding section-light overflow-hidden scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            Curriculum
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
            What You Will Learn
          </h2>
          <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-4 text-lg">
            Gain clarity on how to reposition yourself strategically across your career, business,
            and leadership journey.
          </p>
          <div className="w-16 h-1 bg-secondary mx-auto mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {LEARN_ITEMS.map((item, i) => (
            <AnimatedSection key={i} delay={0.08 * i}>
              <div className="flex gap-5 p-6 border border-border rounded-sm hover:border-secondary/40 hover:shadow-lg transition-all duration-300 bg-card h-full group">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-sm bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-all duration-300">
                    <FiArrowRight className="w-4 h-4 text-secondary group-hover:text-secondary-foreground transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-2">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatYouLearnSection
