"use client";

import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  const t = useTranslations("Projects");
  const tSection = useTranslations("ProjectsSection");

  return (
    <section id="work" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <FadeIn>
          <span className="eyebrow">{tSection('eyebrow')}</span>
        </FadeIn>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <FadeIn delay={0.05}>
            <h2 className="section-heading">
              {t('title')} <span className="text-[var(--accent)]">{t('subtitle')}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-copy max-w-xl lg:justify-self-end">{t('description')}</p>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={Math.min(index * 0.06, 0.24)} className="h-full">
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

        <FadeIn delay={0.12}>
          <div className="mt-10 flex justify-start">
            <a
              href="https://github.com/kauankelvin7"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              <Github size={17} aria-hidden="true" />
              {t('github_button')}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
