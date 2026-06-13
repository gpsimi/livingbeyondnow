"use client"

import { motion } from "framer-motion";


const AboutHero = () => {
  return (
    <section className="py-24 bg-secondary text-secondary-foreground">
      <div className="container-narrow max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">About Us</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mt-3 mb-6">Our Story</h1>
          <p className="text-secondary-foreground/70 text-lg leading-relaxed">
            Living Beyond Now was born from a conviction: that too many gifted people live beneath their potential, not because they lack talent, but because they lack the structures, strategies, and spiritual clarity to translate purpose into legacy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutHero