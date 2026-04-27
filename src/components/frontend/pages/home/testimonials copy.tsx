import FadeIn from "@/components/frontend/FadeIn";
import { testimonials } from "@/constants";


const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-surface">
    <div className="container-narrow mx-auto px-4 ">
      <FadeIn>
        <h2 className="heading-lg text-center mb-12">WHAT LEADERS SAY</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {testimonials.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.15}>
            <div className={`rounded-2xl p-8 ${t.featured ? "bg-accent-blue text-primary-foreground" : "bg-background shadow-navy"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-sm ${t.featured ? "bg-primary-foreground/20 text-primary-foreground" : "bg-surface text-navy"}`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className={`font-body font-semibold text-sm ${t.featured ? "text-primary-foreground" : "text-navy"}`}>{t.name}</p>
                  <p className={`font-body text-xs ${t.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{t.location}</p>
                </div>
              </div>
              <p className={`font-body text-sm leading-relaxed ${t.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                {t.text}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { num: "500+", label: "Leaders Developed" },
          { num: "10+", label: "Years of Impact" },
          { num: "20+", label: "Organisations Served" },
          { num: "6", label: "Continents Reached" },
        ].map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1}>
            <div className="text-center">
              <p className="font-heading text-3xl md:text-4xl text-navy">{s.num}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
  )
};

export default Testimonials