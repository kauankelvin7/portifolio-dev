import { getTranslations } from "next-intl/server";

export async function AboutModern() {
  const t = await getTranslations("AboutModern");
  const tAbout = await getTranslations("About");

  return (
    <section id="about" className="section-shell bg-[var(--background)]">
      <div className="container-shell">
        <span className="eyebrow">{t('present')}</span>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="section-heading">
              {t('title1')} <span className="text-[var(--accent)]">{t('title2')}</span>
            </h2>

            <div className="mt-10 max-w-2xl space-y-6">
              <p className="body-copy">{t('p1')}</p>
              <p className="body-copy">{t('p2')}</p>
            </div>

            <blockquote className="mt-10 max-w-2xl border-l-2 border-[var(--accent)] pl-5 text-base leading-7 text-[var(--text-muted)]">
              “{tAbout('quote')}”
            </blockquote>
          </div>

          <div className="surface-card self-start p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
              {t('philosophy_label')}
            </p>
            <p className="mt-4 text-lg leading-8 text-[var(--text)]">
              {t('philosophy_text')}
            </p>

            <div className="mt-8 space-y-3 border-t border-[var(--border-soft)] pt-6">
              {[t('bullet1'), t('bullet2'), t('bullet3')].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span className="text-sm leading-6 text-[var(--text-soft)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
