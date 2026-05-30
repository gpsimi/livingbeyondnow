"use client";

import { motion } from "framer-motion";

const ResponseSection = () => (
  <section className="py-24 bg-background">
    <div className="container-narrow">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">The LBN Response</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mt-3 mb-6">
            Structure for the Called. Strategy for the Gifted.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {"Living Beyond Now exists to bridge the gap between divine potential and tangible impact. We don't just inspire — we build systems, develop capacity, and create frameworks that turn purpose into legacy."}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Through personal development, leadership consulting, and intellectual property development, 
            LBN equips individuals and institutions with the architecture they need to thrive — 
            structurally, strategically, and spiritually.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-4/3 rounded-lg bg-linear-to-br from-primary/10 via-accent/5 to-secondary/10 flex items-center justify-center border border-border">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-heading text-2xl font-bold">LBN</span>
              </div>
              <p className="font-heading text-lg uppercase tracking-wider text-foreground/60">Purpose → Structure → Legacy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ResponseSection;
