import { githubSyncConfig, stackAliases } from "./config";
import type {
  GitHubPortfolioPayload,
  OpenSourceContribution,
  SyncedProject,
  SyncedStack,
} from "./types";

const API = "https://api.github.com";

interface GitHubRepo {
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
}

interface GitHubSearchItem {
  id: number;
  title: string;
  number: number;
  html_url: string;
  repository_url: string;
  pull_request?: {
    merged_at?: string | null;
  };
}

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function githubFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: githubHeaders(),
    next: { revalidate: githubSyncConfig.revalidateSeconds },
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} em ${path}`);
  }

  return response.json() as Promise<T>;
}

function normalizeStack(value: string): string | null {
  const key = value.trim().toLowerCase().replace(/[._ ]+/g, "-");
  return stackAliases[key] ?? null;
}

function isEligibleRepository(repo: GitHubRepo): boolean {
  if (repo.private || repo.fork || repo.archived || repo.disabled) return false;
  if (githubSyncConfig.ignoredRepositories.has(repo.name)) return false;
  if (repo.topics?.some((topic) => githubSyncConfig.ignoredTopics.has(topic))) return false;

  const hasUsefulMetadata = Boolean(repo.description || repo.homepage || repo.topics?.length);
  const hasEnoughContent = repo.size >= 24;

  return hasUsefulMetadata && hasEnoughContent;
}

function scoreRepository(repo: GitHubRepo): number {
  const daysSincePush = Math.max(
    0,
    (Date.now() - new Date(repo.pushed_at).getTime()) / 86_400_000,
  );

  const recency = daysSincePush <= 30 ? 8 : daysSincePush <= 180 ? 5 : daysSincePush <= 365 ? 2 : 0;
  const preferredTopicScore =
    repo.topics?.filter((topic) => githubSyncConfig.preferredTopics.has(topic)).length ?? 0;

  return (
    recency +
    preferredTopicScore * 3 +
    Math.min(repo.stargazers_count, 5) * 2 +
    Math.min(repo.forks_count, 3) +
    (repo.description ? 2 : 0) +
    (repo.homepage ? 2 : 0) +
    (repo.topics?.includes("portfolio") ? 12 : 0) +
    (repo.topics?.includes("featured") ? 18 : 0)
  );
}

async function getLanguages(repo: GitHubRepo): Promise<string[]> {
  try {
    const languages = await githubFetch<Record<string, number>>(
      `/repos/${repo.full_name}/languages`,
    );

    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([language]) => language);
  } catch {
    return repo.language ? [repo.language] : [];
  }
}

function buildStacks(
  repos: GitHubRepo[],
  languageMap: Map<string, string[]>,
): SyncedStack[] {
  const weights = new Map<string, { score: number; repos: Set<string>; sources: Set<string> }>();

  for (const repo of repos) {
    const languages = languageMap.get(repo.full_name) ?? [];

    languages.forEach((language, index) => {
      const normalized = normalizeStack(language) ?? language;
      const current = weights.get(normalized) ?? {
        score: 0,
        repos: new Set<string>(),
        sources: new Set<string>(),
      };

      current.score += Math.max(1, 5 - index);
      current.repos.add(repo.full_name);
      current.sources.add("language");
      weights.set(normalized, current);
    });

    for (const topic of repo.topics ?? []) {
      const normalized = normalizeStack(topic);
      if (!normalized) continue;

      const current = weights.get(normalized) ?? {
        score: 0,
        repos: new Set<string>(),
        sources: new Set<string>(),
      };

      current.score += githubSyncConfig.preferredTopics.has(topic) ? 5 : 2;
      current.repos.add(repo.full_name);
      current.sources.add("topic");
      weights.set(normalized, current);
    }
  }

  return [...weights.entries()]
    .map(([name, data]) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      score: data.score,
      repoCount: data.repos.size,
      source:
        data.sources.size > 1
          ? ("mixed" as const)
          : data.sources.has("topic")
            ? ("topic" as const)
            : ("language" as const),
    }))
    .sort((a, b) => b.score - a.score || b.repoCount - a.repoCount)
    .slice(0, githubSyncConfig.maxStacks);
}

async function getOpenSourceContributions(): Promise<OpenSourceContribution[]> {
  const query = encodeURIComponent(
    `author:${githubSyncConfig.username} is:pr is:merged`,
  );

  const result = await githubFetch<{ items: GitHubSearchItem[] }>(
    `/search/issues?q=${query}&sort=updated&order=desc&per_page=30`,
  );

  return result.items
    .filter((item) => item.pull_request?.merged_at)
    .map((item) => {
      const repoPath = item.repository_url.split("/repos/")[1] ?? "";
      return {
        item,
        repository: repoPath,
        owner: repoPath.split("/")[0]?.toLowerCase(),
      };
    })
    .filter(({ owner }) => owner && owner !== githubSyncConfig.username.toLowerCase())
    .slice(0, githubSyncConfig.maxContributions)
    .map(({ item, repository }) => ({
      id: String(item.id),
      repository,
      title: item.title,
      number: item.number,
      url: item.html_url,
      mergedAt: item.pull_request?.merged_at ?? new Date().toISOString(),
    }));
}

export async function syncGitHubPortfolio(): Promise<GitHubPortfolioPayload> {
  try {
    const repos = await githubFetch<GitHubRepo[]>(
      `/users/${githubSyncConfig.username}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
    );

    const eligible = repos.filter(isEligibleRepository);
    const stackCandidates = [...eligible]
      .sort((a, b) => scoreRepository(b) - scoreRepository(a))
      .slice(0, 16);

    const autoCandidates = eligible
      .filter((repo) => !githubSyncConfig.curatedRepositories.has(repo.name))
      .sort((a, b) => scoreRepository(b) - scoreRepository(a))
      .slice(0, githubSyncConfig.maxAutoProjects);

    const reposToInspect = [...new Map(
      [...stackCandidates, ...autoCandidates].map((repo) => [repo.full_name, repo]),
    ).values()];

    const languageEntries = await Promise.all(
      reposToInspect.map(async (repo) => [repo.full_name, await getLanguages(repo)] as const),
    );
    const languageMap = new Map(languageEntries);

    const projects: SyncedProject[] = autoCandidates.map((repo) => {
      const languages = languageMap.get(repo.full_name) ?? [];
      const topicStacks = (repo.topics ?? [])
        .map(normalizeStack)
        .filter((value): value is string => Boolean(value));

      const tags = [...new Set([
        ...languages.map((language) => normalizeStack(language) ?? language),
        ...topicStacks,
      ])].slice(0, 6);

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
        score: scoreRepository(repo),
      };
    });

    const contributions = await getOpenSourceContributions().catch(() => []);

    return {
      username: githubSyncConfig.username,
      generatedAt: new Date().toISOString(),
      projects,
      stacks: buildStacks(stackCandidates, languageMap),
      contributions,
      stats: {
        publicRepositories: repos.filter((repo) => !repo.private).length,
        eligibleRepositories: eligible.length,
        mergedOpenSourcePullRequests: contributions.length,
      },
      degraded: false,
    };
  } catch (error) {
    console.error("[github-sync] Falha ao sincronizar dados do GitHub", error);

    return {
      username: githubSyncConfig.username,
      generatedAt: new Date().toISOString(),
      projects: [],
      stacks: [],
      contributions: [],
      stats: {
        publicRepositories: 0,
        eligibleRepositories: 0,
        mergedOpenSourcePullRequests: 0,
      },
      degraded: true,
    };
  }
}
