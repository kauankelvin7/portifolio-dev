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
  score: number;
  repoCount: number;
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
  degraded: boolean;
}
