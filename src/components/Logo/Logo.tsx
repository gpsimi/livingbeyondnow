import React from 'react'
import logoNoBg from '@/assets/logos/lbn-logo.png'
import Image from 'next/image'

export default function Logo() {
  return (
    <div className="relative z-10 flex flex-col items-center ">
      <Image 
        src={logoNoBg} 
        alt="Logo" 
        className="h-20 w-auto object-contain mb-3" 
      />
      <div className="flex flex-col items-center">
        <span className="font-heading text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300">
          LIVING BEYOND NOW
        </span>
        <span className="text-[9px] tracking-[0.3em] uppercase transition-colors duration-300">
          EMPOWERMENT OUTREACH
        </span>
      </div>
    </div>
  )
}
