import { cn } from "@/utilities/ui"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-surface text-foreground",
        "py-16 sm:py-24 px-0 overflow-hidden",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-12">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <p className="section-label">Testimonials</p>
          <h2 className="font-heading max-w-[720px] text-3xl sm:text-5xl text-navy leading-tight">
            {title}
          </h2>
          <p className="font-body max-w-[600px] text-base sm:text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Marquee */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1.25rem] gap-(--gap) flex-row [--duration:50s]">
            <div className="flex shrink-0 justify-around gap-(--gap) animate-marquee flex-row group-hover:paused">
              {[...Array(4)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />
                ))
              )}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-linear-to-r from-surface sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-linear-to-l from-surface sm:block" />
        </div>
      </div>
    </section>
  )
}
