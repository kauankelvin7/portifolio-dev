import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { certificates, skillCategories } from "@/features/portfolio/content/skills";
import { syncGitHubPortfolio } from "@/features/github-sync/sync";

const stackCopy = {
  pt: {
    live: "A ordem é recalculada a partir das linguagens, tópicos e arquivos de configuração dos meus repositórios públicos. Ela mostra recorrência de uso, não porcentagem de domínio.",
    fallback: "Stack mantida a partir da seleção curada enquanto a sincronização do GitHub está indisponível.",
  },
  en: {
    live: "The order is recalculated from languages, topics and configuration files across my public repositories. It reflects recurring use, not a proficiency percentage.",
    fallback: "The curated stack remains visible while GitHub synchronization is unavailable.",
  },
  es: {
    live: "El orden se recalcula a partir de lenguajes, temas y archivos de configuración de mis repositorios públicos. Refleja uso recurrente, no un porcentaje de dominio.",
    fallback: "La selección curada se mantiene visible mientras la sincronización con GitHub no está disponible.",
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
  const marqueeSkills = [...skills, ...skills];

  return (
    <section id="stack" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <span className="eyebrow">{t("title")} {t("subtitle")}</span>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div className="motion-reveal">
            <h2 className="section-heading">{t("title")} <span className="text-[var(--accent)]">{t("subtitle")}</span></h2>
          </div>
          <div className="motion-reveal lg:justify-self-end">
            <p className="max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              {github.degraded ? copy.fallback : copy.live}
            </p>
          </div>
        </div>

        <div className="stack-marquee mt-12 overflow-hidden border-y border-[var(--border-soft)] py-5 motion-reveal">
          <div className="stack-marquee-track flex w-max items-center gap-3 pr-3">
            {marqueeSkills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="flex min-w-max items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5" aria-hidden={index >= skills.length}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-[10px] font-bold uppercase text-[var(--accent)]">
                  {skill.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2)}
                </span>
                <span className="text-sm font-medium text-[var(--text-soft)]">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 motion-reveal">
          <div className="flex items-end justify-between border-b border-[var(--border-soft)] pb-4">
            <h3 className="text-lg font-semibold text-white">{t("certificates_title")}</h3>
            <span className="text-xs text-[var(--text-muted)]">{t("syncing")}</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((certificate) => (
              <article key={certificate.id} className="surface-card overflow-hidden transition-colors hover:border-[var(--accent-line)]">
                <div className="relative aspect-[16/10] border-b border-[var(--border-soft)] bg-[#edf1e9]">
                  <Image src={certificate.image} alt={`Certificado ${certificate.name}`} fill className="object-contain p-3" sizes="(max-width: 768px) 100vw, 25vw" />
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

      <style>{`
        .stack-marquee-track {
          animation: stack-scroll 34s linear infinite;
          will-change: transform;
        }
        .stack-marquee:hover .stack-marquee-track {
          animation-play-state: paused;
        }
        @keyframes stack-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .stack-marquee { overflow-x: auto; }
          .stack-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
