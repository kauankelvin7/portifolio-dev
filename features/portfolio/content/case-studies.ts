export const caseStudySlugs = ["leve", "omni"] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

interface CaseStudyLink {
  labelKey: "repository" | "demo";
  href: string;
}

interface CaseStudySource {
  label: string;
  href: string;
}

export interface CaseStudy {
  slug: CaseStudySlug;
  stack: readonly string[];
  image: string;
  links: readonly CaseStudyLink[];
  sources: readonly CaseStudySource[];
  decisionKeys: readonly string[];
  tradeoffKeys: readonly string[];
  evidenceKeys: readonly string[];
}

export const caseStudies: Record<CaseStudySlug, CaseStudy> = {
  leve: {
    slug: "leve",
    stack: ["React 19", "TypeScript", "Express 5", "Firebase Auth", "Firestore", "Zod", "Playwright"],
    image: "https://raw.githubusercontent.com/kauankelvin7/Leve/main/docs/screenshots/desktop.png",
    links: [
      { labelKey: "demo", href: "https://leve-agenda.vercel.app" },
      { labelKey: "repository", href: "https://github.com/kauankelvin7/Leve" },
    ],
    sources: [
      { label: "README — proposta, arquitetura e decisões", href: "https://github.com/kauankelvin7/Leve#readme" },
      { label: "CI", href: "https://github.com/kauankelvin7/Leve/blob/main/.github/workflows/ci.yml" },
      { label: "Aplicação", href: "https://leve-agenda.vercel.app" },
    ],
    decisionKeys: ["commandApi", "revision", "offline", "domain"],
    tradeoffKeys: ["commandShape", "localData", "freeTier"],
    evidenceKeys: ["tests", "privacy", "operation"],
  },
  omni: {
    slug: "omni",
    stack: ["Java 17", "Spring Boot 3", "PostgreSQL", "React 18", "TypeScript", "Python 3.12", "Docker"],
    image: "/images/projects/omni.png",
    links: [
      { labelKey: "demo", href: "https://omni-b2b.vercel.app" },
      { labelKey: "repository", href: "https://github.com/kauankelvin7/Omni" },
    ],
    sources: [
      { label: "README — funcionalidades e stack", href: "https://github.com/kauankelvin7/Omni#readme" },
      { label: "Guia de produção", href: "https://github.com/kauankelvin7/Omni/blob/main/docs/PRODUCTION.md" },
      { label: "Guia de monitoramento", href: "https://github.com/kauankelvin7/Omni/blob/main/docs/MONITORING.md" },
    ],
    decisionKeys: ["layers", "tenant", "deployment", "observability"],
    tradeoffKeys: ["isolation", "coldStart", "operations"],
    evidenceKeys: ["health", "security", "database"],
  },
};

export function isCaseStudySlug(value: string): value is CaseStudySlug {
  return caseStudySlugs.includes(value as CaseStudySlug);
}
