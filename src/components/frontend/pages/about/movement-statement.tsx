"use client"

import { motion } from "framer-motion"


const MovementStatement = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container-narrow max-w-3xl text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-6">This Is a Movement</h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            {"LBN is not just an organization — it's a movement of leaders, thinkers, and builders who refuse to settle for less than what they were designed for. We are building a community of legacy-driven individuals who transform their world through purpose, structure, and stewardship."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MovementStatement