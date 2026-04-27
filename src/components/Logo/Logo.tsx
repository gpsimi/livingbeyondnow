import React from 'react'
import logo from '@/assets/logos/logo-light.svg' // Make sure you have your correct images referenced here
import logoDark from '@/assets/logos/logo-dark.svg' // Make sure you have your correct images referenced here
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Image className="h-20 object-contain dark:hidden" src={logoDark} alt="" />
      <Image className="h-20 object-contain hidden dark:block" src={logo} alt="" />
    </div>
  )
}
