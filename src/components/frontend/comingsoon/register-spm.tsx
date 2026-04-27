'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Calendar, Clock } from 'lucide-react'
import { EVENT_DETAILS } from '@/components/frontend/spm/data/constants'
import { RegistrationModal } from '@/components/frontend/spm/components/RegistrationModal'

const EVENT_META = [
  { icon: Calendar, label: EVENT_DETAILS.date },
  { icon: Clock, label: EVENT_DETAILS.time },
  { icon: MapPin, label: EVENT_DETAILS.venue },
]

const RegisterSPM = () => {
  return (
    <section id="register" className="relative py-32 overflow-hidden bg-primary">
      {/* Decorative background blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--secondary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container max-w-5xl mx-auto px-6 relative z-10 text-center space-y-14">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-body inline-block text-white text-[11px] font-bold uppercase tracking-[0.4em] border border-secondary/40 px-4 py-1.5 rounded-full mb-4">
            Now Open for Registration
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white">
            Strategic <span className="text-secondary">Positioning</span>
            <br />
            Masterclass 2.0 - <span className="text-secondary">Luton</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            A full-day live experience designed to help emerging leaders move from effort to
            structured impact. Secure your seat before it&apos;s gone.
          </p>
        </motion.div>

        {/* Event meta chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {EVENT_META.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <Icon className="w-4 h-4 text-secondary shrink-0" />
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-px h-12 bg-white/20 mx-auto"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <RegistrationModal>
              <button className="group relative inline-flex items-center gap-3 bg-secondary text-white font-black text-sm uppercase tracking-widest px-10 py-5 rounded-sm overflow-hidden shadow-[0_0_40px_hsl(var(--secondary)/0.4)] transition-shadow hover:shadow-[0_0_60px_hsl(var(--secondary)/0.6)]">
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Secure Your Seat</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </RegistrationModal>
          </motion.div>

          {/* <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
            Limited spots available
          </p> */}
        </motion.div>

        {/* Bottom note */}
        {/* <motion.p
          className="text-white/30 text-xs font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {EVENT_DETAILS.address}
        </motion.p> */}
      </div>
    </section>
  )
}

export default RegisterSPM
