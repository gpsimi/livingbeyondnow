import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import { services } from '@/constants'
import { Button } from '@/components/ui/button'

const ServicesOverview = () => (
  <section className="py-20 md:py-28 bg-muted">
    <div className="container-narrow mx-auto max-md:px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div className="max-w-2xl">
          <p className="section-label">Our Services</p>
          <h2 className="heading-display text-3xl md:text-5xl text-navy">
            Strategic Development for Leaders
          </h2>
          <p className="font-body text-base text-muted-foreground mt-4">
            We deliver structured leadership development experiences designed 
            to move individuals and organisations from potential to positioned 
            influence.
          </p>
        </div>
        <div className="hidden md:block">
          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 mt-10">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="card-prime flex flex-col">
                <s.icon className="w-6 h-6 text-accent mb-4" />
                <p className="section-label">{s.tag}</p>
                <h3 className="font-heading text-lg text-navy mb-2">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 grow">{s.desc}</p>

                {s.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[11px] font-semibold text-gold bg-gold/5 border border-gold/20 px-3 py-1 rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {s.title === 'Coaching & Mentorship' ? (
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button
                      asChild
                      className="w-full bg-transparent hover:bg-secondary/10 border border-secondary shadow-none uppercase text-accent-blue font-body text-[10px] sm:text-xs h-10 px-2"
                    >
                      <Link href="https://selfany.com/K5VUJ1B4IJ" target='_blank'>One-to-One Coaching</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-transparent hover:bg-secondary/10 border border-secondary shadow-none uppercase text-accent-blue font-body text-[10px] sm:text-xs h-10 px-2"
                    >
                      <Link href="https://selfany.com/DX03KFT8RC" target='_blank'>Vision Clarity Intensive</Link>
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-transparent hover:bg-secondary/10 border border-secondary shadow-none uppercase text-accent-blue font-body text-[10px] sm:text-sm h-10 mt-auto"
                  >
                    <Link href={s.link}>{s.cta}</Link>
                  </Button>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="block md:hidden mt-8">
        <FadeIn>
          <Link href="/services" className="btn-primary w-full">
            View All Services
          </Link>
        </FadeIn>
      </div>
    </div>
  </section>
)

export default ServicesOverview
