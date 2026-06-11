import Link from 'next/link'
import Image from 'next/image'
import logo1 from '@/assets/logos/LBN-logo.png'

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              {/* <Image
                src={logo}
                alt="Living Beyond Now Logo"
                width={200}
                height={50}
                className="h-9 w-auto object-contain"
              /> */}
              {/* <Link href="/" className="flex items-center mb-6">
                <Image src={logo} alt="Logo" width={50} height={50} className="mr-2" />
                <div className="inline-block">
                  <span className="font-heading text-2xl font-bold tracking-tight">ISAAC TOMZ</span>
                  <span className="block text-xs tracking-[0.3em] uppercase text-warm-concrete mt-1">
                    Services Ltd
                  </span>
                </div>
              </Link> */}
              <Link href="/" className="relative z-10 flex items-center">
                <Image
                  src={logo1}
                  alt="Logo"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                <div
                  className="flex flex-col items-start"
                >
                  <span
                    className="font-heading text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300">
                    LIVING BEYOND NOW
                  </span>
                  <span
                    className="text-[7px] tracking-[0.3em] uppercase transition-colors duration-300">
                    EMPOWERMENT OUTREACH
                  </span>
                </div>
            </Link>

            </div>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              Unlocking purpose. Activating dominion capacity. Building legacy-driven systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'About', 'Services', 'Shop', 'Blog', 'Partner', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-secondary-foreground/70 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>Personal Development</li>
              <li>Leadership Consulting</li>
              <li>Publishing & IP Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>lbnow2016@gmail.com</li>
              <li>09069755436</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} Living Beyond Now. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
