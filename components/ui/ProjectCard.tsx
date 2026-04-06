"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ProjectProps {
  projectId: string;
  translateKey: string;
  tags: string[];
  image?: string;
  link: string;
}

export function ProjectCard({ projectId, translateKey, tags, image, link }: ProjectProps) {
  const t = useTranslations('ProjectsSection');

  return (
    <div 
      className="group relative overflow-hidden transition-all duration-500"
      style={{
        background: '#131210',
        border: '1px solid #1e1c19',
        borderRadius: '16px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#e5591d';
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(229, 89, 29, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1e1c19';
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      
      <Link 
        href={link} 
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
        aria-label={t(`${translateKey}.title`)}
      >
        <span className="sr-only">View {t(`${translateKey}.title`)}</span>
      </Link>

      <div className="flex flex-col h-full relative z-10">
        
        {/* Card Thumbnail Area */}
             <div className="relative w-full flex items-center justify-center transition-all duration-700 overflow-hidden"
          style={{ 
            height: '280px', // Restored substantial size
            background: '#0f0e0c', 
            borderBottom: '1px solid #1a1815' 
          }}
        >
           {image && (
             <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
               <Image
                 src={image}
                 alt={t(`${translateKey}.title`)}
                 fill
                 className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
               <div className="absolute inset-0 bg-linear-to-t from-[#0c0b09] via-transparent to-transparent opacity-60" />
             </div>
           )}

           {/* Meta Label Overlay (Visible when no hover) */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
              <span
                style={{
                  fontSize: '11px',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {t(`${translateKey}.category`)}
              </span>
           </div>

           {/* Orange Dot */}
           <div 
             className="absolute"
             style={{ 
               top: '20px', 
               right: '20px', 
               width: '8px', 
               height: '8px', 
               borderRadius: '50%', 
               background: '#e5591d',
               boxShadow: '0 0 15px #e5591d',
               zIndex: 20
             }}
           />
        </div>

        {/* Card Body */}
        <div className="p-8 pb-10 flex flex-col flex-1">
          <h3 
            className="uppercase mb-4 text-white transition-colors group-hover:text-brand-orange"
            style={{
              fontSize: '22px', 
              fontWeight: 900,
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-display)'
            }}
          >
            {t(`${translateKey}.title`)}
          </h3>

          <p 
            className="mb-8"
            style={{
              fontSize: '14px', 
              color: '#888888',
              lineHeight: 1.6,
              fontFamily: 'sans-serif'
            }}
          >
            {t(`${translateKey}.description`)}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-[#1e1c19]">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="font-mono flex items-center justify-center transition-all bg-[#0c0b09] border border-[#1e1c19]"
                style={{
                  fontSize: '10px',
                  color: '#555555',
                  borderRadius: '4px',
                  padding: '4px 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}