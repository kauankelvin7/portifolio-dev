'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowDownRight, Github } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { AboutModern } from '@/components/sections/AboutModern';
import { Projects } from '@/components/sections/Projects';
import { GitHubSync } from '@/components/sections/GitHubSync';
import { Process } from '@/components/sections/Process';
import { Skills } from '@/components/sections/Skills';
import ContactFooter from '@/components/sections/ContactFooter';
import LazyLoad from '@/components/layout/LazyLoad';
import { useTransition } from '@/app/context/TransitionContext';
import CanvasLoader from '@/components/ui/CanvasLoader';

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <CanvasLoaderTranslate />,
});

function CanvasLoaderTranslate() {
  const t = useTranslations('UI');
  return <CanvasLoader label={t('system_booting')} />;
}

export default function Home() {
  const t = useTranslations('Hero');
  const { startTransition } = useTransition();

  const handleCtaClick = async (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    await startTransition(href);
  };

  return (
    <div className="relative min-h-full w-full bg-[var(--background)] text-[var(--text)]">
      <Header />

      <section id="home" className="relative min-h-[calc(100dvh-68px)] overflow-hidden border-b border-[var(--border-soft)]">
        <div className="absolute inset-0 opacity-80" aria-hidden="true">
          <LazyLoad>
            <Scene />
          </LazyLoad>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,9,0.97)_0%,rgba(12,11,9,0.86)_45%,rgba(12,11,9,0.34)_75%,rgba(12,11,9,0.12)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,9,0.14),rgba(12,11,9,0.65))]" aria-hidden="true" />

        <div className="container-shell relative z-10 flex min-h-[calc(100dvh-68px)] items-end py-16 md:items-center md:py-24">
          <div className="max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.08em] text-[var(--text-muted)]">
              <span className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-2 backdrop-blur-sm">
                {t('role1')}
              </span>
              <span className="hidden h-px w-8 bg-[var(--border)] sm:block" />
              <span>{t('role2')}</span>
            </div>

            <h1 className="max-w-[11ch] font-display text-[clamp(4.2rem,13vw,10rem)] leading-[0.82] tracking-[-0.065em] text-white">
              {t('name1')} <span className="text-[var(--accent)]">{t('name2')}</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-[var(--text-soft)] md:text-lg">
              {t('status')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#work"
                onClick={(event) => handleCtaClick(event, '#work')}
                className="button-primary"
              >
                {t('cta_primary')}
                <ArrowDownRight size={17} aria-hidden="true" />
              </Link>

              <a href="/curriculum/resume.pdf" target="_blank" rel="noopener noreferrer" className="button-secondary">
                {t('cta_secondary')}
              </a>

              <a
                href="https://github.com/kauankelvin7"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
                aria-label="GitHub de Kauan Kelvin"
              >
                <Github size={17} aria-hidden="true" />
                GitHub
              </a>
            </div>

            <p className="mt-10 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              {t('availability')}
            </p>
          </div>
        </div>
      </section>

      <AboutModern />
      <Projects />
      <GitHubSync />
      <Process />
      <Skills />
      <ContactFooter />
    </div>
  );
}
