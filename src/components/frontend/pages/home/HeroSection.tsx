"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-leadership.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <Image
        src={heroImage}
        alt="Leaders in strategic discussion"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/70 to-secondary/40" />
    </div>
    <div className="container-narrow lg:container relative z-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight text-secondary-foreground leading-tight mb-6">
          Living<br />Beyond Now
        </h1>
        <p className="text-lg md:text-xl text-secondary-foreground/80 mb-4 font-light">
          Unlocking Potential. Building Capacity. Creating Legacy.
        </p>
        <p className="text-sm md:text-base text-secondary-foreground/60 mb-10 max-w-lg leading-relaxed">
          Awakening purpose. Activating dominion capacity. Building legacy-driven systems.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/services">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors">
              Explore Our Services
            </button>
          </Link>
          <Link href="/partner">
            <button className="border-2 border-secondary-foreground/30 text-secondary-foreground px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:border-accent hover:text-accent transition-colors">
              Partner With Us
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
