import { BONUS_ITEMS } from '@/components/frontend/spm/data/constants'
import { RegistrationModal } from '@/components/frontend/spm/components/RegistrationModal'
import { FiGift, FiStar } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'

const BonusSection = () => {
  return (
    <section className="section-padding section-dark overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Added Value
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-4">
            Bonus Offers
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-12" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {BONUS_ITEMS.map((item, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div
                className={`border rounded-sm p-8 text-left flex gap-4 items-start transition-all duration-300 hover:-translate-y-1 ${
                  item.highlight
                    ? 'border-gold/50 bg-gold/10 hover:border-gold hover:shadow-[0_0_20px_hsl(var(--gold)/0.15)]'
                    : 'border-primary-foreground/15 bg-primary-foreground/5 hover:border-primary-foreground/30'
                }`}
              >
                {item.highlight ? (
                  <FiStar className="w-6 h-6 shrink-0 mt-0.5 text-gold" />
                ) : (
                  <FiGift className="w-6 h-6 shrink-0 mt-0.5 text-secondary" />
                )}
                <p
                  className={`font-body font-medium ${item.highlight ? 'text-gold' : 'text-primary-foreground'}`}
                >
                  {item.title}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <RegistrationModal>
            <button className="group relative inline-flex items-center gap-3 bg-secondary text-secondary-foreground font-body font-bold px-10 py-4 rounded-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_hsl(212,100%,46%,0.3)]">
              <span className="relative z-10">Register Now - Get Your Ticket</span>
              <div className="absolute inset-0 bg-linear-to-r from-secondary to-[hsl(195,100%,50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </RegistrationModal>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default BonusSection
