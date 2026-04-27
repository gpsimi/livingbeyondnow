import FadeIn from "@/components/frontend/FadeIn";
import Image from "next/image";

const AboutBody = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <FadeIn direction="left">
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80"
              alt="Executive discussion"
              className="w-full rounded-2xl"
              width={600}
              height={900}
            />
          </FadeIn>
          <FadeIn direction="right">
            <p className="body-text mb-6">
              Prime Counsel was founded on a simple but radical conviction: that leadership should
              never be left to chance. In a world saturated with motivational content and
              surface-level advice, we chose a different path — one rooted in structure, depth, and
              institutional rigour.
            </p>
            <blockquote className="border-l-4 border-gold pl-6 my-8">
              <p className="font-body text-xl text-accent-blue italic leading-relaxed">
                &quot;We don&apos;t inspire leaders. We engineer them.&quot;
              </p>
            </blockquote>
            <p className="body-text mb-6">
              Our model draws from executive development, academic leadership theory, and
              faith-informed ethics to produce leaders who are not only effective — but deeply
              grounded. Every programme, session, and framework we deliver is designed with
              intentionality and precision.
            </p>
            <p className="body-text">
              From boardrooms in London to youth summits across Africa, Prime Counsel has spent over
              a decade shaping leaders who go on to transform their industries, communities, and
              nations.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default AboutBody
