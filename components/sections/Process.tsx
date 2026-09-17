"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";

export function Process() {
  const t = useTranslations("ProcessSection");
  const items = [t('item1'), t('item2'), t('item3'), t('item4')];

  return (
    <section id="journey" className="section-shell bg-[var(--background)]">
      <div className="container-shell">
        <FadeIn>
          <span className="eyebrow">{t('eyebrow')}</span>
        </FadeIn>

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <FadeIn delay={0.05}>
              <h2 className="section-heading">
                {t('title1')} <span className="text-[var(--accent)]">{t('title2')}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="body-copy mt-8 max-w-lg">{t('description')}</p>
            </FadeIn>
          </div>

          <div className="border-t border-[var(--border-soft)]">
            {items.map((item, index) => (
              <FadeIn key={item} delay={0.06 * index}>
                <div className="grid grid-cols-[44px_1fr] gap-3 border-b border-[var(--border-soft)] py-6 md:grid-cols-[64px_1fr]">
                  <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
                  <p className="text-base leading-7 text-[var(--text-soft)]">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
