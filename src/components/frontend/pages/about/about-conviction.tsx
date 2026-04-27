import FadeIn from "@/components/frontend/FadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { AboutConvictions } from "@/constants";

const AboutConviction= () => {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container-narrow mx-auto px-4 md:px-8 max-w-3xl">
        <FadeIn>
          <h2 className="heading-lg text-center mb-12">THE CONVICTIONS THAT DRIVE US</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {AboutConvictions.map((c, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-l-4 border-gold bg-background rounded-xl px-6 border-b-0">
                <AccordionTrigger className="font-heading text-base text-navy hover:no-underline py-5">
                  {i + 1}. {c.title}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-5">
                  {c.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/services" className="btn-gold">Begin Your Development Journey →</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default AboutConviction