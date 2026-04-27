'use client'

import { motion } from 'framer-motion'
import { RegistrationModal } from '@/components/frontend/spm/components/RegistrationModal'
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'
import heroBg from '@/assets/images/spm/hero-bg.jpg'
import flyer from '@/assets/images/spm/flyer.png'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-[hsl(235,100%,16%)]/90 via-[hsl(235,100%,16%)]/70 to-[hsl(235,100%,16%)]/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="container relative mx-auto px-4 py-28 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 border border-secondary/30 bg-secondary/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-body text-sm md:text-[16px] tracking-[0.2em] uppercase text-secondary font-semibold">
                SPM 2.0 LUTON
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-heading text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.2] sm:mb-3"
            >
              Strategic <span className="text-secondary">Positioning</span>
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="font-heading text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.2] mb-6"
            >
              Masterclass <span className="text-secondary">Luton</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="font-body text-white/80 max-w-xl font-medium text-sm md:text-base mb-6 leading-relaxed md:text-justify "
            >
              I know why you are here. You are tired of the rat race of waking up every month
              knowing the paycheck is already allocated before it arrives. You have ambition, ideas
              & potential. But somewhere in between you are managing life instead of designing it.
              <br />
              <br />
              {/* I know because I lived it. For three years, I operated inside the same
              cycle of effort without leverage. I was disciplined and ambitious,
              yet aware that the structure quietly limited expansion. The
              breakthrough came when I understood a powerful truth. The problem
              was not effort or motivation. It was <span className="text-secondary font-bold">Positioning.</span> Once I learned
              the rules that govern value, leverage, and visibility, everything
              changed. <span className="text-secondary font-bold">SPM 2.0</span> was designed to help you do the same. If you are
              tired of surviving and ready to thrive strategically, this is for
              you. */}
            </motion.p>
            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="font-body text-white/80 max-w-xl font-medium text-sm md:text-base mb-6 leading-relaxed"
            >
              A full-day strategic masterclass designed to help ambitious
              professionals move from constant effort to intentional advantage.
            </motion.p> */}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mb-6"
            >
              <RegistrationModal>
                <button className="group relative inline-flex items-center gap-3 bg-secondary text-secondary-foreground font-body font-bold text-sm md:text-base px-10 py-4 rounded-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_hsl(212,100%,46%,0.35)]">
                  <span className="relative z-10">Register Now</span>
                  <div className="absolute inset-0 bg-linear-to-r from-secondary to-[hsl(195,100%,50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </RegistrationModal>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="flex items-start sm:items-center gap-4 sm:gap-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm px-8 py-4 w-full sm:w-auto"
              >
                <div className="flex items-center gap-2 text-white/60 font-body text-sm">
                  <FiCalendar className="w-4 h-4 text-secondary" />
                  <span>25th April, 2026</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/15" />
                <div className="flex items-center gap-2 text-white/60 font-body text-sm">
                  <FiMapPin className="w-4 h-4 text-secondary" />
                  <span>Luton, UK</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/15" />
                <div className="flex items-center gap-2 text-white/60 font-body text-sm">
                  <FiClock className="w-4 h-4 text-secondary" />
                  <span>10am – 4pm</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <Image
              src={flyer}
              alt="SPM 2.0 LUTON"
              className="h-full object-cover rounded-2xl w-[400px]"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-secondary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
