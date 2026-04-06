"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";

export function Process() {
  const t = useTranslations('ProcessSection');

  const items = [
    t('item1'),
    t('item2'),
    t('item3'),
    t('item4')
  ];

  return (
    <section 
      id="journey" 
      className="relative z-20"
      style={{
        background: '#e5591d',
        padding: '64px 28px',
        borderBottom: '3px solid #0c0b09'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <div style={{ width: '20px', height: '1px', background: '#0c0b09', opacity: 0.3 }}></div>
            <span 
              style={{
                fontSize: '10px',
                color: 'rgba(0,0,0,0.6)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif'
              }}
            >
              {t('eyebrow')}
            </span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          
          {/* Left Column: Title and Description */}
          <div className="flex flex-col">
            <FadeIn delay={0.1}>
               <h2 
                 className="uppercase text-[#0c0b09] mb-8"
                 style={{
                   fontSize: 'clamp(40px, 7vw, 72px)',
                   fontWeight: 900,
                   lineHeight: 0.92,
                   letterSpacing: '-0.02em',
                   fontFamily: 'var(--font-display)'
                 }}
               >
                 ENGINEERING <br />
                 <em style={{ fontStyle: 'normal', color: '#ffffff' }}>& SOLUÇÕES</em>
               </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
               <p 
                 style={{
                   fontSize: '14px',
                   lineHeight: 1.65,
                   color: 'rgba(0,0,0,0.7)',
                   fontFamily: 'sans-serif',
                   maxWidth: '400px'
                 }}
               >
                 Foco em transformar desafios técnicos em aplicações escaláveis com Java e o ecossistema JavaScript moderno. 
                 Sempre priorizando performance e código limpo.
               </p>
            </FadeIn>
          </div>

          {/* Right Column: Numbered List */}
          <div className="flex flex-col gap-8 justify-center">
            {items.map((item, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <div 
                  className="flex items-start gap-6 pb-6"
                  style={{ borderBottom: index < items.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}
                >
                   <span 
                     style={{
                       fontSize: '10px',
                       color: 'rgba(0,0,0,0.4)',
                       fontFamily: 'monospace',
                       paddingTop: '4px'
                     }}
                   >
                     0{index + 1}
                   </span>
                   <p 
                     style={{
                       fontSize: '13px',
                       color: 'rgba(0,0,0,0.7)',
                       lineHeight: 1.5,
                       fontFamily: 'sans-serif',
                       fontWeight: 500
                     }}
                   >
                     {item}
                   </p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}