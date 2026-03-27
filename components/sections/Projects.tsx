"use client";

import { Marquee } from "../ui/Marquee";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "@/data/projects";
import FadeIn from "@/components/ui/FadeIn";
import LiquidSpotlightButton from "../ui/LiquidSpotlightButton";

export function Projects() {
  return (
    <section id="work" className="bg-brand-black min-h-screen relative z-20 pb-32 border-t-4 border-brand-orange/20">
      <FadeIn delay={0.1}>
        <div className="mb-24 pt-12">
          <Marquee />
        </div>
      </FadeIn>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <FadeIn>
            <h2 className="font-display font-extrabold text-5xl md:text-8xl uppercase text-brand-orange leading-[0.8] tracking-tighter">
              Projetos
              <br />
              <span className="text-brand-cream">Selecionados</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <p className="font-body text-brand-gray max-w-sm text-lg md:text-right pb-2">
              Uma coleção de experiências digitais e sistemas robustos desenvolvidos com foco em performance e escalabilidade.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <ProjectCard
                index={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
                image={project.image}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} direction="up">
          <div className="mt-24 flex flex-col items-center gap-6">
            <p className="font-display text-xs text-brand-gray uppercase tracking-[0.3em]">Quer ver mais?</p>
            <LiquidSpotlightButton href="https://github.com/kauankelvin7" className="!rounded-none border-4 border-brand-orange hover:shadow-[8px_8px_0px_0px_rgba(255,107,0,1)]">
               <span>Ver GitHub Completo</span>
            </LiquidSpotlightButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
