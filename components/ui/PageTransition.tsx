'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTransition } from '@/app/context/TransitionContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function PageTransition() {
  const { isTransitioning } = useTransition()
  const { prefersReduced } = useReducedMotion()

  return (
    <AnimatePresence mode='wait'>
      {isTransitioning && (
        <>
          <motion.div
            className="fixed inset-0 z-9999 bg-brand-black origin-bottom"
            initial={prefersReduced ? { opacity: 0 } : { scaleY: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { scaleY: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { scaleY: 0 }}
            transition={{ duration: prefersReduced ? 0.15 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          
          <motion.div
            className="fixed inset-0 z-9998 bg-brand-red origin-bottom"
            initial={prefersReduced ? { opacity: 0 } : { scaleY: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { scaleY: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { scaleY: 0 }}
            transition={{ duration: prefersReduced ? 0.15 : 0.8, ease: [0.22, 1, 0.36, 1], delay: prefersReduced ? 0 : 0.1 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}