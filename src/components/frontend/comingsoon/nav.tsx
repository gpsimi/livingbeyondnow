'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import logoDark from '@/assets/logos/logo-dark.svg'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Register', id: 'register' },
  { label: 'Contact', id: 'contact' },
]

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('home')
              }}
              className="font-heading text-xl md:text-2xl tracking-wider flex items-center"
            >
              <Image
                src={logoDark}
                alt="Prime Counsel"
                className="h-8 md:h-10 w-auto"
                width={150}
                height={40}
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="text-[11px] font-bold tracking-widest uppercase hover:text-secondary transition-colors text-zinc-600"
              >
                {link.label}
              </motion.button>
            ))}
            <Link href="/spm-2">
              <Button className="bg-secondary hover:bg-zinc-800 text-white text-[11px] font-bold tracking-widest uppercase px-6 h-10 rounded-sm shadow-lg hover:shadow-black/20 transition-all">
                REGISTER FOR SPM 2.0
              </Button>
            </Link>
          </motion.div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-900 border border-zinc-200"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-8 mt-12">
                  <div className="flex flex-col gap-4">
                    {NAV_LINKS.map((link, i) => (
                      <motion.button
                        key={link.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                        onClick={() => scrollToSection(link.id)}
                        className="text-xl font-black uppercase tracking-tighter text-left hover:text-secondary transition-colors"
                      >
                        {link.label}
                      </motion.button>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="pt-4 border-t border-zinc-100"
                  >
                    <Link href="/spm-2" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-secondary hover:bg-zinc-800 text-white text-xs font-bold tracking-widest uppercase h-12 rounded-sm shadow-xl shadow-secondary/20">
                        REGISTER FOR SPM 2.0
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  )
}

export default Nav
