import React from 'react'
import logoNoBg from '@/assets/logos/LBN.png'
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Image className="h-12 w-auto object-contain" src={logoNoBg} alt="Living Beyond Now" />
    </div>
  )
}
