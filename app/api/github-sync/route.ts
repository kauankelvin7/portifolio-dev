import { NextResponse } from "next/server";
import { syncGitHubPortfolio } from "@/lib/github/sync";

export const revalidate = 60 * 60;

export async function GET() {
  const payload = await syncGitHubPortfolio();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
