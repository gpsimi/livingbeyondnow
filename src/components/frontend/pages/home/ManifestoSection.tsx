"use client";

import { motion } from "framer-motion";

const ManifestoSection = () => (
  <section className="py-24 bg-primary relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
    </div>
    <div className="container-narrow relative z-10 max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-accent font-heading text-sm uppercase tracking-[0.3em] font-semibold">Our Manifesto</span>
        <div className="mt-10 space-y-6">
          <p className="font-heading text-2xl md:text-4xl font-bold uppercase text-primary-foreground leading-snug">
            We believe purpose is divine.
          </p>
          <p className="font-heading text-2xl md:text-4xl font-bold uppercase text-primary-foreground leading-snug">
            We believe leadership is stewardship.
          </p>
          <p className="font-heading text-2xl md:text-4xl font-bold uppercase text-primary-foreground leading-snug">
            We refuse mediocrity.
          </p>
        </div>
        <p className="mt-10 text-primary-foreground/60 text-sm max-w-lg mx-auto leading-relaxed">
          Every life carries a mandate. Every leader carries a territory. We exist to ensure no mandate goes unfulfilled, and no territory goes unclaimed.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ManifestoSection;
