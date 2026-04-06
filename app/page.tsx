'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { AboutModern } from "@/components/sections/AboutModern";
import { AboutCyber } from "@/components/sections/AboutCyber";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Companies } from "@/components/sections/Companies";
import { Skills } from "@/components/sections/Skills";
import ContactFooter from "@/components/sections/ContactFooter";
import LazyLoad from "@/components/layout/LazyLoad";
import { useTransition } from "@/app/context/TransitionContext";
import CanvasLoader from '@/components/ui/CanvasLoader';

// We wrap the dynamic imports with a loading fallback that passes the translated label
// This ensures that the loader shows the correct language during the initial chunk loading
const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
  loading: () => <CanvasLoaderTranslate />,
});

const SceneMacbook = dynamic(() => import("@/components/3d/SceneMacbook"), {
  ssr: false,
  loading: () => <CanvasLoaderTranslate />,
});

const SceneCyber = dynamic(() => import("@/components/3d/SceneCyber"), {
  ssr: false,
  loading: () => <CanvasLoaderTranslate />,
});

// Helper component for translated loader
function CanvasLoaderTranslate() {
  const t = useTranslations('UI');
  return <CanvasLoader label={t('system_booting')} />;
}

export default function Home() {
  const t = useTranslations('Hero');
  const tUI = useTranslations('UI');
  const tCompanies = useTranslations('Companies');
  const { startTransition } = useTransition();

  const handleCtaClick = async (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    await startTransition(href);
  };

  return (
    <div className="relative w-full bg-[#0c0b09] text-white font-body">
      
      <Header />

      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-[28px] py-[64px]" style={{ background: '#0c0b09', borderBottom: '1px solid #1a1815' }}>
        <div id="home" className="absolute inset-0 z-10">
           <LazyLoad>
            <Scene />
          </LazyLoad>
        </div>

        {/* Top Left Layout Texts */}
        <div className="absolute z-10 pointer-events-none w-full px-6 top-24 flex justify-between items-start md:top-12 md:left-12 md:right-12 md:px-0">
          <div className="font-display p-0 md:p-4 text-xs md:text-sm font-bold tracking-wider uppercase flex flex-col min-w-[120px] md:min-w-[180px] text-white/50">
            <p className="text-left whitespace-nowrap">{t('role1')}</p>
            <p className="text-left whitespace-nowrap">{t('role2')}</p>
          </div>
        </div>

        <div className="relative z-20 mt-auto mb-12 text-center flex flex-col items-center justify-center w-full max-w-5xl px-4">
           
           {/* Availability Pill */}
           <div 
             className="mb-8 items-center gap-[7px]"
             style={{ display: 'inline-flex', border: '1px solid #1e1c19', borderRadius: '999px', padding: '5px 14px' }}
           >
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5591d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e5591d]"></span>
             </div>
             <span style={{ fontSize: '10px', color: '#888888', letterSpacing: '0.1em', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
               {t('availability')}
             </span>
           </div>

           <h1 
             className="uppercase text-white overflow-hidden text-balance" 
             style={{ fontSize: 'clamp(72px, 15vw, 150px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em', fontFamily: 'var(--font-display)' }}
           >
            {t('name1')} <em style={{ fontStyle: 'normal', color: '#e5591d' }}>{t('name2')}</em>
          </h1>
          <p className="mt-12 mb-12" style={{ fontSize: '13px', fontWeight: 400, color: '#555555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {t('status')}
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 relative z-30 pointer-events-auto">
             <Link 
               href="#work"
               onClick={(e) => handleCtaClick(e, '#work')}
               style={{ background: '#e5591d', color: '#ffffff', padding: '14px 28px', borderRadius: '6px', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s' }}
               className="hover:shadow-[0_0_20px_rgba(229,89,29,0.3)] hover:scale-105 active:scale-95"
             >
               {t('cta_primary')}
             </Link>
             <a 
               href="/curriculum/resume.pdf"
               target="_blank"
               style={{ background: 'transparent', color: '#aaaaaa', border: '1px solid #2a2825', padding: '14px 28px', borderRadius: '6px', fontSize: '12px', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s' }}
               className="hover:border-[#aaaaaa] hover:text-[#ffffff] active:scale-95"
             >
               {t('cta_secondary')}
             </a>
          </div>

          {/* Stats Row */}
          <div 
             className="w-full relative z-30 hidden md:grid"
             style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid #1a1815', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}
          >
             <div className="flex flex-col items-center">
                <div style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-display)' }}>3<span style={{ color: '#e5591d' }}>+</span></div>
                <div style={{ fontSize: '9px', color: '#888888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tCompanies('stat1')}</div>
             </div>
             <div className="flex flex-col items-center">
                <div style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-display)' }}>20<span style={{ color: '#e5591d' }}>+</span></div>
                <div style={{ fontSize: '9px', color: '#888888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tCompanies('stat2')}</div>
             </div>
             <div className="flex flex-col items-center">
                <div style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-display)' }}>5<span style={{ color: '#e5591d' }}>º</span></div>
                <div style={{ fontSize: '9px', color: '#888888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tCompanies('stat3')}</div>
             </div>
             <div className="flex flex-col items-center">
                <div style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-display)' }}>100<span style={{ color: '#e5591d' }}>%</span></div>
                <div style={{ fontSize: '9px', color: '#888888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lighthouse</div>
             </div>
          </div>
        </div>
      </section>

      <AboutModern />

      {/* 3D Scene Section */}
      <section className="relative w-full h-[60vh] md:h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0f0e0c', borderBottom: '1px solid #1a1815' }}>
        <LazyLoad>
          <SceneMacbook />
        </LazyLoad>
      </section>
      
      {/* 3D Scene Section */}
      <section className="relative w-full h-[60vh] md:h-screen flex items-center justify-center overflow-hidden" style={{ background: '#131210', borderBottom: '1px solid #1a1815' }}>
        <LazyLoad>
          <SceneCyber />
        </LazyLoad> 
      </section>

      <AboutCyber />
      
      <Projects />
      <Process />
      <Companies />
      <Skills />
      
      <ContactFooter />
    </div>
  );
}