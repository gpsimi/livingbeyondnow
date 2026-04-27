'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, ChevronDown, ShoppingBag } from 'lucide-react'
import { navLinks } from '@/constants'
import { useCartStore } from '@/store/cart-store'
import logoLight from '@/assets/logos/logo-light.svg'
import Image from 'next/image'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { items, setCartOpen } = useCartStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mobile: close sheet then navigate
  const handleMobileNav = (path: string) => {
    setMobileOpen(false)
    setMobileOpenSection(null)
    setTimeout(() => router.push(path), 100)
  }

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.subItems) return link.subItems.some((s) => pathname.startsWith(s.path))
    return pathname === link.path
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-narrow flex items-center justify-between py-4 max-md:px-4">
        <Link href="/">
          <Image
            src={logoLight}
            alt="Prime Counsel"
            className="h-8 md:h-10 w-auto"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
          {navLinks.map((link) =>
            link.subItems ? (
              <div key={link.path} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === link.label ? null : link.label)
                  }
                  className={`flex items-center gap-1 font-body text-sm font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-full ${
                    isActive(link)
                      ? 'bg-gold/10 text-gold'
                      : 'text-primary-foreground hover:bg-gold/10 hover:text-gold'
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === link.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 min-w-[160px] bg-primary border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    {link.subItems.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        onClick={() => setOpenDropdown(null)}
                        className={`flex items-center px-4 py-3 font-body text-sm transition-all ${
                          pathname === sub.path
                            ? 'text-gold bg-gold/10'
                            : 'text-primary-foreground/80 hover:text-gold hover:bg-gold/5'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                href={link.path}
                className={`font-body text-sm font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-full ${
                  isActive(link)
                    ? 'bg-gold/10 text-gold'
                    : 'text-primary-foreground hover:bg-gold/10 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-primary-foreground hover:text-gold transition-colors"
            aria-label="View cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          <Link href="/contact" className="btn-secondary text-sm">
            Book a Consultation
          </Link>
        </div>

        {/* Mobile View Cart & Hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-primary-foreground"
            aria-label="View cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="text-primary-foreground"
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>
            </SheetTrigger>

          <SheetContent side="left" className="bg-navy border-r border-white/10 w-72">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-6 mt-12">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.subItems ? (
                    <div key={link.label}>
                      <button
                        onClick={() =>
                          setMobileOpenSection(
                            mobileOpenSection === link.label ? null : link.label
                          )
                        }
                        className={`w-full flex items-center justify-between text-lg font-medium transition-all text-left px-4 py-3 rounded-xl ${
                          isActive(link)
                            ? 'text-gold bg-gold/10'
                            : 'text-primary-foreground/80 hover:text-gold hover:bg-gold/5'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileOpenSection === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {mobileOpenSection === link.label && (
                        <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-gold/30 pl-4">
                          {link.subItems.map((sub) => (
                            <button
                              key={sub.path}
                              onClick={() => handleMobileNav(sub.path)}
                              className={`font-body text-base py-2 text-left transition-colors ${
                                pathname === sub.path
                                  ? 'text-gold'
                                  : 'text-primary-foreground/70 hover:text-gold'
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      key={link.path}
                      onClick={() => handleMobileNav(link.path)}
                      className={`text-lg font-medium transition-all text-left px-4 py-3 rounded-xl w-full ${
                        pathname === link.path
                          ? 'text-gold bg-gold/10'
                          : 'text-primary-foreground/80 hover:text-gold hover:bg-gold/5'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                )}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleMobileNav('/contact')}
                  className="btn-secondary text-sm w-full text-center"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
