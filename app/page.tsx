import Link from 'next/link';
import { ArrowDownRight, Github } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { AboutModern } from '@/components/sections/AboutModern';
import { Projects } from '@/components/sections/Projects';
import { Process } from '@/components/sections/Process';
import { Skills } from '@/components/sections/Skills';
import ContactFooter from '@/components/sections/ContactFooter';

const heroStack = [
  ['01', 'Java / Spring Boot'],
  ['02', 'REST APIs / PostgreSQL'],
  ['03', 'Python / Automação'],
  ['04', 'React / TypeScript'],
];

export default async function Home() {
  const t = await getTranslations('Hero');

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text)]">
      <Header />

      <section id="home" className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="container-shell relative z-10 grid min-h-[calc(100svh-72px)] items-center gap-14 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-20">
          <div className="max-w-4xl">
            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.08em] text-[var(--text-muted)]">
              <span className="status-pill">{t('role1')}</span>
              <span className="hidden h-px w-8 bg-[var(--border)] sm:block" />
              <span>{t('role2')}</span>
            </div>

            <h1 className="hero-title">
              {t('name1')} <span>{t('name2')}</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--text-soft)] md:text-lg md:leading-8">
              {t('status')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#work" className="button-primary">
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

            <div className="mt-10 flex items-center gap-3 text-sm leading-6 text-[var(--text-muted)]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(232,97,42,0.55)]" />
              <span>{t('availability')}</span>
            </div>
          </div>

          <div className="hero-console" aria-label="Tecnologias em foco">
            <div className="hero-console__topbar">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>kauan.dev / focus</span>
            </div>

            <div className="hero-console__body">
              <div className="hero-console__mark" aria-hidden="true">K</div>
              <div className="relative z-10 space-y-2">
                {heroStack.map(([index, stack]) => (
                  <div key={index} className="hero-console__row">
                    <span>{index}</span>
                    <strong>{stack}</strong>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-10 grid grid-cols-3 gap-3 border-t border-[var(--border-soft)] pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-xs">
                <span>Back-end</span>
                <span>Automation</span>
                <span>Web</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutModern />
      <Projects />
      <Process />
      <Skills />
      <ContactFooter />
    </div>
  );
}
