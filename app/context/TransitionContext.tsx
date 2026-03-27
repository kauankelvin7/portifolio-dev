'use client'

import React, { createContext, useContext, useState  } from 'react'
import { useRouter } from 'next/navigation'

interface TransitionContextType {
  startTransition: (href: string) => Promise<void>
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const startTransition = async (href: string) => {

    setIsTransitioning(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    router.push(href)

    await new Promise((resolve) => setTimeout(resolve, 300))

    setIsTransitioning(false)
  }

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => {
  const context = useContext(TransitionContext)
  if (!context) throw new Error('useTransition must be used within a TransitionProvider')
  return context
}