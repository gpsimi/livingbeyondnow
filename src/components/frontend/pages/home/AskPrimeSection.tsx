import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'

const AskPrimeSection = () => (
  <section className="py-20 md:py-28 bg-accent-blue">
    <div className="container mx-auto px-4 md:px-8 text-center">
      <FadeIn>
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-primary-foreground/70">
          Micro-Consults
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-12">
          Precision Sessions for Immediate Clarity
        </h2>
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <FadeIn delay={0.1}>
          <div className="bg-background rounded-2xl p-8 text-left">
            <div className="flex items-center gap-2 justify-between mb-3">
              <h3 className="font-heading text-2xl text-navy ">ASKPRIME™</h3>
              <p className="font-body text-sm text-primary-foreground/60 bg-gold px-2 py-1 rounded-full">
                30 Mins
              </p>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-2">
              Laser-focused clarity session addressing one core challenge with actionable direction.
            </p>

            <ul className="mb-6 grow">
              <li className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                Quick decisions
              </li>
              <li className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                Confidence recalibration
              </li>
              <li className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                Tactical next steps
              </li>
            </ul>

            <Link href="/contact" className="btn-primary text-sm">
              Book AskPrime™ →
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="bg-navy rounded-2xl p-8 text-left border-2 border-gold">
            <div className="flex items-center gap-2 justify-between mb-3">
              <h3 className="font-heading text-2xl text-primary-foreground ">SEEKCOUNSEL™</h3>
              <p className="font-body text-sm text-primary-foreground/60 bg-gold px-2 py-1 rounded-full">
                60 Mins
              </p>
            </div>
            <p className="font-body text-sm text-primary-foreground/60 mb-2">
              Strategy intensive with personalised roadmap development.
            </p>

            <ul className="mb-6 grow">
              <li className="flex items-center gap-2 font-body text-sm text-navy-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                Vision definition
              </li>
              <li className="flex items-center gap-2 font-body text-sm text-navy-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                Career repositioning
              </li>
              <li className="flex items-center gap-2 font-body text-sm text-navy-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                Breaking growth plateaus
              </li>
            </ul>

            <Link href="/contact" className="btn-gold text-sm">
              Book SeekCounsel™ →
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>

  // <section className="section-padding-1 gradient-blue-accent text-strategic-blue-foreground">
  //   <div className="container-narrow">
  //     <AnimatedSection>
  //       <h2 className="heading-display text-3xl md:text-5xl mb-4">
  //         PRECISION GUIDANCE. IMMEDIATE CLARITY.
  //       </h2>
  //       <p className="font-body text-strategic-blue-foreground/80 text-lg max-w-2xl mb-16">
  //         Access structured counsel for your leadership challenges through our
  //         premium consultation offerings.
  //       </p>
  //     </AnimatedSection>

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //       <AnimatedSection delay={0.1}>
  //         <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 p-8 rounded-lg">
  //           <div className="flex items-center gap-3 mb-4">
  //             <Clock className="w-5 h-5" />
  //             <span className="font-body text-sm font-semibold tracking-wider uppercase">
  //               30 Minutes
  //             </span>
  //           </div>
  //           <h3 className="font-heading text-2xl mb-3">ASKPRIME™</h3>
  //           <p className="font-body text-sm text-strategic-blue-foreground/80 leading-relaxed mb-6">
  //             A focused, high-impact session designed to address a specific
  //             leadership challenge, decision, or strategic question with
  //             precision.
  //           </p>
  //           <Button variant="hero-outline" size="lg" asChild>
  //             <Link href="/contact">Book Session</Link>
  //           </Button>
  //         </div>
  //       </AnimatedSection>

  //       <AnimatedSection delay={0.2}>
  //         <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 p-8 rounded-lg">
  //           <div className="flex items-center gap-3 mb-4">
  //             <Clock className="w-5 h-5" />
  //             <span className="font-body text-sm font-semibold tracking-wider uppercase">
  //               60 Minutes
  //             </span>
  //           </div>
  //           <h3 className="font-heading text-2xl mb-3">SEEKCOUNSEL™</h3>
  //           <p className="font-body text-sm text-strategic-blue-foreground/80 leading-relaxed mb-6">
  //             A deep-dive strategic consultation exploring leadership
  //             positioning, personal development architecture, and long-term
  //             vision alignment.
  //           </p>
  //           <Button variant="hero-outline" size="lg" asChild>
  //             <Link href="/contact">Book Deep Dive</Link>
  //           </Button>
  //         </div>
  //       </AnimatedSection>
  //     </div>
  //   </div>
  // </section>
)

export default AskPrimeSection
