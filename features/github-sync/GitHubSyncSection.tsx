import { ArrowUpRight, GitPullRequest, Github } from "lucide-react";
import { getLocale } from "next-intl/server";
import { syncGitHubPortfolio } from "./sync";

const copy = {
  pt: {
    eyebrow: "GitHub em movimento",
    title: "Atividade que entra sozinha",
    description: "Repositórios elegíveis, tecnologias recorrentes e contribuições open source são lidos do meu GitHub público e atualizados sem editar a página manualmente.",
    repos: "Outros repositórios",
    contributions: "Open source",
    emptyRepos: "Nenhum repositório novo elegível por enquanto.",
    emptyContributions: "Nenhuma nova contribuição externa detectada por enquanto.",
  },
  en: {
    eyebrow: "GitHub in motion",
    title: "Activity that updates itself",
    description: "Eligible repositories, recurring technologies and open-source contributions are read from my public GitHub activity without manual page edits.",
    repos: "Other repositories",
    contributions: "Open source",
    emptyRepos: "No new eligible repository right now.",
    emptyContributions: "No new external contribution detected right now.",
  },
  es: {
    eyebrow: "GitHub en movimiento",
    title: "Actividad que se actualiza sola",
    description: "Los repositorios elegibles, tecnologías recurrentes y contribuciones open source se leen desde mi actividad pública de GitHub sin editar la página manualmente.",
    repos: "Otros repositorios",
    contributions: "Open source",
    emptyRepos: "No hay repositorios nuevos elegibles por ahora.",
    emptyContributions: "No se detectaron nuevas contribuciones externas por ahora.",
  },
} as const;

export async function GitHubSyncSection() {
  const [locale, data] = await Promise.all([getLocale(), syncGitHubPortfolio()]);
  const t = copy[locale as keyof typeof copy] ?? copy.pt;

  if (data.degraded && data.projects.length === 0 && data.contributions.length === 0) {
    return null;
  }

  return (
    <section className="section-shell bg-[var(--background)]" aria-labelledby="github-sync-heading">
      <div className="container-shell">
        <span className="eyebrow">{t.eyebrow}</span>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <h2 id="github-sync-heading" className="section-heading motion-reveal">{t.title}</h2>
          <p className="body-copy motion-reveal lg:justify-self-end">{t.description}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="motion-reveal">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
              <Github size={17} aria-hidden="true" />
              {t.repos}
            </div>
            <div className="space-y-3">
              {data.projects.length ? data.projects.slice(0, 5).map((project) => (
                <a key={project.id} href={project.url} target="_blank" rel="noreferrer" className="group surface-card flex items-start justify-between gap-5 p-5 transition-colors hover:border-[var(--accent-line)]">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white">{project.title}</h3>
                    {project.description ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">{project.description}</p> : null}
                    {project.tags.length ? <div className="mt-3 flex flex-wrap gap-2">{project.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-[var(--border-soft)] px-2.5 py-1 text-[10px] text-[var(--text-soft)]">{tag}</span>)}</div> : null}
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" aria-hidden="true" />
                </a>
              )) : <p className="surface-card p-5 text-sm text-[var(--text-muted)]">{t.emptyRepos}</p>}
            </div>
          </div>

          <div className="motion-reveal">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
              <GitPullRequest size={17} aria-hidden="true" />
              {t.contributions}
            </div>
            <div className="space-y-3">
              {data.contributions.length ? data.contributions.slice(0, 5).map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group surface-card flex items-start justify-between gap-5 p-5 transition-colors hover:border-[var(--accent-line)]">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[var(--accent)]">{item.repository} · PR #{item.number}</p>
                    <h3 className="mt-2 line-clamp-2 font-semibold leading-6 text-white">{item.title}</h3>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" aria-hidden="true" />
                </a>
              )) : <p className="surface-card p-5 text-sm text-[var(--text-muted)]">{t.emptyContributions}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
