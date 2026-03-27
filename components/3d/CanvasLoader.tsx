'use client'

import { Html, useProgress } from '@react-three/drei'

export default function CanvasLoader() {
  const { progress } = useProgress()

  return (
    <Html
      as='div'
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div className='flex flex-col items-center bg-black border border-brand-white/20 p-4 min-w-[200px]'>
        
        <span className='font-mono text-xs text-brand-red mb-2 uppercase tracking-widest'>
          System Loading...
        </span>
        
        <div className="w-full h-1 bg-zinc-800 mb-2">
            <div 
                className="h-full bg-brand-white transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>

        <p className='font-display text-4xl font-extrabold text-brand-white'>
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  )
}