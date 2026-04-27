import { TESTIMONIALS } from '@/components/frontend/spm/data/constants'
import { FiMessageCircle } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'
import ImageSlider from './image-slider'

const HighlightsSection = () => {
  return (
    <section id="highlight" className="section-padding section-dark overflow-hidden">
      <div className="container mx-auto max-w-5xl text-center">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Past Event
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-3">
            Highlights from SPM 1.0
          </h2>
          <p className="font-body text-primary-foreground/50 mb-4 text-base">
            Birmingham — December 2025
          </p>
          <div className="w-16 h-1 bg-secondary mx-auto mb-14" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="font-body text-primary-foreground/70 max-w-3xl mx-auto mb-14 leading-relaxed text-base md:text-lg">
            Last year in Birmingham, over 40 ambitious individuals gathered for
            SPM 1.0. Many of them have since begun applying the principles of
            leadership, ownership, and control in their careers and businesses.
            {/* At SPM 1.0, professionals and emerging leaders gathered for a day of clarity, structure,
            and strategic thinking. Participants engaged in practical value-mapping exercises, career
            positioning frameworks, and meaningful conversations around leverage and advancement. */}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((item, i) => (
            <AnimatedSection key={i} delay={0.15 + i * 0.1}>
              <div className="border border-primary-foreground/10 rounded-sm p-8 bg-primary-foreground/5 hover:border-secondary/30 transition-all duration-300 h-full flex flex-col items-center justify-center">
                <FiMessageCircle className="w-8 h-8 text-secondary mb-5" />
                <p className="font-body text-primary-foreground/90 italic text-lg leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="font-body italic text-lg leading-relaxed font-bold mt-2 text-secondary">
                  {item.name}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="my-14">
          <AnimatedSection delay={0.5}>
            <ImageSlider />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.5}>
          <p className="font-heading text-xl md:text-2xl text-gold ">
            SPM 2.0 Builds on That Foundation and Goes Deeper.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default HighlightsSection
