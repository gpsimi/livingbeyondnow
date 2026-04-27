import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop with Prime Counsel',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
