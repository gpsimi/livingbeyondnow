"use client"

import { motion } from "framer-motion"
import { values } from "@/constants"


const CoreValues = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">What Drives Us</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mt-3">Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="bg-card rounded-lg border border-border p-6">
                <v.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues