import React from 'react'
import FadeIn from "@/components/frontend/FadeIn"
const ContactHero = () => {
  return (
    <section className="pt-16 pb-20 md:pt-16 md:pb-20 gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24 pb-16 max-w-2xl">
        <FadeIn>
          <p className="page-label">Contact Us</p>
        </FadeIn>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[60px] text-primary-foreground leading-[1.05]">
            LET&apos;S BUILD SOMETHING SIGNIFICANT.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-body text-primary-foreground/70 text-[17px] leading-relaxed">
            Whether you&apos;re an individual, an organisation, or an institution — we&apos;d welcome the conversation.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export default ContactHero