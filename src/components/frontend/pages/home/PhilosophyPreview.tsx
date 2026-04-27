import FadeIn from '@/components/frontend/FadeIn'
import AnimatedSection from '@/components/frontend/AnimatedSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { convictions } from '@/constants'



const PhilosophyPreview = () => (
  <section className="section-padding-1 bg-primary">
    <div className="container-narrow">
      <FadeIn>
        <p className="section-label">Philosophy</p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-3">
          TRANSFORMATION IS ENGINEERED.
        </h2>
        <p className="font-body text-white text-lg max-w-2xl mb-16">
          Our philosophical convictions inform every programme, framework, and conversation.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {convictions.map((c, i) => (
          <AnimatedSection key={c.num} delay={i * 0.1}>
            <div className="border-l-2 border-gold pl-6 py-2">
              <span className="font-body text-xs text-gold font-semibold tracking-widest">
                {c.num}
              </span>
              <h3 className="font-heading text-lg text-white mt-2 mb-3">{c.title}</h3>
              <p className="font-body text-sm text-white leading-relaxed">{c.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <Button variant="gold" size="lg" asChild>
          <Link href="/about">Explore Our Philosophy</Link>
        </Button>
      </FadeIn>
    </div>
  </section>
)

export default PhilosophyPreview
