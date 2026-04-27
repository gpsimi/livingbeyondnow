import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact us for your Business/Personal Development',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
