'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface WindowWithTTQ extends Window {
  ttq?: {
    page: () => void
  }
}

export function TikTokPageView() {
  const pathname = usePathname()

  useEffect(() => {
    const win = window as unknown as WindowWithTTQ
    if (typeof window !== 'undefined' && win.ttq) {
      win.ttq.page()
    }
  }, [pathname])

  return null
}
