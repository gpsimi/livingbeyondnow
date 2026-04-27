import Layout from '@/components/frontend/layout/Layout'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react'

// Define the known events data
const events: Record<
  string,
  {
    title: string
    subtitle: string
    date: string
    location: string
    time: string
    capacity: string
    description: string
    highlights: string[]
    status: 'upcoming' | 'past'
    slug: string
  }
> = {
  'spm-1': {
    slug: 'spm-1',
    title: 'Strategic Positioning Masterclass',
    subtitle: 'SPM 1.0',
    date: 'February 2024',
    location: 'Birmingham, United Kingdom',
    time: '10:00 AM – 5:00 PM',
    capacity: '100 Attendees',
    description:
      'The inaugural Strategic Positioning Masterclass that launched a movement. SPM 1.0 gathered emerging and established leaders from across the UK for a transformative day of frameworks, networks, and conviction-led leadership development.',
    highlights: [
      'Identity-first leadership frameworks',
      'Strategic positioning workshop',
      'Peer leadership roundtables',
      'Live coaching with Coach Ayoola',
      'Exclusive resource pack',
    ],
    status: 'past',
  },
  'spm-2': {
    slug: 'spm-2',
    title: 'Strategic Positioning Masterclass',
    subtitle: 'SPM 2.0',
    date: '25th April, 2026',
    location: 'Luton, United Kingdom',
    time: '10am – 4pm',
    capacity: 'Limited Seats',
    description:
      'SPM 2.0 builds on the foundation of the inaugural masterclass — deeper, more structured, and designed for leaders ready to move from visibility to lasting impact. If SPM 1.0 was the ignition, SPM 2.0 is the engine.',
    highlights: [
      'Advanced leadership architecture frameworks',
      'Executive positioning clinic',
      'Global impact panel',
      'Mentorship speed-rounds',
      'Premium resource toolkit',
    ],
    status: 'upcoming',
  },
}

export function generateStaticParams() {
  return Object.keys(events).map((slug) => ({ slug }))
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = events[slug]

  if (!event) notFound()

  const isPast = event.status === 'past'

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 gradient-navy text-primary-foreground">
        <div className="container-narrow px-4">
          <p className="section-label text-primary-foreground/60 mb-4">{event.subtitle}</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-4 leading-tight">
            {event.title.toUpperCase()}
          </h1>
          <div className="flex flex-wrap gap-6 mt-8 font-body text-sm text-primary-foreground/70">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              {event.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-secondary" />
              {event.capacity}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding-1 bg-background">
        <div className="container-narrow px-4 grid lg:grid-cols-3 gap-12">
          {/* Left: description + highlights */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-heading text-2xl text-navy mb-4">ABOUT THIS EVENT</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-navy mb-6">WHAT TO EXPECT</h2>
              <ul className="space-y-3">
                {event.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-foreground/80">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: CTA card */}
          <div>
            <div
              className={`rounded-2xl p-8 sticky top-28 ${isPast ? 'bg-surface border border-border' : 'bg-navy text-primary-foreground border-2 border-secondary'}`}
            >
              {isPast ? (
                <>
                  <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest bg-muted text-muted-foreground rounded-full px-3 py-1 mb-4">
                    Past Event
                  </span>
                  <h3 className="font-heading text-xl text-navy mb-3">Missed this one?</h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    Don&apos;t worry — the next edition is on the way. Join the waitlist and be first to know.
                  </p>
                  <Link href="/events/spm-2" className="btn-primary w-full text-center block">
                    Learn About SPM 2 →
                  </Link>
                </>
              ) : (
                <>
                  <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest bg-secondary/20 text-secondary rounded-full px-3 py-1 mb-4">
                    Coming Soon
                  </span>
                  <h3 className="font-heading text-xl text-primary-foreground mb-3">
                    Secure Your Seat
                  </h3>
                  <p className="font-body text-sm text-primary-foreground/60 mb-6">
                    Seats are limited. Register your interest and be among the first to be notified.
                  </p>
                  <Link href="/spm-2" className="btn-gold w-full text-center block">
                    Register Interest →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Events */}
      <section className="py-16 bg-surface">
        <div className="container-narrow px-4">
          <h2 className="font-heading text-2xl text-navy mb-8">OTHER EVENTS</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.values(events)
              .filter((e) => e.slug !== slug)
              .map((e) => (
                <Link
                  key={e.slug}
                  href={`/events/${e.slug}`}
                  className="group bg-background rounded-2xl border border-border p-6 hover:border-secondary/50 transition-all duration-300"
                >
                  <span className="font-body text-xs font-semibold text-secondary uppercase tracking-widest">
                    {e.subtitle}
                  </span>
                  <h3 className="font-heading text-lg text-navy mt-2 mb-1">{e.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{e.date}</p>
                  <span className="inline-flex items-center gap-1 font-body text-sm text-secondary mt-4 group-hover:gap-2 transition-all">
                    View Event <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
