"use client";

import { useTranslations } from "next-intl";
import { Marquee } from "../ui/Marquee";
import { ProjectCard } from "../ui/ProjectCard";
import FadeIn from "@/components/ui/FadeIn";
import { projects } from "@/data/projects";

export function Projects() {
  const t = useTranslations('Projects');
  const tSection = useTranslations('ProjectsSection');

  return (
    <section 
      id="work" 
      className="relative z-20"
      style={{
        background: '#0c0b09',
        padding: '80px 28px',
        borderBottom: '1px solid #1a1815'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <div style={{ width: '20px', height: '1px', background: '#e5591d', opacity: 0.6 }}></div>
            <span 
              style={{
                fontSize: '11px',
                color: '#666666',
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12">
          <FadeIn delay={0.1}>
            <h2 
              className="uppercase text-white"
              style={{
                fontSize: 'clamp(40px, 7vw, 72px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-display)'
              }}
            >
              {t('title')} <br />
              <em style={{ fontStyle: 'normal', color: '#e5591d' }}>{t('subtitle')}</em>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p 
              className="max-w-sm"
              style={{
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#777777',
                fontFamily: 'sans-serif'
              }}
            >
              {t('description')}
            </p>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-16">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <ProjectCard
                projectId={project.id.toString()}
                translateKey={project.translateKey}
                tags={project.tags}
                image={project.image}
                link={project.link}
              />
            </FadeIn>
          ))}
        </div>

        {/* View More Github Button */}
        <FadeIn delay={0.3}>
          <div className="flex justify-center mb-24">
            <a 
              href="https://github.com/kauankelvin7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid #1e1c19',
                padding: '16px 32px',
                borderRadius: '8px',
                color: '#888888',
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#e5591d';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.background = 'rgba(229, 89, 29, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1e1c19';
                e.currentTarget.style.color = '#888888';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {t('github_button')}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </FadeIn>

        {/* Ticker at the bottom of projects section */}
        <Marquee />
      </div>
    </section>
  );
}
