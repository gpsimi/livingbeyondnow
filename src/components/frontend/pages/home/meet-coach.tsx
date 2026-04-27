'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/frontend/AnimatedSection'
import coachPortrait from '@/assets/images/coach-ayoola.svg'
import authorCardBg from '@/assets/images/author-card-bg.png'

const MeetCoach = () => {
  return (
    <section className="section-padding-1 bg-background overflow-hidden">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column: Content */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              
              <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                Meet <span className="text-secondary">Coach Ayoola </span>Your Leadership Engineer
              </h2>

              <div className="space-y-6">
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  With over 6 years of consulting experience working with global institutions
                  including <span className="text-foreground font-semibold">UNICEF</span>,{' '}
                  <span className="text-foreground font-semibold">the United Nations</span>,{' '}
                  <span className="text-foreground font-semibold">Aleto Foundation</span>, and{' '}
                  <span className="text-foreground font-semibold">BT Group</span>.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  I specialize in engineering transformational leaders who integrate visionary
                  thinking with ethical responsibility. Whether you&apos;re a corporate executive,
                  creative, entrepreneur, or emerging change-maker—I&apos;ll guide you to move
                  beyond survival into strategic relevance and global impact.
                </p>
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Button asChild variant="hero" size="lg" >
                  <Link href="/contact" className="inline-flex items-center gap-3">
                    Request a Call
                  </Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right Column: Visuals */}
          <AnimatedSection direction="right" className="relative group">
            <div className="relative aspect-4/5 w-full max-w-[500px] mx-auto lg:ml-auto">
              {/* Main Image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <Image
                  src={coachPortrait}
                  alt="Coach Ayoola Orimoloye"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-6 -right-4 md:-right-12 bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-border max-w-[240px] md:max-w-[300px] z-20"
              >
                <div className="relative h-32 md:h-40 w-full mb-4 rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src={authorCardBg}
                    alt="Bestselling Author Visual"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-secondary/10" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-body text-[10px] md:text-xs text-secondary font-bold uppercase tracking-widest">
                    World wide
                  </span>
                </div>

                <h3 className="font-heading text-lg md:text-xl text-foreground mb-2">
                  Bestselling Author
                </h3>
                <p className="font-body text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                  Techniques <span className="text-foreground font-medium">and principles</span>{' '}
                  different from <span className="text-foreground font-medium">what you</span> might
                  find <span className="text-foreground font-medium">in most leadership</span>{' '}
                  books.
                </p>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default MeetCoach
