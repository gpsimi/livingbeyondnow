import React from 'react'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'


const Spm3Hero = () => {
  return (
    <section className="pt-32 pb-20 gradient-navy text-primary-foreground">
        <div className="container-narrow px-4">
          <p className="section-label text-primary-foreground/60 mb-4">SPM 3.0</p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-4 leading-tight">
            STRATEGIC POSITIONING MASTERCLASS
          </h1>
          <div className="flex flex-wrap gap-6 mt-8 font-body text-sm text-primary-foreground/70">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              December, 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Coming Soon
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              Coming Soon
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-secondary" />
              Limited Seats
            </span>
          </div>
        </div>
      </section>
  )
}

export default Spm3Hero