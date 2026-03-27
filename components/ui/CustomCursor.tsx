'use client'

import { motion } from 'framer-motion'
import useMousePosition from '@/app/hooks/useMousePosition'
import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const { x, y } = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')

      setIsHovering(!!isClickable)
    }

    window.addEventListener('mouseover', handleMouseOver)
    return () => window.removeEventListener('mouseover', handleMouseOver)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brand-orange pointer-events-none z-99999 mix-blend-difference border border-brand-black"
        animate={{ 
          x: x - 6, 
          y: y - 6,
          rotate: isHovering ? 45 : 0
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      <motion.div
        className="fixed top-0 left-0 border-2 border-brand-orange pointer-events-none z-99998 mix-blend-difference"
        animate={{
          x: x - (isHovering ? 30 : 12),
          y: y - (isHovering ? 30 : 12),
          width: isHovering ? 60 : 24,
          height: isHovering ? 60 : 24,
          rotate: isHovering ? -45 : 0,
          opacity: isHovering ? 1 : 0.5,
          backgroundColor: isHovering ? 'rgba(255, 107, 0, 0.1)' : 'rgba(255, 107, 0, 0)'
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5
        }}
      />
    </>
  )
}