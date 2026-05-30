"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { tiers } from "@/constants";
import { CheckCircle } from "lucide-react";

const ServicesTier = () => {
  return (
    <div>{tiers.map((tier, i) => (
      <section key={tier.title} className={`py-24 ${i % 2 === 0 ? "bg-background" : "bg-muted/50"}`}>
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <tier.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-accent text-xs font-heading uppercase tracking-[0.2em] font-semibold">Tier {i + 1}</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">{tier.title}</h2>
              </div>
            </div>
            <p className="font-heading text-lg text-primary italic mb-4">{tier.tagline}</p>
            <p className="text-muted-foreground leading-relaxed mb-6">{tier.description}</p>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">{"Who It's For:"}</p>
            <p className="text-muted-foreground text-sm mb-6">{tier.who}</p>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">Key Outcomes:</p>
            <ul className="space-y-2 mb-8">
              {tier.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                Book a Session
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    ))}</div>
  )
}

export default ServicesTier