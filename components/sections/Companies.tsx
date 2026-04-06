"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { companies, stats } from "@/data/companies";
import FadeIn from "@/components/ui/FadeIn";
import Counter from "../ui/Counter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Companies() {
  const { prefersReduced } = useReducedMotion();
  const t = useTranslations('Companies');

  const localizedStats = stats.map((stat, index) => ({
    ...stat,
    label: t(`stat${index + 1}`)
  }));

  return (
    <section 
      id="statistics" 
      className="relative z-20 overflow-hidden"
      style={{
        background: '#0c0b09',
        padding: '64px 28px',
        borderBottom: '1px solid #1a1815'
      }}
    >
      {/* Logos Marquee */}
        <div className="w-full overflow-hidden mb-24 relative">
          <div 
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" 
            style={{ background: 'linear-gradient(to right, #0c0b09, transparent)' }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" 
            style={{ background: 'linear-gradient(to left, #0c0b09, transparent)' }}
          />
          
          <div className="flex w-full overflow-hidden">
            <div 
              className="flex gap-16 md:gap-24 items-center animate-marquee-slow whitespace-nowrap pr-16 md:pr-32"
              style={{
                width: 'max-content',
                animation: 'marquee 50s linear infinite',
                willChange: 'transform'
              }}
            >
              {[...Array(10)].flatMap(() => companies).map((company, index) => (
                <div key={index} className="relative w-32 h-16 md:w-48 md:h-24 grayscale opacity-20 hover:opacity-100 transition-all duration-500 flex-none px-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 150px, 200px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto">
        <div 
          className="grid grid-cols-1 md:grid-cols-3 w-full"
          style={{ borderTop: '1px solid #1a1815', borderLeft: '1px solid #1a1815' }}
        >
          {localizedStats.map((stat, index) => {
            const numericValue = parseInt(stat.value.replace(/\D/g, '')) || 0
            const suffix = stat.value.replace(/[0-9]/g, '')

            return (
              <FadeIn key={index} delay={0.2 + (index * 0.1)} className="h-full">
                <div 
                  className="flex flex-col items-center justify-center text-center transition-all duration-300"
                  style={{
                    background: '#0f0e0c',
                    padding: '48px 24px',
                    borderRight: '1px solid #1a1815',
                    borderBottom: '1px solid #1a1815'
                  }}
                >
                  <h3 
                    className="leading-none mb-4 flex items-baseline justify-center"
                    style={{
                      fontSize: 'clamp(48px, 8vw, 80px)',
                      fontWeight: 900,
                      color: '#ffffff',
                      fontFamily: 'var(--font-display)'
                    }}
                  >
                    <Counter value={numericValue} suffix="" />
                    <span style={{ color: '#e5591d' }}>{suffix}</span>
                  </h3>
                  
                  <p 
                    style={{
                      fontSize: '11px',
                      color: '#444444',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>

    </section>
  );
}