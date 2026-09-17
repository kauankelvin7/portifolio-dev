import { getTranslations } from "next-intl/server";

export async function JourneySection() {
  const t = await getTranslations("ProcessSection");
  const items = [t("item1"), t("item2"), t("item3"), t("item4")];

  return (
    <section id="journey" className="section-shell bg-[var(--background)]">
      <div className="container-shell">
        <span className="eyebrow">{t("eyebrow")}</span>
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="motion-reveal">
            <h2 className="section-heading">{t("title1")} <span className="text-[var(--accent)]">{t("title2")}</span></h2>
            <p className="body-copy mt-8 max-w-lg">{t("description")}</p>
          </div>
          <div className="motion-reveal border-t border-[var(--border-soft)]">
            {items.map((item, index) => (
              <div key={item} className="grid grid-cols-[44px_1fr] gap-3 border-b border-[var(--border-soft)] py-6 md:grid-cols-[64px_1fr]">
                <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
                <p className="text-base leading-7 text-[var(--text-soft)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
