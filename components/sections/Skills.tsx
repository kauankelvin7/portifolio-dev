"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { skillCategories, certificates } from "@/data/skills";
import FadeIn from "@/components/ui/FadeIn";

export function Skills() {
  const t = useTranslations('Skills');

  return (
    <section 
      id="stack" 
      className="relative z-20 overflow-hidden"
      style={{
        background: '#0c0b09',
        padding: '100px 28px', // Increased padding for impact
        borderBottom: '1px solid #1a1815'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-16">
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
              TECNOLOGIAS & CERTIFICAÇÕES
            </span>
          </div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1}>
          <h2 
            className="uppercase text-white mb-24"
            style={{
              fontSize: 'clamp(48px, 8vw, 84px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-display)'
            }}
          >
            {t('title')} <br />
            <em style={{ fontStyle: 'normal', color: '#e5591d' }}>{t('subtitle')}</em>
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* Skills Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {skillCategories.map((category, index) => (
                 <FadeIn key={category.title} delay={index * 0.1}>
                   <div 
                     className="transition-all duration-300 group"
                     style={{
                       background: '#131210',
                       border: '1px solid #1e1c19',
                       padding: '40px',
                       borderRadius: '12px'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = '#e5591d';
                       e.currentTarget.style.transform = 'translateY(-4px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = '#1e1c19';
                       e.currentTarget.style.transform = 'translateY(0px)';
                     }}
                   >
                     <h3 
                       className="uppercase mb-8 inline-block"
                       style={{
                         fontSize: '13px',
                         fontWeight: 900,
                         color: '#e5591d',
                         letterSpacing: '0.1em',
                         borderBottom: '2px solid #e5591d',
                         paddingBottom: '6px'
                       }}
                     >
                       {category.title === "// stack" ? "// STACK" : "// RESUMO"}
                     </h3>
                     <ul 
                       className="space-y-5"
                       style={{
                         fontSize: '16px',
                         fontWeight: 500,
                         color: '#999999',
                         fontFamily: 'var(--font-display)',
                         textTransform: 'uppercase'
                       }}
                     >
                        {category.skills.map(skill => (
                          <li key={skill} className="flex items-center gap-4 transition-colors hover:text-white cursor-default">
                             <div className="transition-all group-hover:scale-125" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e5591d', opacity: 0.6 }} />
                             {skill}
                          </li>
                        ))}
                     </ul>
                   </div>
                 </FadeIn>
               ))}
            </div>
          </div>

          {/* Certificates Column */}
          <div className="w-full">
            <FadeIn delay={0.2}>
                <div 
                  className="flex items-end justify-between mb-12 pb-6"
                  style={{ borderBottom: '1px solid #1a1815' }}
                >
                  <h3 
                    className="uppercase"
                    style={{
                      fontSize: '18px',
                      fontWeight: 900,
                      color: '#ffffff',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {t('certificates_title')}
                  </h3>
                  <span 
                    className="animate-pulse"
                    style={{
                      fontSize: '10px',
                      color: '#e5591d',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t('syncing')}
                  </span>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {certificates.map((cert, index) => (
                <FadeIn key={`cert-${index}`} delay={0.3 + (index * 0.1)}>
                    <div
                      className="relative group aspect-video overflow-hidden cursor-pointer transition-all duration-300"
                      style={{
                        background: '#131210',
                        border: '1px solid #1e1c19',
                        borderRadius: '10px',
                        opacity: cert.status === 'locked' ? 0.4 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (cert.status !== 'locked') {
                          e.currentTarget.style.borderColor = '#e5591d';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#1e1c19';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      {cert.image && (
                        <div className="relative w-full h-full p-4">
                            <Image 
                              src={cert.image}
                              alt={cert.name}
                              fill
                              className={`object-contain transition-all duration-700
                                ${cert.status === 'locked' 
                                  ? 'grayscale blur-[2px]'
                                  : 'grayscale group-hover:grayscale-0'
                                }`}
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                      )}

                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity p-5 text-center z-30"
                        style={{ background: 'linear-gradient(to top, #0c0b09, transparent)' }}
                      >
                          <p 
                            className="uppercase leading-tight mb-2"
                            style={{
                              fontSize: '12px',
                              fontWeight: 900,
                              color: '#ffffff',
                              fontFamily: 'var(--font-display)'
                            }}
                          >
                            {cert.status === 'locked' ? '???' : cert.name}
                          </p>
                          <p 
                            className="uppercase tracking-widest"
                            style={{
                              fontSize: '10px',
                              color: '#e5591d',
                              fontWeight: 700
                            }}
                          >
                            {cert.status === 'locked' ? t('resource_locked') : cert.issuer}
                          </p>
                      </div>

                      <div className="absolute top-3 right-3 z-30">
                          {cert.status === 'locked' ? (
                            <span 
                              style={{
                                fontSize: '9px',
                                background: '#0c0b09',
                                padding: '3px 8px',
                                color: '#444444',
                                border: '1px solid #1a1815',
                                borderRadius: '4px',
                                textTransform: 'uppercase'
                              }}
                            >
                              {t('locked')}
                            </span>
                          ) : (
                            <span 
                              style={{
                                fontSize: '9px',
                                background: '#131210',
                                padding: '3px 8px',
                                color: '#e5591d',
                                border: '1px solid #e5591d',
                                borderRadius: '4px',
                                fontWeight: 900,
                                textTransform: 'uppercase'
                              }}
                            >
                              {t('verified')}
                            </span>
                          )}
                      </div>
                      
                    </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}