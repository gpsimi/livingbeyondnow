import FadeIn from '@/components/frontend/FadeIn'
import { statistics } from '@/constants'

const Statistics = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container-narrow mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl text-secondary">{s.num}</p>
                <p className="font-body text-sm text-primary-foreground/60 mt-1">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics