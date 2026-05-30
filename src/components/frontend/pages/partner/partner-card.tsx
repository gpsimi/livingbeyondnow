"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { options } from "@/constants"



const PartnerCard = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="bg-card rounded-lg border border-border p-8 hover:shadow-lg transition-shadow h-full">
                <opt.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-3">{opt.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{opt.description}</p>
                <Link href="/contact" className="text-primary text-sm font-semibold uppercase tracking-wider hover:text-accent transition-colors">
                  Get Started →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerCard