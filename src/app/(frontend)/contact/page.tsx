import AnimatedSection from '@/components/frontend/AnimatedSection'
import Layout from '@/components/frontend/layout/Layout'
import { MdMail } from 'react-icons/md'
import { FaInstagram, FaYoutube, FaTiktok, FaPhoneAlt, FaMapPin } from 'react-icons/fa'
import { ContactHero } from '@/components/frontend/pages/contact'
import { CONTACT_INFO } from '@/constants'
import Link from 'next/link'

export default function Contact() {
  return (
    <Layout>

      <ContactHero />
      

      <section className="section-padding-1 bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="heading-display text-2xl md:text-3xl text-foreground mb-8">
                GET IN TOUCH
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MdMail className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <Link
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="font-body text-foreground hover:text-secondary transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <FaPhoneAlt  className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <Link
                      href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-body text-foreground hover:text-secondary transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <FaMapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="font-body text-foreground">United Kingdom</p>
                  </div>
                </div>

                {/* Socials */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-4">
                    Connect With Us
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href={CONTACT_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-4 h-4 text-secondary group-hover:text-primary-foreground transition-colors" />
                    </Link>
                    <Link
                      href={CONTACT_INFO.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="YouTube"
                    >
                      <FaYoutube className="w-4 h-4 text-secondary group-hover:text-primary-foreground transition-colors" />
                    </Link>
                    <Link
                      href={CONTACT_INFO.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="TikTok"
                    >
                      <FaTiktok className="w-4 h-4 text-secondary group-hover:text-primary-foreground transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <form className="flex flex-col gap-6">
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-border bg-background rounded-md px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-border bg-background rounded-md px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Services
                  </label>
                  <select
                    className="w-full border border-border bg-background rounded-md px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Vision Clarity Call">Vision Clarity Call</option>
                    <option value="One-on-one Mentorship">One-on-one Mentorship</option>
                    <option value="Prime Emerging Leaders Cohort 2026">Prime Emerging Leaders Cohort 2026</option>
                    <option value="Prime Builders Cohort 2026">Prime Builders Cohort 2026</option>
                    <option value="ASKPRIME™">ASKPRIME™</option>
                    <option value="SEEKCOUNSEL™">SEEKCOUNSEL™</option>
                    <option value="Talks & Keynotes">Talks & Keynotes</option>
                    <option value="Coaching & Mentorship">Coaching & Mentorship</option>
                    <option value="Workshop & Training">Workshop & Training</option>
                    <option value="Organizational Advisory">Organizational Advisory</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border border-border bg-background rounded-md px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="font-body font-semibold tracking-wide uppercase text-sm bg-secondary text-secondary-foreground px-8 py-4 rounded-md hover:bg-secondary transition-colors"
                >
                  Send Message
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  )
}
