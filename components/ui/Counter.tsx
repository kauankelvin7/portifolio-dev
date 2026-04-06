'use client'

import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export default function Counter({ 
  value, 
  suffix = "", 
  duration = 1.5, 
  className 
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)
  const { prefersReduced } = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    
    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null
    let animationFrameId: number
    const digits = value.toString().length
    const min = digits > 1 ? Math.pow(10, digits - 1) : 0
    const max = Math.pow(10, digits) - 1

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        const randomNoise = Math.floor(Math.random() * (max - min + 1)) + min
        
        setDisplayValue(randomNoise)
        
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, value, duration, prefersReduced])

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  )
}