'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  className = "",
  direction = 'up' 
}: FadeInProps) {
  const { prefersReduced } = useReducedMotion();
  
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  const initial = prefersReduced 
    ? { opacity: 0 } 
    : { opacity: 0, ...directions[direction] };

  const animate = prefersReduced 
    ? { opacity: 1 } 
    : { opacity: 1, x: 0, y: 0 };

  const transition = prefersReduced 
    ? { duration: 0.15, delay: delay } 
    : { duration: 0.7, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] as any };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}