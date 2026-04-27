import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Prime Counsel',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
