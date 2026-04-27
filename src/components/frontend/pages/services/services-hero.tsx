import FadeIn from "@/components/frontend/FadeIn";

const ServicesHero = () => {
  return (
    <section className="pt-16 pb-20 md:pt-16 md:pb-20 gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24 pb-16 max-w-2xl">
        <FadeIn>
          <p className="page-label">Our Services</p>
        </FadeIn>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[60px] text-primary-foreground leading-[1.05]">
            INSTITUTIONAL SERVICES FOR SERIOUS LEADERS
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-body text-primary-foreground/70 text-[17px] leading-relaxed">
            Precision-engineered development programmes for 
            leaders who demand transformational results.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export default ServicesHero