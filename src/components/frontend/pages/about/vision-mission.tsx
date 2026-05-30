"use client"

import { motion } from "framer-motion"



const VisionMission = () => {
  return (
        <section className="py-24 bg-background">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">Vision</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight mt-3 mb-4">{"Where We're Headed"}</h2>
            <p className="text-muted-foreground leading-relaxed">
              To see a generation of purpose-driven leaders, structured institutions, and transformed communities operating in their full God-given capacity — building legacies that outlast them.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">Mission</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight mt-3 mb-4">What We Do Daily</h2>
            <p className="text-muted-foreground leading-relaxed">
              We unlock potential, build capacity, and create legacy-driven systems through personal development, leadership consulting, and intellectual product development — grounded in Kingdom principles and delivered with executive excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VisionMission