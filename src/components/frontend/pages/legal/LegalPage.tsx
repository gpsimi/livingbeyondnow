import React from 'react'
import { Badge } from '@/components/ui/badge'
import FadeIn from '@/components/frontend/FadeIn'

interface LegalSection {
  title: string
  content: string | string[]
}

interface LegalPageProps {
  badge?: string
  title: string
  titleHighlight?: string
  lastUpdated: string
  shortVersion?: string
  sections: LegalSection[]
}

export const LegalPage: React.FC<LegalPageProps> = ({
  badge = 'LEGAL',
  title,
  titleHighlight,
  lastUpdated,
  shortVersion,
  sections,
}) => {
  return (
    <div className="bg-navy text-white pt-32 pb-24 min-h-screen">
      <div className="container-narrow px-6  max-w-4xl">
        <FadeIn>
          <div className="mb-12">
            <Badge className="bg-gold/20 text-gold border-gold/30 hover:bg-gold/30 mb-6 uppercase tracking-widest px-4 py-1">
              {badge}
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl mb-4 leading-tight">
              {title} <span className="italic text-gold">{titleHighlight}</span>
            </h1>
            <p className="text-white/60 font-body text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </FadeIn>

        {shortVersion && (
          <FadeIn delay={0.1}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-12">
              <p className="text-gold font-body font-semibold mb-2">The short version:</p>
              <p className="text-white/80 leading-relaxed italic">
                {shortVersion}
              </p>
            </div>
          </FadeIn>
        )}

        <div className="grid gap-6 md:gap-8">
          {sections.map((section, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.05}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 text-gold font-heading text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl md:text-3xl text-gold mb-4 uppercase tracking-wide">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {Array.isArray(section.content) ? (
                        <ul className="space-y-3">
                          {section.content.map((item, i) => (
                            <li key={i} className="flex gap-3 text-white/80 leading-relaxed">
                              <span className="text-gold mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-white/80 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
