import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import Image from 'next/image'
import aboutImg from '@/assets/images/about-img.png'
import { identityCards } from '@/constants'

export default function InstitutionalIdentity() {
  return (
    <section className="container-narrow py-20 md:py-28 bg-background">
      <div className="container mx-auto max-md:px-4">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <FadeIn>
            <p className="section-label">About</p>
            <h2 className="heading-lg">WE ARE NOT A MOTIVATIONAL PLATFORM.</h2>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4">
            {identityCards.map((card, i) => (
              <FadeIn key={card.label} delay={i * 0.1}>
                <div className="bg-surface rounded-2xl p-6 flex flex-col items-start gap-3 hover:-translate-y-1 transition-transform duration-300">
                  <card.icon className="w-6 h-6 text-gold" />
                  <span className="font-heading text-sm text-navy">{card.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <FadeIn direction="left">
            <div className="max-w-md rounded-2xl overflow-hidden group">
              <Image
                src={aboutImg}
                alt="Executive portrait"
                className="w-full aspect-3/4 object-cover group-hover:scale-105 transition-transform duration-700"
                width={800}
                height={1067}
                priority
              />
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <p className="body-text mb-6">
              Prime Counsel is an institution built on conviction. We engineer leadership capacity
              through structured development, mentorship architecture, and identity-first
              frameworks. Our approach is not motivational — it is methodical, strategic, and deeply
              rooted in ethical principles.
            </p>
            <p className="body-text mb-8">
              With over a decade of experience guiding leaders across corporate, academic, and
              faith-based environments, we&apos;ve built a model that produces lasting
              transformation — not temporary inspiration.
            </p>
            <Link href="/about" className="btn-primary">
              More About Prime Counsel →
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
