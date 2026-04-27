import { CONTACT_INFO } from '@/components/frontend/spm/data/constants'
import { RegistrationModal } from '@/components/frontend/spm/components/RegistrationModal'
import { FiMail, FiPhone } from 'react-icons/fi'
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import AnimatedSection from './AnimatedSection'

const ContactSection = () => {
  return (
    <section className="section-padding section-muted overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Take Action
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-12">
            Get Your Ticket
          </h2>
          <AnimatedSection delay={0.1}>
            <RegistrationModal>
              <button className="group relative inline-flex items-center gap-3 bg-secondary text-secondary-foreground font-body font-bold text-lg px-14 py-5 rounded-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_hsl(212,100%,46%,0.3)] mb-12">
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-linear-to-r from-secondary to-[hsl(195,100%,50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </RegistrationModal>
          </AnimatedSection>
          <div className="w-16 h-1 bg-secondary mx-auto mb-10" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="font-body text-muted-foreground text-lg mb-4">
            For enquiries or group bookings, reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center justify-center gap-3 font-body text-foreground hover:text-secondary transition-colors"
            >
              <FiMail className="w-5 h-5" />
              {CONTACT_INFO.email}
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center justify-center gap-3 font-body text-foreground hover:text-secondary transition-colors"
            >
              <FiPhone className="w-5 h-5" />
              {CONTACT_INFO.phone}
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex justify-center gap-4">
            {[
              {
                href: CONTACT_INFO.instagram,
                Icon: FaInstagram,
                label: 'Instagram',
              },
              { href: CONTACT_INFO.youtube, Icon: FaYoutube, label: 'YouTube' },
              { href: CONTACT_INFO.tiktok, Icon: FaTiktok, label: 'TikTok' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-secondary hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default ContactSection
