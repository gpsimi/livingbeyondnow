import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import coachImg from '@/assets/images/spm/coach-ayoola.jpg'

const CoachSection = () => {
  return (
    <section id="coach" className="section-padding section-muted overflow-hidden scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            Your Facilitator
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
            Meet Coach Ayoola
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-14 items-start">
          <AnimatedSection className="md:col-span-2">
            <div className="rounded-sm overflow-hidden shadow-2xl relative group">
              <Image
                src={coachImg}
                alt="Coach Ayoola Orimoloye"
                className="w-full aspect-3/4 object-cover group-hover:scale-105 transition-transform duration-700"
                width={800}
                height={1067}
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
            </div>
          </AnimatedSection>

          <AnimatedSection className="md:col-span-3" delay={0.15}>
            <div className="space-y-6">
              <div>
                <p className="font-body text-secondary font-semibold text-xs uppercase tracking-[0.2em] mb-3">
                  Licensed Personal Development Coach & Leadership Strategist
                </p>
                <p className="font-heading text-3xl md:text-4xl text-foreground">
                  Ayoola Orimoloye
                </p>
                <p className="font-body text-muted-foreground text-sm mt-1">
                  CEO, Prime Counsel Limited
                </p>
              </div>

              <div className="w-10 h-0.5 bg-secondary" />

              <p className="font-body text-muted-foreground leading-relaxed">
                Coach Ayoola understands what it means to be ambitious yet under-positioned. He has
                lived it, studied it, broken through — and has spent years helping others thrive and
                rewrite their narratives.
              </p>

              <p className="font-body text-muted-foreground leading-relaxed">
                With over 6 years of consulting experience working with global institutions
                including <span className="text-foreground font-semibold">UNICEF</span>,{' '}
                <span className="text-foreground font-semibold">the United Nations</span>,{' '}
                <span className="text-foreground font-semibold">Aleto Foundation</span>, and{' '}
                <span className="text-foreground font-semibold">BT Group</span>, and several years
                of mentoring emerging leaders across Africa and the UK, he has developed practical
                frameworks that connect raw potential to market value.
              </p>

              <p className="font-body text-muted-foreground leading-relaxed">
                As a Licensed Personal Development Coach and Leadership Strategist, he equips
                professionals with the clarity, systems, and mindset required to transition from
                survival thinking to structured thriving.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {['UNICEF', 'United Nations', 'Aleto Foundation', 'BT Group'].map((org) => (
                  <span
                    key={org}
                    className="font-body text-xs uppercase tracking-wider border border-secondary/30 bg-secondary/5 text-secondary px-4 py-2 rounded-sm font-semibold"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default CoachSection
