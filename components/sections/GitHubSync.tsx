"use client";

import { ArrowUpRight, GitPullRequest, Github, RefreshCw } from "lucide-react";
import { useLocale } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import { useGitHubPortfolio } from "@/hooks/useGitHubPortfolio";

const copy = {
  pt: {
    eyebrow: "GitHub em movimento",
    title: "O que apareceu",
    accent: "de novo",
    description: "Repositórios e contribuições que entram automaticamente a partir da minha atividade pública no GitHub.",
    repos: "Outros repositórios",
    contributions: "Open source",
    synced: "Sincronizado automaticamente",
    loading: "Consultando atividade recente...",
    emptyRepos: "Nenhum repositório novo elegível por enquanto.",
    emptyContributions: "Nenhuma nova contribuição externa detectada por enquanto.",
    openRepo: "Abrir repositório",
    openPr: "Abrir pull request",
  },
  en: {
    eyebrow: "GitHub in motion",
    title: "What showed up",
    accent: "recently",
    description: "Repositories and contributions added automatically from my public GitHub activity.",
    repos: "Other repositories",
    contributions: "Open source",
    synced: "Automatically synced",
    loading: "Checking recent activity...",
    emptyRepos: "No new eligible repository right now.",
    emptyContributions: "No new external contribution detected right now.",
    openRepo: "Open repository",
    openPr: "Open pull request",
  },
  es: {
    eyebrow: "GitHub en movimiento",
    title: "Lo que apareció",
    accent: "recientemente",
    description: "Repositorios y contribuciones añadidos automáticamente desde mi actividad pública en GitHub.",
    repos: "Otros repositorios",
    contributions: "Open source",
    synced: "Sincronizado automáticamente",
    loading: "Consultando actividad reciente...",
    emptyRepos: "No hay repositorios nuevos elegibles por ahora.",
    emptyContributions: "No se detectaron nuevas contribuciones externas por ahora.",
    openRepo: "Abrir repositorio",
    openPr: "Abrir pull request",
  },
} as const;

export function GitHubSync() {
  const locale = useLocale() as keyof typeof copy;
  const t = copy[locale] ?? copy.pt;
  const { data, loading, error } = useGitHubPortfolio();

  if (error && !data?.projects.length && !data?.contributions.length) {
    return null;
  }

  return (
    <section className="section-shell bg-[var(--background)]" aria-labelledby="github-sync-title">
      <div className="container-shell">
        <FadeIn>
          <span className="eyebrow">{t.eyebrow}</span>
        </FadeIn>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <FadeIn delay={0.05}>
            <h2 id="github-sync-title" className="section-heading">
              {t.title} <span className="text-[var(--accent)]">{t.accent}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="lg:justify-self-end">
              <p className="body-copy max-w-xl">{t.description}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <RefreshCw size={13} aria-hidden="true" />
                {loading ? t.loading : t.synced}
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
              <Github size={17} aria-hidden="true" />
              {t.repos}
            </div>

            <div className="space-y-3">
              {loading && !data ? (
                <div className="surface-card h-28 animate-pulse" aria-hidden="true" />
              ) : data?.projects.length ? (
                data.projects.slice(0, 5).map((project) => (
                  <a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group surface-card flex items-start justify-between gap-5 p-5 transition hover:border-[var(--border)] hover:bg-[var(--surface-strong)]"
                    aria-label={`${t.openRepo}: ${project.title}`}
                  >
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-white">{project.title}</h3>
                      {project.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">
                          {project.description}
                        </p>
                      )}
                      {project.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-full border border-[var(--border-soft)] px-2.5 py-1 text-[10px] text-[var(--text-soft)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowUpRight className="mt-0.5 shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]" size={18} aria-hidden="true" />
                  </a>
                ))
              ) : (
                <p className="surface-card p-5 text-sm text-[var(--text-muted)]">{t.emptyRepos}</p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
              <GitPullRequest size={17} aria-hidden="true" />
              {t.contributions}
            </div>

            <div className="space-y-3">
              {loading && !data ? (
                <div className="surface-card h-28 animate-pulse" aria-hidden="true" />
              ) : data?.contributions.length ? (
                data.contributions.slice(0, 5).map((contribution) => (
                  <a
                    key={contribution.id}
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group surface-card flex items-start justify-between gap-5 p-5 transition hover:border-[var(--border)] hover:bg-[var(--surface-strong)]"
                    aria-label={`${t.openPr}: ${contribution.title}`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--accent)]">{contribution.repository} · PR #{contribution.number}</p>
                      <h3 className="mt-2 line-clamp-2 font-semibold leading-6 text-white">{contribution.title}</h3>
                    </div>
                    <ArrowUpRight className="mt-0.5 shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]" size={18} aria-hidden="true" />
                  </a>
                ))
              ) : (
                <p className="surface-card p-5 text-sm text-[var(--text-muted)]">{t.emptyContributions}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
