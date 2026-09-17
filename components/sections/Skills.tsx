"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { certificates, skillCategories } from "@/data/skills";
import FadeIn from "@/components/ui/FadeIn";

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="stack" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <FadeIn>
          <span className="eyebrow">{t('title')} {t('subtitle')}</span>
        </FadeIn>

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <FadeIn delay={0.05}>
              <h2 className="section-heading">
                {t('title')} <span className="text-[var(--accent)]">{t('subtitle')}</span>
              </h2>
            </FadeIn>

            <div className="mt-10 space-y-5">
              {skillCategories.map((category, categoryIndex) => (
                <FadeIn key={category.title} delay={0.08 * categoryIndex}>
                  <div className="surface-card p-6">
                    <h3 className="text-sm font-semibold text-white">{category.title}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-[var(--border-soft)] bg-white/[0.025] px-3 py-1.5 text-xs text-[var(--text-soft)]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn delay={0.08}>
              <div className="flex items-end justify-between border-b border-[var(--border-soft)] pb-4">
                <h3 className="text-lg font-semibold text-white">{t('certificates_title')}</h3>
                <span className="text-xs text-[var(--text-muted)]">{t('syncing')}</span>
              </div>
            </FadeIn>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {certificates.map((certificate, index) => (
                <FadeIn key={certificate.id} delay={0.06 * index}>
                  <article className="surface-card overflow-hidden">
                    <div className="relative aspect-[16/10] border-b border-[var(--border-soft)] bg-white">
                      <Image
                        src={certificate.image}
                        alt={`Certificado ${certificate.name}`}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 768px) 100vw, 40vw"
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
      </div>
    </section>
  );
}
