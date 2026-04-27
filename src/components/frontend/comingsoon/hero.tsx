'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, ArrowDown, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { CONTACT_INFO } from '@/components/frontend/spm/data/constants'

import { Button } from '@/components/ui/button'

const Hero = () => {
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col py-48 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl font-medium tracking-tight text-zinc-800">
              Our New Website is
            </p>
            <h1 className="text-6xl md:text-8xl tracking mt-4 uppercase text-primary">
              COMING SOON, STAY TUNED!
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            <Button className="bg-secondary hover:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest px-4 h-8 rounded-md shadow-lg shadow-secondary/25">
              FOLLOW US ON SOCIAL MEDIA
            </Button>
            <div className="flex items-center gap-6 text-zinc-400">
              <Link href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 hover:text-secondary cursor-pointer transition-colors" />
              </Link>
              <Link href={CONTACT_INFO.youtube} target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6 hover:text-secondary cursor-pointer transition-colors" />
              </Link>
              <Link href={CONTACT_INFO.tiktok} target="_blank" rel="noopener noreferrer">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current hover:text-secondary cursor-pointer transition-colors"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 2.54 3.35 2.11.83-.16 1.59-.73 1.97-1.47.36-.6.45-1.3.45-1.99.02-3.76.02-7.52.02-11.28z" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-40 h-40 md:w-56 md:h-56 group cursor-pointer"
          >
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              viewBox="0 0 500 500"
              className="w-full h-full text-black overflow-visible"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                ></path>
              </defs>
              <text className="text-[28px] font-black uppercase fill-current text-primary tracking-[0.2em]">
                <textPath xlinkHref="#circlePath">
                  Coming <tspan className="fill-secondary">✦</tspan> Soon{' '}
                  <tspan className="fill-secondary">✦</tspan>{' '}
                  <tspan className="fill-secondary">✦</tspan> Coming{' '}
                  <tspan className="fill-secondary">✦</tspan> Soon{' '}
                  <tspan className="fill-secondary">✦</tspan> Coming{' '}
                  <tspan className="fill-secondary">✦</tspan> Soon{' '}
                  <tspan className="fill-secondary">✦</tspan> Coming{' '}
                  <tspan className="fill-secondary">✦</tspan> Soon{' '}
                </textPath>
              </text>
            </motion.svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110">
              <ArrowDown className="w-8 h-8 md:w-12 md:h-12 text-zinc-900" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center lg:text-right max-w-sm"
          >
            <p className="text-zinc-500 font-medium leading-relaxed">
              Prime Counsel is a UK-registered leadership and personal development organisation
              committed to helping emerging leaders move from potential to structured impact.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block animate-bounce">
        <ChevronDown className="w-6 h-6 text-zinc-400" />
      </div>
    </section>
  )
}

export default Hero
