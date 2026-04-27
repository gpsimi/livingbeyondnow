'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/components/frontend/spm/hooks/use-theme'
import { RegistrationModal } from '@/components/frontend/spm/components/RegistrationModal'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import logoLight from '@/assets/logos/logo-light.svg'
import logoDark from '@/assets/logos/logo-dark.svg'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'The Problem', href: '#the-problem' },
  { label: 'Highlights', href: '#highlight' },
  { label: 'Why SPM 2.0', href: '#why-spm' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Event', href: '#event-details' },
  { label: 'Coach', href: '#coach' },
  { label: 'FAQ', href: '#faq' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)

  const openMobileModal = () => {
    setIsOpen(false)
    setTimeout(() => setIsMobileModalOpen(true), 150)
  }
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) return null

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? theme === 'light'
              ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm text-foreground'
              : 'bg-[hsl(235,100%,16%)]/90 backdrop-blur-xl border-b border-white/10 shadow-sm text-white'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/spm-2"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-heading text-xl md:text-2xl tracking-wider flex items-center"
            >
              <Image
                src={scrolled && theme === 'light' ? logoDark : logoLight}
                alt="Prime Counsel"
                className="h-8 md:h-10 w-auto"
                width={150} // Adjust width as needed based on aspect ratio
                height={40} // Adjust height as needed
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-body uppercase text-[12px] font-medium px-2 py-2 rounded-sm transition-colors ${
                    scrolled && theme === 'light'
                      ? 'text-foreground/70 hover:text-foreground hover:bg-muted'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`ml-2 p-2 rounded-sm transition-colors ${
                  scrolled && theme === 'light'
                    ? 'text-foreground/70 hover:text-foreground hover:bg-muted'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
              </button>

              {/* CTA */}
              <RegistrationModal>
                <button className="ml-3 font-body text-sm font-bold px-5 py-2 bg-secondary text-secondary-foreground rounded-sm tracking-wider uppercase transition-all hover:shadow-[0_0_20px_hsl(212,100%,46%,0.3)]">
                  Register
                </button>
              </RegistrationModal>
            </div>

            {/* Mobile controls */}

            {/* Mobile controls (Switcher + Hamburger on right) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`p-2 rounded-sm ${
                  scrolled && theme === 'light' ? 'text-foreground' : 'text-white'
                }`}
              >
                {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={
                      scrolled && theme === 'light'
                        ? 'text-foreground border border-secondary/30'
                        : 'text-white hover:bg-white/10 hover:text-white border border-secondary/20'
                    }
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex flex-col gap-4">
                      {NAV_LINKS.map((link) => (
                        <button
                          key={link.label}
                          onClick={() => handleNavClick(link.href)}
                          className="text-lg font-medium transition-colors hover:text-primary text-muted-foreground text-left"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                      <button
                        onClick={openMobileModal}
                        className="font-body text-sm text-center font-bold px-5 py-2 bg-secondary text-secondary-foreground rounded-sm tracking-wider uppercase transition-all hover:shadow-[0_0_20px_hsl(212,100%,46%,0.3)]"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* External Registration Modal for Mobile Drawer */}
              <RegistrationModal open={isMobileModalOpen} onOpenChange={setIsMobileModalOpen} />
            </div>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  )
}

export default Navbar
