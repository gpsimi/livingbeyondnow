import { WHY_ITEMS } from "@/components/frontend/spm/data/constants";
import AnimatedSection from "./AnimatedSection";

const WhySPMSection = () => {
  return (
    <section
      id="why-spm"
      className="section-padding section-muted overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection>
          {/* <p className="font-body text-secondary text-sm font-semibold uppercase tracking-[0.2em] text-center mb-4">
            The Difference
          </p> */}
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
            Why SPM 2.0?
          </h2>
          <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-4 text-lg">
            Effort without positioning keeps you active but drained. SPM 2.0
            changes that.
          </p>
          <div className="w-16 h-1 bg-secondary mx-auto mb-16" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className="bg-card border border-border rounded-sm p-8 h-full hover:border-secondary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-sm bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySPMSection;
