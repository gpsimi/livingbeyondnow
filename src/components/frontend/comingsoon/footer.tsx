'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CONTACT_INFO } from '@/components/frontend/spm/data/constants'

const SOCIAL_LINKS = [
  { label: 'Instagram', href: CONTACT_INFO.instagram },
  { label: 'YouTube', href: CONTACT_INFO.youtube },
  { label: 'TikTok', href: CONTACT_INFO.tiktok },
]

const Footer = () => {
  return (
    <footer className="py-12 border-t border-zinc-100 text-center space-y-8 bg-zinc-50/50">
      {/* Social links */}
      <motion.div
        className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {SOCIAL_LINKS.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-[11px] text-zinc-500 font-medium">
          Copyright © {new Date().getFullYear()}{' '}
          <span className="text-secondary font-bold">Prime Counsel</span>. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  )
}

export default Footer
