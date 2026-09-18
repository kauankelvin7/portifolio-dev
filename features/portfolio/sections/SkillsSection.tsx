import { getLocale, getTranslations } from "next-intl/server";
import { certificates, skillCategories } from "@/features/portfolio/content/skills";
import { syncGitHubPortfolio } from "@/features/github-sync/sync";
import { StackMark } from "@/features/portfolio/components/StackMark";

const stackCopy = {
  pt: {
    live: "A ordem reflete o uso recorrente nos meus repositórios públicos; não é uma porcentagem de domínio.",
    fallback: "Seleção curada enquanto a sincronização do GitHub está indisponível.",
    certificateAction: "Concluído",
  },
  en: {
    live: "The order reflects recurring use across my public repositories; it is not a proficiency percentage.",
    fallback: "Curated selection while GitHub synchronization is unavailable.",
    certificateAction: "Completed",
  },
  es: {
    live: "El orden refleja el uso recurrente en mis repositorios públicos; no representa porcentaje de dominio.",
    fallback: "Selección curada mientras la sincronización con GitHub no está disponible.",
    certificateAction: "Concluido",
  },
} as const;

export async function SkillsSection() {
  const [t, locale, github] = await Promise.all([
    getTranslations("Skills"),
    getLocale(),
    syncGitHubPortfolio(),
  ]);
  const copy = stackCopy[locale as keyof typeof stackCopy] ?? stackCopy.pt;

  const fallbackSkills = [...new Set(skillCategories.flatMap((category) => category.skills))];
  const syncedSkills = github.stacks.map((stack) => stack.name);
  const skills = syncedSkills.length >= 4 ? syncedSkills : fallbackSkills;
  const loop = [...skills, ...skills];

  return (
    <section id="stack" className="editorial-section stack-v4">
      <div className="container-shell">
        <div className="section-intro">
          <span className="section-index">05</span>
          <span className="section-kicker">{t("title")}</span>
        </div>

        <div className="stack-v4__heading">
          <h2 className="editorial-heading">{t("title")} <span>{t("subtitle")}</span></h2>
          <p>{github.degraded ? copy.fallback : copy.live}</p>
        </div>
      </div>

      <div className="stack-v4__marquee reveal-stagger" aria-label={t("title")}>
        <div className="stack-v4__track">
          {loop.map((skill, index) => (
            <div className="stack-v4__item" key={`${skill}-${index}`} aria-hidden={index >= skills.length}>
              <span className="stack-v4__icon"><StackMark name={skill} /></span>
              <strong>{skill}</strong>
              <span className="stack-v4__slash" aria-hidden="true">/</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-shell">
        <div className="credentials-v4 reveal-stagger">
          <div className="credentials-v4__heading">
            <h3>{t("certificates_title")}</h3>
            <span>{t("syncing")}</span>
          </div>

          <div className="credentials-v4__list">
            {certificates.map((certificate, index) => (
              <div key={certificate.id} className="credentials-v4__row">
                <span className="credentials-v4__number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{certificate.name}</strong>
                <span>{certificate.issuer}</span>
                <span>{copy.certificateAction}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
