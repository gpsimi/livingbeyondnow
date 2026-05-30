"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const FinalCTA = () => (
  <section className="py-24 bg-secondary text-secondary-foreground">
    <div className="container-narrow max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">
          Your clarity journey starts here.
        </h2>
        <p className="text-secondary-foreground/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          {"Whether you're an individual seeking purpose, a leader building capacity, or an institution creating legacy — LBN is ready."}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-accent/90 transition-colors">
              Book a Strategy Session
            </button>
          </Link>
          <Link href="/partner">
            <button className="border-2 border-secondary-foreground/30 text-secondary-foreground px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:border-accent hover:text-accent transition-colors">
              Partner With LBN
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
