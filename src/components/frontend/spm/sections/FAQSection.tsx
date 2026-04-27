import { FAQ_ITEMS } from '@/components/frontend/spm/data/constants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AnimatedSection from './AnimatedSection'

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding section-light overflow-hidden scroll-mt-20">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            Questions
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-sm px-6 data-[state=open]:border-secondary/40 data-[state=open]:shadow-md transition-all duration-300 bg-card"
              >
                <AccordionTrigger className="font-body font-semibold text-foreground text-left hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default FAQSection
