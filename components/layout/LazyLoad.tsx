'use client'

import { useInView } from 'react-intersection-observer'

export default function LazyLoad({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0,
  })

  return (
    <div ref={ref} className="w-full h-full min-h-[50vh]">
      {inView ? children : null}
    </div>
  )
}