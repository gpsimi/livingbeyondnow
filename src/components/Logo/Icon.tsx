import React from 'react';
import logoNoBg from '@/assets/logos/LBN.png';
import Image from 'next/image';

export default function Icon() {
  return (
    <div>
      <Image className="w-12 h-auto object-contain" src={logoNoBg} alt="Living Beyond Now" /> 
    </div>
  );
}