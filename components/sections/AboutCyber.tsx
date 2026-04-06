'use client'

import FadeIn from "@/components/ui/FadeIn"
import { useTranslations } from "next-intl"

export function AboutCyber() {
  const t = useTranslations('AboutCyber');
  const tNav = useTranslations('Nav');

  return (
    <section 
      className="relative z-20 overflow-hidden"
      style={{
        background: '#0c0b09',
        padding: '80px 28px',
        borderBottom: '1px solid #1a1815'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Translated Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <div style={{ width: '24px', height: '1px', background: '#e5591d' }}></div>
            <span 
              style={{
                fontSize: '11px',
                color: '#666666',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif'
              }}
            >
              {tNav('about')} / {t('title1')}
            </span>
          </div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1}>
          <h2 
            className="uppercase text-white mb-20"
            style={{
              fontSize: 'clamp(48px, 8vw, 84px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-display)'
            }}
          >
            {t('title1')} <br />
            <em style={{ fontStyle: 'normal', color: '#e5591d' }}>{t('title2')}</em>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-20 md:gap-40">
          
          {/* Left Column: Body Text */}
          <div className="space-y-10">
            <FadeIn delay={0.2}>
              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: '#777777',
                  fontFamily: 'sans-serif'
                }}
              >
                <strong style={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', fontSize: '12px', display: 'block', marginBottom: '12px', letterSpacing: '0.08em' }}>
                  {t('backend_title')}
                </strong>
                {t('backend_p1')}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: '#777777',
                  fontFamily: 'sans-serif'
                }}
              >
                {t('backend_p2')}
              </p>
            </FadeIn>
          </div>

          {/* Right Column: Key Bullets */}
          <div className="flex flex-col justify-start">
             <ul className="space-y-8">
              {[t('bullet1'), t('bullet2'), t('bullet3')].map((bullet, idx) => (
                <FadeIn key={idx} delay={0.4 + idx * 0.1}>
                  <li className="flex items-start gap-5 group">
                    <div 
                      className="mt-1"
                      style={{ 
                        width: '7px', 
                        height: '7px', 
                        borderRadius: '50%', 
                        background: '#e5591d',
                        boxShadow: '0 0 10px rgba(229, 89, 29, 0.4)'
                      }}
                    />
                    <span 
                      style={{ 
                        fontSize: '14px', 
                        color: '#999999', 
                        fontWeight: 500,
                        lineHeight: 1.3
                      }}
                    >
                      {bullet}
                    </span>
                  </li>
                </FadeIn>
              ))}
            </ul>

            <FadeIn delay={0.8}>
                <div 
                  className="mt-16 pt-10"
                  style={{ borderTop: '1px solid #1a1815' }}
                >
                  <p 
                    style={{
                      fontSize: '10px',
                      color: '#444444',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: '16px'
                    }}
                  >
                    {t('system_status_label')}
                  </p>
                  <div className="flex items-center gap-4">
                      <div 
                        className="animate-pulse"
                        style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} // Changed to green for status
                      />
                      <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {t('system_status_text')}
                      </p>
                  </div>
                </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  )
}