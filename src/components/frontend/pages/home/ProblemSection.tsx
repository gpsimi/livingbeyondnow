"use client";

import { motion } from "framer-motion";

const ProblemSection = () => (
  <section className="bg-secondary text-secondary-foreground py-24">
    <div className="container-narrow max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8 leading-tight">
          Gifted but unclear.<br />
          Passionate but unstructured.<br />
          Called but unequipped.
        </h2>
        <p className="text-secondary-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
          {"Millions carry potential that never translates into impact — not because they lack talent, but because they lack structure, clarity, and strategic guidance. The gap between where you are and where you're called to be isn't about effort. It's about alignment."}
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
