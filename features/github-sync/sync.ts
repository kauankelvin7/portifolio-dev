import { githubSyncConfig, stackAliases } from "./config";
import type { GitHubPortfolioPayload, OpenSourceContribution, SyncedProject, SyncedStack } from "./types";

const API = "https://api.github.com";

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
  size: number;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
};

type GitHubSearchItem = {
  id: number;
  title: string;
  number: number;
  html_url: string;
  repository_url: string;
  pull_request?: { merged_at?: string | null };
};

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function githubFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: headers(),
    next: { revalidate: githubSyncConfig.revalidateSeconds },
  });

  if (!response.ok) throw new Error(`GitHub API ${response.status} em ${path}`);
  return response.json() as Promise<T>;
}

function normalizeStack(value: string) {
  const key = value.trim().toLowerCase().replace(/[._ ]+/g, "-");
  return stackAliases[key] ?? null;
}

function eligible(repo: GitHubRepo) {
  if (repo.private || repo.fork || repo.archived || repo.disabled) return false;
  if (githubSyncConfig.ignoredRepositories.has(repo.name)) return false;
  if (repo.topics?.some((topic) => githubSyncConfig.ignoredTopics.has(topic))) return false;
  return repo.size >= 24 && Boolean(repo.description || repo.homepage || repo.topics?.length);
}

function score(repo: GitHubRepo) {
  const days = Math.max(0, (Date.now() - new Date(repo.pushed_at).getTime()) / 86_400_000);
  const recency = days <= 30 ? 8 : days <= 180 ? 5 : days <= 365 ? 2 : 0;
  const preferred = repo.topics?.filter((topic) => githubSyncConfig.preferredTopics.has(topic)).length ?? 0;

  return recency + preferred * 3 + Math.min(repo.stargazers_count, 5) * 2 + Math.min(repo.forks_count, 3) +
    (repo.description ? 2 : 0) + (repo.homepage ? 2 : 0) +
    (repo.topics?.includes("portfolio") ? 12 : 0) + (repo.topics?.includes("featured") ? 18 : 0);
}

async function languages(repo: GitHubRepo) {
  try {
    const result = await githubFetch<Record<string, number>>(`/repos/${repo.full_name}/languages`);
    return Object.entries(result).sort(([, a], [, b]) => b - a).slice(0, 4).map(([name]) => name);
  } catch {
    return repo.language ? [repo.language] : [];
  }
}

function buildStacks(repos: GitHubRepo[], languageMap: Map<string, string[]>): SyncedStack[] {
  const totals = new Map<string, { score: number; repos: Set<string> }>();

  for (const repo of repos) {
    (languageMap.get(repo.full_name) ?? []).forEach((language, index) => {
      const name = normalizeStack(language) ?? language;
      const current = totals.get(name) ?? { score: 0, repos: new Set<string>() };
      current.score += Math.max(1, 5 - index);
      current.repos.add(repo.full_name);
      totals.set(name, current);
    });

    for (const topic of repo.topics ?? []) {
      const name = normalizeStack(topic);
      if (!name) continue;
      const current = totals.get(name) ?? { score: 0, repos: new Set<string>() };
      current.score += githubSyncConfig.preferredTopics.has(topic) ? 5 : 2;
      current.repos.add(repo.full_name);
      totals.set(name, current);
    }
  }

  return [...totals.entries()]
    .map(([name, value]) => ({ name, score: value.score, repoCount: value.repos.size }))
    .sort((a, b) => b.score - a.score || b.repoCount - a.repoCount)
    .slice(0, githubSyncConfig.maxStacks);
}

async function contributions(): Promise<OpenSourceContribution[]> {
  const query = encodeURIComponent(`author:${githubSyncConfig.username} is:pr is:merged`);
  const result = await githubFetch<{ items: GitHubSearchItem[] }>(`/search/issues?q=${query}&sort=updated&order=desc&per_page=30`);

  return result.items
    .filter((item) => item.pull_request?.merged_at)
    .map((item) => {
      const repository = item.repository_url.split("/repos/")[1] ?? "";
      return { item, repository, owner: repository.split("/")[0]?.toLowerCase() };
    })
    .filter(({ owner }) => owner && owner !== githubSyncConfig.username.toLowerCase())
    .slice(0, githubSyncConfig.maxContributions)
    .map(({ item, repository }) => ({
      id: String(item.id),
      repository,
      title: item.title,
      number: item.number,
      url: item.html_url,
      mergedAt: item.pull_request?.merged_at ?? "",
    }));
}

export async function syncGitHubPortfolio(): Promise<GitHubPortfolioPayload> {
  try {
    const repos = await githubFetch<GitHubRepo[]>(`/users/${githubSyncConfig.username}/repos?type=owner&sort=updated&direction=desc&per_page=100`);
    const valid = repos.filter(eligible);
    const stackCandidates = [...valid].sort((a, b) => score(b) - score(a)).slice(0, 16);
    const autoCandidates = valid
      .filter((repo) => !githubSyncConfig.curatedRepositories.has(repo.name))
      .sort((a, b) => score(b) - score(a))
      .slice(0, githubSyncConfig.maxAutoProjects);

    const inspect = [...new Map([...stackCandidates, ...autoCandidates].map((repo) => [repo.full_name, repo])).values()];
    const languageMap = new Map(await Promise.all(inspect.map(async (repo) => [repo.full_name, await languages(repo)] as const)));

    const projects: SyncedProject[] = autoCandidates.map((repo) => {
      const repoLanguages = languageMap.get(repo.full_name) ?? [];
      const topicStacks = (repo.topics ?? []).map(normalizeStack).filter((value): value is string => Boolean(value));
      const tags = [...new Set([...repoLanguages.map((value) => normalizeStack(value) ?? value), ...topicStacks])].slice(0, 6);

      return {
        id: String(repo.id),
        name: repo.name,
        fullName: repo.full_name,
        title: repo.name.replace(/[-_]+/g, " "),
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        tags,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        score: score(repo),
      };
    });

    return {
      username: githubSyncConfig.username,
      generatedAt: new Date().toISOString(),
      projects,
      stacks: buildStacks(stackCandidates, languageMap),
      contributions: await contributions().catch(() => []),
      degraded: false,
    };
  } catch (error) {
    console.error("[github-sync] Falha ao sincronizar dados públicos", error);
    return { username: githubSyncConfig.username, generatedAt: new Date().toISOString(), projects: [], stacks: [], contributions: [], degraded: true };
  }
}
