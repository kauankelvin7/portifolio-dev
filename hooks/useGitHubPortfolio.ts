"use client";

import { useEffect, useState } from "react";
import type { GitHubPortfolioPayload } from "@/lib/github/types";

let cachedPayload: GitHubPortfolioPayload | null = null;
let pendingRequest: Promise<GitHubPortfolioPayload> | null = null;

async function loadGitHubPortfolio(): Promise<GitHubPortfolioPayload> {
  if (cachedPayload) return cachedPayload;

  if (!pendingRequest) {
    pendingRequest = fetch("/api/github-sync", { cache: "force-cache" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Falha ao carregar sincronização do GitHub: ${response.status}`);
        }

        return response.json() as Promise<GitHubPortfolioPayload>;
      })
      .then((payload) => {
        cachedPayload = payload;
        return payload;
      })
      .finally(() => {
        pendingRequest = null;
      });
  }

  return pendingRequest;
}

export function useGitHubPortfolio() {
  const [data, setData] = useState<GitHubPortfolioPayload | null>(cachedPayload);
  const [loading, setLoading] = useState(!cachedPayload);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    loadGitHubPortfolio()
      .then((payload) => {
        if (!active) return;
        setData(payload);
        setError(payload.degraded);
      })
      .catch(() => {
        if (!active) return;
        setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
