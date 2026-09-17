import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { certificates, skillCategories } from "@/features/portfolio/content/skills";

export async function SkillsSection() {
  const t = await getTranslations("Skills");

  return (
    <section id="stack" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <span className="eyebrow">{t("title")} {t("subtitle")}</span>
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="section-heading">{t("title")} <span className="text-[var(--accent)]">{t("subtitle")}</span></h2>
            <div className="mt-10 space-y-5">
              {skillCategories.map((category) => (
                <div key={category.title} className="surface-card p-6">
                  <h3 className="text-sm font-semibold text-white">{category.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-[var(--border-soft)] bg-white/[0.025] px-3 py-1.5 text-xs text-[var(--text-soft)]">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between border-b border-[var(--border-soft)] pb-4">
              <h3 className="text-lg font-semibold text-white">{t("certificates_title")}</h3>
              <span className="text-xs text-[var(--text-muted)]">{t("syncing")}</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {certificates.map((certificate) => (
                <article key={certificate.id} className="surface-card overflow-hidden">
                  <div className="relative aspect-[16/10] border-b border-[var(--border-soft)] bg-white">
                    <Image src={certificate.image} alt={`Certificado ${certificate.name}`} fill className="object-contain p-3" sizes="(max-width: 768px) 100vw, 40vw" />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold leading-6 text-white">{certificate.name}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{certificate.issuer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
