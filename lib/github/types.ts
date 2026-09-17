export type StackSource = "language" | "topic" | "manifest" | "mixed";

export interface SyncedProject {
  id: string;
  name: string;
  fullName: string;
  title: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  tags: string[];
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  score: number;
}

export interface SyncedStack {
  name: string;
  slug: string;
  score: number;
  repoCount: number;
  source: StackSource;
}

export interface OpenSourceContribution {
  id: string;
  repository: string;
  title: string;
  number: number;
  url: string;
  mergedAt: string;
}

export interface GitHubPortfolioPayload {
  username: string;
  generatedAt: string;
  projects: SyncedProject[];
  stacks: SyncedStack[];
  contributions: OpenSourceContribution[];
  stats: {
    publicRepositories: number;
    eligibleRepositories: number;
    mergedOpenSourcePullRequests: number;
  };
  degraded: boolean;
}
