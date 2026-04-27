import { serviceBlocks } from '@/constants'
import FadeIn from '@/components/frontend/FadeIn'
import Link from 'next/link'
import Image from 'next/image'

const ServiceBody = () => {
  return (
    <section className="flex flex-col">
      {serviceBlocks.map((s, i) => (
        <section
          key={s.title}
          className={`py-20 md:py-24 ${i % 2 === 0 ? 'bg-background' : 'bg-surface'}`}
        >
          <div className="container-narrow mx-auto px-4 md:px-8">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}
            >
              <FadeIn
                direction={i % 2 === 0 ? 'left' : 'right'}
                className={i % 2 !== 0 ? 'lg:col-start-2' : ''}
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  width={800}
                  height={600}
                  className="w-full rounded-2xl aspect-4/3 object-cover"
                />
              </FadeIn>
              <FadeIn direction={i % 2 === 0 ? 'right' : 'left'}>
                <h2 className="heading-md mb-4">{s.title.toUpperCase()}</h2>
                <p className="body-text mb-6">{s.desc}</p>
                <div className="space-y-3 mb-6">
                  <p className="font-body text-sm">
                    <span className="font-semibold text-navy">Outcomes:</span> {s.outcomes}
                  </p>
                  <p className="font-body text-sm">
                    <span className="font-semibold text-navy">Ideal For:</span> {s.idealFor}
                  </p>
                </div>
                <Link href="/contact" className="btn-primary">
                  {s.cta}
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}
    </section>
  )
}

export default ServiceBody
