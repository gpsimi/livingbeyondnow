import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services offered by Prime Counsel',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
