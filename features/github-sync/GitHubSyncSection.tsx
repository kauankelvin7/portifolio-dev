import { ArrowUpRight, GitBranch, GitPullRequest } from "lucide-react";
import { getLocale } from "next-intl/server";
import { syncGitHubPortfolio } from "./sync";
import { githubSyncConfig } from "./config";

const copy = {
  pt: {
    eyebrow: "GitHub sync",
    title: "Atividade recente e contribuições",
    description: "Repositórios elegíveis e contribuições open source entram aqui a partir do meu GitHub público.",
    repo: "Repositório",
    merged: "Merged",
    empty: "Nenhuma atividade nova detectada por enquanto.",
  },
  en: {
    eyebrow: "GitHub sync",
    title: "Recent activity and contributions",
    description: "Eligible repositories and open-source contributions appear here from my public GitHub.",
    repo: "Repository",
    merged: "Merged",
    empty: "No new activity detected right now.",
  },
  es: {
    eyebrow: "GitHub sync",
    title: "Actividad reciente y contribuciones",
    description: "Los repositorios elegibles y las contribuciones open source aparecen aquí desde mi GitHub público.",
    repo: "Repositorio",
    merged: "Merged",
    empty: "No se detectó actividad nueva por ahora.",
  },
} as const;

function formatDate(value: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
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

  const eligibleProjects = data.projects.filter((project) =>
    (project.description?.trim().length ?? 0) >= 30 || githubSyncConfig.curatedRepositories.has(project.name),
  );
  const featuredContributions = data.contributions.filter((item) =>
    githubSyncConfig.featuredContributionNumbers.has(item.number),
  );
  const otherContributions = data.contributions.filter((item) =>
    !githubSyncConfig.featuredContributionNumbers.has(item.number),
  );

  const entries = [
    ...eligibleProjects.slice(0, 4).map((project) => ({
      id: `repo-${project.id}`,
      type: "repo" as const,
      title: project.title,
      subtitle: project.description?.trim() ?? "",
      url: project.url,
      date: project.updatedAt,
    })),
    ...[...featuredContributions, ...otherContributions].slice(0, 4).map((item) => ({
      id: `pr-${item.id}`,
      type: "pr" as const,
      title: item.repository,
      subtitle: `PR #${item.number} · ${item.title}`,
      url: item.url,
      date: item.mergedAt,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <section className="github-v4 github-sync" aria-labelledby="github-sync-heading">
      <div className="container-shell">
        <div className="section-heading github-v4__heading">
          <div className="github-v4__heading-copy">
            <p>{t.eyebrow}</p>
            <h2 id="github-sync-heading">{t.title}</h2>
          </div>
          <span>{t.description}</span>
        </div>

        {entries.length ? (
          <div className="github-v4__timeline">
            {entries.map((entry, index) => (
              <a key={entry.id} href={entry.url} target="_blank" rel="noreferrer" className="github-v4__event">
                <div className="github-v4__rail" aria-hidden="true">
                  <span className="github-v4__dot" />
                  {index !== entries.length - 1 && <span className="github-v4__line" />}
                </div>

                <div className="github-v4__date">{formatDate(entry.date, locale)}</div>

                <div className="github-v4__body">
                  <div className="github-v4__type">
                    {entry.type === "pr" ? <GitPullRequest size={13} aria-hidden="true" /> : <GitBranch size={13} aria-hidden="true" />}
                    <span>{entry.type === "pr" ? t.merged : t.repo}</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.subtitle}</p>
                </div>

                <ArrowUpRight className="github-v4__arrow" size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : (
          <p className="github-v4__empty">{t.empty}</p>
        )}
      </div>
    </section>
  );
}
