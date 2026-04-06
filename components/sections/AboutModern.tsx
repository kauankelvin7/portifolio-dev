"use client";

import FadeIn from "@/components/ui/FadeIn";
import { useTranslations } from "next-intl";

export function AboutModern() {
  const t = useTranslations('AboutModern');
  const tOld = useTranslations('About');
  const tNav = useTranslations('Nav');

  return (
    <section 
      id="about"
      className="relative z-20 overflow-hidden"
      style={{
        background: '#0c0b09',
        padding: '100px 28px',
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
            className="uppercase text-white mb-16"
            style={{
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display)'
            }}
          >
            {t('title1')} <br />
            <em style={{ fontStyle: 'normal', color: '#e5591d' }}>{t('title2')}</em>
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
                  {t('present')}
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
                className="pl-6 mt-8"
                style={{ borderLeft: '1px solid #e5591d' }}
              >
                <p 
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#888888',
                    fontFamily: 'sans-serif',
                    fontStyle: 'italic'
                  }}
                >
                  "{tOld('quote')}"
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Key Bullets */}
          <div className="flex flex-col justify-center">
             <ul className="space-y-6">
              {[t('bullet1'), t('bullet2'), t('bullet3')].map((bullet, idx) => (
                <FadeIn key={idx} delay={0.4 + idx * 0.1}>
                  <li className="flex items-center gap-4 group">
                    <div 
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e5591d' }}
                    />
                    <span style={{ fontSize: '13px', color: '#aaaaaa', fontWeight: 500 }}>{bullet}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>

            <FadeIn delay={0.7}>
              <div 
                className="mt-12 pt-8"
                style={{ borderTop: '1px solid #1a1815' }}
              >
                <p 
                  style={{
                    fontSize: '10px',
                    color: '#444444',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  {t('philosophy_label')}
                </p>
                <p style={{ fontSize: '13px', color: '#888888', fontStyle: 'italic' }}>
                  "{t('philosophy_text')}"
                </p>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
