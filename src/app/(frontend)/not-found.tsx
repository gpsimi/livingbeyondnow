'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-4 selection:bg-secondary selection:text-secondary-foreground">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-160 w-160 rounded-full bg-secondary/10 blur-[120px] filter" />
        <div className="absolute right-[-10%] bottom-[-10%] h-120 w-120 rounded-full bg-navy/20 blur-[100px] filter" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-heading text-8xl md:text-[12rem] leading-none text-white drop-shadow-2xl"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="mb-6 font-heading text-3xl md:text-5xl uppercase tracking-wider text-secondary">
              Route Not Found
            </h2>

            <p className="mx-auto mb-10 max-w-md font-body text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
              Even visionary leaders encounter unexpected paths. Let&apos;s get you back to the
              right trajectory.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="group rounded-full px-8 font-heading text-lg">
              <Link href="/">
                <MoveLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 bg-transparent px-8 font-heading text-lg text-white hover:bg-white hover:text-primary"
            >
              <Link href="/contact">Support Team</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating background numbers for depth */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden opacity-[0.05]">
          <span className="font-heading text-[25rem] leading-none text-white blur-sm">404</span>
        </div>
      </div>

      {/* Decorative Border Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-secondary to-transparent opacity-30" />
    </main>
  )
}

export default NotFound
