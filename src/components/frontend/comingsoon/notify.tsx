'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Notify = () => {
  return (
    <section id="notify" className="py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="container max-w-4xl mx-auto px-6 text-center space-y-12">
        {/* Header */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-secondary text-[10px] font-black uppercase tracking-[0.3em] block">
            When We Go Live
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">Notify Me</h2>
          <div className="w-px h-12 bg-zinc-200 mx-auto mt-6" />
        </motion.div>

        {/* Form */}
        <motion.div
          className="space-y-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          <p className="text-xl font-bold tracking-tight text-zinc-800">
            Sign up to be the first to know when we launch.
          </p>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Enter Your Email Here:
            </label>
            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="name@example.com"
                className="h-14 bg-white border-zinc-200 text-center text-lg focus:ring-secondary focus:border-secondary rounded-none shadow-sm"
              />
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full h-14 bg-secondary hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-none shadow-xl shadow-secondary/20">
                  Notify Me!
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Notify
