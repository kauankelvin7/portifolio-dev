"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CanvasLoaderProps {
  label?: string;
}

export default function CanvasLoader({ label = "Loading..." }: CanvasLoaderProps) {
  const { prefersReduced } = useReducedMotion();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-brand-black transition-colors duration-500">
      <div className="flex flex-col items-center gap-2">
        <div 
          className={`w-32 h-1 bg-brand-orange shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            prefersReduced ? "" : "animate-pulse"
          }`} 
          role="presentation"
        />
        <div 
          className={`w-24 h-1 bg-brand-orange shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            prefersReduced ? "" : "animate-pulse [animation-delay:75ms]"
          }`} 
          role="presentation"
        />
        <div 
          className={`w-16 h-1 bg-brand-orange shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            prefersReduced ? "" : "animate-pulse [animation-delay:150ms]"
          }`} 
          role="presentation"
        />
      </div>
      
      <span className="font-display text-xs font-black tracking-[0.2em] uppercase text-brand-cream mt-4">
        {label}
      </span>
    </div>
  );
}
