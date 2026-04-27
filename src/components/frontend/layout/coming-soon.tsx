'use client'

import React from 'react'
import { ProgressBar, Nav, Hero, Contact, Footer, RegisterSPM } from '../comingsoon'

export const ComingSoon = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#f8f9fa] text-black selection:bg-secondary/10 selection:text-secondary">
      <ProgressBar />
      <Nav />
      <Hero />
      <RegisterSPM />
      <Contact />
      <Footer />
    </div>
  )
}
