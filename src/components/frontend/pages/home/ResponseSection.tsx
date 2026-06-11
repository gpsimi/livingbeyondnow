"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
          className="relative aspect-4/3 rounded-lg overflow-hidden border border-border group"
        >
          <Image
            src="/images/response_bg.png"
            alt="Living Beyond Now architectural structure representing purpose, strategy, and legacy"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8 text-center backdrop-blur-[2px]">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                <span className="text-white font-heading text-2xl font-bold">LBN</span>
              </div>
              <p className="font-heading text-lg uppercase tracking-wider text-white font-medium">Purpose → Structure → Legacy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ResponseSection;
