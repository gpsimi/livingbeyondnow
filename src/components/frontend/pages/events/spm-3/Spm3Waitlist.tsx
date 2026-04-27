import React from 'react'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Spm3Waitlist = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-narrow mx-auto px-4 flex flex-col items-center text-center">
        {/* Header */}
        <p className="font-heading tracking-widest text-gold uppercase text-sm mb-4">
          Upcoming Event
        </p>
        <h2 className="font-heading text-5xl md:text-6xl text-primary mb-4">
          SPM <span className="text-gold">3.0</span>
        </h2>
        <p className="font-body text-lg md:text-xl text-primary mb-6">
          The Strategic Positioning Masterclass
        </p>

        {/* Info Icons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-primary-foreground/70 mb-8 font-body">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-semibold text-primary/40">December 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="font-semibold text-primary/40">Birmingham, United Kingdom</span>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-base md:text-lg text-primary/80 font-body mb-10 font-semibold leading-relaxed">
          An intensive masterclass designed to equip leaders with the frameworks,
          clarity, and strategic discipline needed to position themselves for lasting
          influence and global relevance.
        </p>

        {/* Form */}
        <form className="w-full max-w-[440px] flex flex-col gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Your full name"
              required
              className="w-full border border-primary rounded-full px-4 py-3.5 text-sm text-primary placeholder:text-primary/60 font-body font-medium focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email address"
              required
              className="w-full border border-primary rounded-full px-4 py-3.5 text-sm text-primary placeholder:text-primary60 font-body font-medium focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          
          <Button variant="gold" className="w-full mt-2 h-12" type="submit">
            Join the Waitlist <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Spm3Waitlist
