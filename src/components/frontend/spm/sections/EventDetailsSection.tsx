import { EVENT_DETAILS } from '@/components/frontend/spm/data/constants'
import { RegistrationModal } from '@/components/frontend/spm/components/RegistrationModal'
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'

const EventDetailsSection = () => {
  return (
    <section
      id="event-details"
      className="section-padding section-light overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            Logistics
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
            Event Details
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="bg-card border border-border rounded-sm shadow-xl overflow-hidden">
            <div className="bg-primary p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-secondary/10 to-transparent" />
              <p className="font-heading text-2xl md:text-3xl text-primary-foreground text-center relative">
                SPM 2.0 — Luton 2026
              </p>
            </div>
            <div className="p-8 md:p-10 space-y-8">
              {[
                { Icon: FiCalendar, label: 'Date', value: EVENT_DETAILS.date },
                { Icon: FiClock, label: 'Time', value: EVENT_DETAILS.time },
                {
                  Icon: FiMapPin,
                  label: 'Venue',
                  value: EVENT_DETAILS.venue,
                  sub: EVENT_DETAILS.address,
                },
              ].map(({ Icon, label, value, sub }, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-sm bg-secondary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <p className="font-body text-foreground font-semibold text-lg">{value}</p>
                    {sub && <p className="font-body text-muted-foreground text-sm mt-0.5">{sub}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-8 pb-8 md:px-10 md:pb-10 text-center">
              <RegistrationModal>
                <button className="inline-block bg-secondary text-secondary-foreground font-body font-bold px-10 py-4 rounded-sm tracking-wider uppercase hover:brightness-110 transition-all duration-300 w-full sm:w-auto">
                  Register Now
                </button>
              </RegistrationModal>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default EventDetailsSection
