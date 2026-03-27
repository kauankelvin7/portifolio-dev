'use client'

import { Html, useProgress } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'

export default function BootLoader({ onReady }: { onReady?: () => void }) {
  const { progress: realProgress } = useProgress()
  const [visualProgress, setVisualProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisualProgress((prev) => {
        const targetLimit = realProgress === 100 ? 100 : 90
        
        const increment = Math.random() * 3 + 1 
        
        const nextValue = prev + increment

        if (nextValue >= targetLimit) {
           return targetLimit
        }
        return nextValue
      })
    }, 20)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [realProgress])

  useEffect(() => {
    if (visualProgress >= 100 && realProgress === 100) {
      
      if (intervalRef.current) clearInterval(intervalRef.current)
      
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true)
        
        setTimeout(() => {
           if (onReady) onReady()
        }, 500)
        
      }, 200)

      return () => clearTimeout(exitTimer)
    }
  }, [visualProgress, realProgress, onReady])

  if (isFadingOut && visualProgress >= 100) {
      
  }

  return (
    <Html
      as='div'
      center
      className="pointer-events-none"
      style={{ zIndex: 100 }}
    >
      <div 
        className={`flex flex-col items-start justify-center transition-opacity duration-500 ease-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      >
        
        <div className="flex flex-col gap-2 min-w-[200px]">
            
            <div className="flex justify-between items-end w-full font-heading text-xs mix-blend-difference text-white/80">
                <span className="tracking-widest text-[10px] uppercase">
                    Loading
                </span>
                <span className="font-bold font-heading text-sm">
                    {Math.min(100, visualProgress).toFixed(0)}%
                </span>
            </div>

           
            <div className="w-full h-0.5 bg-brand-orange/20 overflow-hidden relative">
                <div 
                    className="h-full bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.8)] transition-all duration-75 ease-linear"
                    style={{ 
                        width: `${Math.min(100, visualProgress)}%`,
                    }}
                />
            </div>

            <div className="text-[9px] font-heading text-white/40 uppercase tracking-widest mt-1">
                MEM_ALLOC: {visualProgress < 100 ? 'PROCESSING' : 'COMPLETE'}
            </div>

        </div>
      </div>
    </Html>
  )
}