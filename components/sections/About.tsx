'use client'

import FadeIn from "@/components/ui/FadeIn"
import Counter from "../ui/Counter";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations('About');
  const tSection = useTranslations('AboutSection');

  return (
    <section 
      id="about" 
      className="relative z-20 overflow-hidden"
      style={{
        background: '#0c0b09',
        padding: '64px 28px',
        borderBottom: '1px solid #1a1815'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <div style={{ width: '20px', height: '1px', background: '#ffffff', opacity: 0.3 }}></div>
            <span 
              style={{
                fontSize: '10px',
                color: '#444444',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif'
              }}
            >
              {tSection('eyebrow')}
            </span>
          </div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1}>
          <h2 
            className="uppercase text-white mb-16"
            style={{
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display)'
            }}
          >
            {t('title').split('?')[0]} <em style={{ fontStyle: 'normal', color: '#e5591d' }}>?</em>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          
          {/* Left Column: Body Text */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <p 
                style={{
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: '#555555',
                  fontFamily: 'sans-serif'
                }}
              >
                <strong style={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', fontSize: '11px', display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>
                  {t('badge')}
                </strong>
                {t('p1')}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p 
                style={{
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: '#555555',
                  fontFamily: 'sans-serif'
                }}
              >
                {t('p2')}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div 
                className="pl-6"
                style={{ borderLeft: '1px solid #e5591d' }}
              >
                <p 
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#888888',
                    fontFamily: 'sans-serif',
                    fontStyle: 'italic'
                  }}
                >
                  "{t('quote')}"
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="flex flex-col justify-center">
            <FadeIn delay={0.5}>
              <div 
                className="grid grid-cols-3 w-full"
                style={{ border: '1px solid #1a1815' }}
              >
                <div 
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    background: '#0f0e0c',
                    padding: '24px 16px',
                    borderRight: '1px solid #1a1815'
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                    5<span style={{ color: '#e5591d' }}>º</span>
                  </div>
                  <div style={{ fontSize: '9px', color: '#444444', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                    {t('stats.semester')}
                  </div>
                </div>

                <div 
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    background: '#0f0e0c',
                    padding: '24px 16px',
                    borderRight: '1px solid #1a1815'
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                    20<span style={{ color: '#e5591d' }}>+</span>
                  </div>
                  <div style={{ fontSize: '9px', color: '#444444', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                    Projetos
                  </div>
                </div>

                <div 
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    background: '#0f0e0c',
                    padding: '24px 16px'
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                    3<span style={{ color: '#e5591d' }}>+</span>
                  </div>
                  <div style={{ fontSize: '9px', color: '#444444', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                    {t('stats.code')}
                  </div>
                </div>
              </div>

              {/* Extra badge below the grid */}
              <div 
                className="mt-4 flex items-center justify-between"
                style={{ background: '#0f0e0c', border: '1px solid #1a1815', padding: '12px 20px', borderRadius: '4px' }}
              >
                <div style={{ fontSize: '10px', color: '#444444', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Curiosidade</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#e5591d' }}>∞</div>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}