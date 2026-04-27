
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Blog - Insights',
      description: 'Thought leadership, strategic perspectives, and institutional intelligence from Prime Counsel.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
