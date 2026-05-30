"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Building2, BookOpen } from "lucide-react";

const tiers = [
  {
    icon: Users,
    title: "Personal Development & Capacity Building",
    description: "Unlock your potential through structured personal growth frameworks, purpose clarity sessions, and dominion capacity training.",
    link: "/services",
  },
  {
    icon: Building2,
    title: "Leadership & Organizational Consulting",
    description: "Transform your organization with strategic leadership development, institutional structuring, and value-based governance systems.",
    link: "/services",
  },
  {
    icon: BookOpen,
    title: "Publishing & Intellectual Product Development",
    description: "Turn your insights into legacy. We help leaders author, publish, and distribute intellectual products that create lasting impact.",
    link: "/services",
  },
];

const ServiceTiers = () => (
  <section className="py-24 bg-muted/50">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">What We Do</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mt-3">
          Three Pillars of Transformation
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <tier.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-4">{tier.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tier.description}</p>
              <Link
                href={tier.link}
                className="inline-block mt-6 text-primary text-sm font-semibold uppercase tracking-wider hover:text-accent transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceTiers;
