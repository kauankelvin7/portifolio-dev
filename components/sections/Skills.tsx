"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { certificates, skillCategories } from "@/data/skills";
import FadeIn from "@/components/ui/FadeIn";
import { useGitHubPortfolio } from "@/hooks/useGitHubPortfolio";

const helperCopy = {
  pt: {
    label: "Stack observada nos repositórios",
    description: "A lista se reorganiza conforme as tecnologias aparecem com mais frequência nos meus projetos públicos. Não representa nível ou porcentagem de domínio.",
  },
  en: {
    label: "Stack observed across repositories",
    description: "This list reorganizes as technologies appear more often in my public projects. It is not a skill-level or proficiency percentage.",
  },
  es: {
    label: "Stack observada en los repositorios",
    description: "La lista se reorganiza según las tecnologías que aparecen con más frecuencia en mis proyectos públicos. No representa nivel ni porcentaje de dominio.",
  },
} as const;

export function Skills() {
  const t = useTranslations("Skills");
  const locale = useLocale() as keyof typeof helperCopy;
  const copy = helperCopy[locale] ?? helperCopy.pt;
  const { data } = useGitHubPortfolio();

  const fallbackSkills = [...new Set(skillCategories.flatMap((category) => category.skills))];
  const syncedSkills = data?.stacks.map((stack) => stack.name) ?? [];
  const skills = syncedSkills.length >= 4 ? syncedSkills : fallbackSkills;
  const marqueeSkills = [...skills, ...skills];

  return (
    <section id="stack" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <FadeIn>
          <span className="eyebrow">{t('title')} {t('subtitle')}</span>
        </FadeIn>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <FadeIn delay={0.05}>
            <h2 className="section-heading">
              {t('title')} <span className="text-[var(--accent)]">{t('subtitle')}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="lg:justify-self-end">
              <p className="text-sm font-semibold text-white">{copy.label}</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">{copy.description}</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <div className="stack-marquee mt-12 overflow-hidden border-y border-[var(--border-soft)] py-5">
            <div className="stack-marquee-track flex w-max items-center gap-3 pr-3">
              {marqueeSkills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="flex min-w-max items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5"
                  aria-hidden={index >= skills.length}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-[10px] font-bold uppercase text-[var(--accent)]">
                    {skill.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2)}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-soft)]">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mt-16">
          <FadeIn delay={0.08}>
            <div className="flex items-end justify-between border-b border-[var(--border-soft)] pb-4">
              <h3 className="text-lg font-semibold text-white">{t('certificates_title')}</h3>
              <span className="text-xs text-[var(--text-muted)]">{t('syncing')}</span>
            </div>
          </FadeIn>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((certificate, index) => (
              <FadeIn key={certificate.id} delay={0.06 * index}>
                <article className="surface-card overflow-hidden">
                  <div className="relative aspect-[16/10] border-b border-[var(--border-soft)] bg-white">
                    <Image
                      src={certificate.image}
                      alt={`Certificado ${certificate.name}`}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold leading-6 text-white">{certificate.name}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{certificate.issuer}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
