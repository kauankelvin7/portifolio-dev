import { ArrowUpRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { syncGitHubPortfolio } from "./sync";

const copy = {
  pt: {
    eyebrow: "GitHub sync",
    title: "Atividade que entra sozinha",
    description: "O portfólio lê repositórios elegíveis, tecnologias recorrentes e contribuições open source do meu GitHub público.",
    repos: "Repositórios",
    contributions: "Open source",
    emptyRepos: "Nenhum repositório novo elegível por enquanto.",
    emptyContributions: "Nenhuma nova contribuição externa detectada por enquanto.",
  },
  en: {
    eyebrow: "GitHub sync",
    title: "Activity that updates itself",
    description: "The portfolio reads eligible repositories, recurring technologies and open-source contributions from my public GitHub.",
    repos: "Repositories",
    contributions: "Open source",
    emptyRepos: "No new eligible repository right now.",
    emptyContributions: "No new external contribution detected right now.",
  },
  es: {
    eyebrow: "GitHub sync",
    title: "Actividad que se actualiza sola",
    description: "El portafolio lee repositorios elegibles, tecnologías recurrentes y contribuciones open source desde mi GitHub público.",
    repos: "Repositorios",
    contributions: "Open source",
    emptyRepos: "No hay repositorios nuevos elegibles por ahora.",
    emptyContributions: "No se detectaron nuevas contribuciones externas por ahora.",
  },
} as const;

function formatMonth(value: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

export async function GitHubSyncSection() {
  const [locale, data] = await Promise.all([getLocale(), syncGitHubPortfolio()]);
  const t = copy[locale as keyof typeof copy] ?? copy.pt;

  if (data.degraded && data.projects.length === 0 && data.contributions.length === 0) return null;

  return (
    <section className="editorial-section github-log" aria-labelledby="github-sync-heading">
      <div className="container-shell">
        <div className="section-intro">
          <span className="section-index">03</span>
          <span className="section-kicker">{t.eyebrow}</span>
        </div>

        <div className="github-log__heading">
          <h2 id="github-sync-heading" className="editorial-heading">{t.title}</h2>
          <p>{t.description}</p>
        </div>

        <div className="github-log__columns">
          <div>
            <div className="github-log__label">{t.repos}</div>
            <div className="github-log__list">
              {data.projects.length ? data.projects.slice(0, 5).map((project) => (
                <a key={project.id} href={project.url} target="_blank" rel="noreferrer" className="github-log__row">
                  <span className="github-log__date">{formatMonth(project.updatedAt, locale)}</span>
                  <span className="github-log__main">
                    <strong>{project.title}</strong>
                    <span>{project.description || project.tags.slice(0, 3).join(" / ")}</span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )) : <p className="github-log__empty">{t.emptyRepos}</p>}
            </div>
          </div>

          <div>
            <div className="github-log__label">{t.contributions}</div>
            <div className="github-log__list">
              {data.contributions.length ? data.contributions.slice(0, 5).map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="github-log__row">
                  <span className="github-log__date">{formatMonth(item.mergedAt, locale)}</span>
                  <span className="github-log__main">
                    <strong>{item.repository}</strong>
                    <span>PR #{item.number} · {item.title}</span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )) : <p className="github-log__empty">{t.emptyContributions}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
