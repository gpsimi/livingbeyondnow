'use client'

import React from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div>
      {' '}
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50 origin-[0%]"
        style={{ scaleX }}
      />
    </div>
  )
}

export default ProgressBar
