export interface PortfolioProject {
  id: number;
  translationKey: "leve" | "dental" | "omni" | "cinesia" | "rustdesk" | "socplug";
  tags: readonly string[];
  link: string;
  demo?: string;
  caseStudy?: "/projects/leve" | "/projects/omni";
  image?: string;
}

export const projects: readonly PortfolioProject[] = [
  {
    id: 1,
    translationKey: "leve",
    tags: ["React", "TypeScript", "Firebase", "Express", "PWA", "Playwright"],
    image: "https://raw.githubusercontent.com/kauankelvin7/Leve/main/docs/screenshots/desktop.png",
    link: "https://github.com/kauankelvin7/Leve",
    demo: "https://leve-agenda.vercel.app",
    caseStudy: "/projects/leve",
  },
  {
    id: 2,
    translationKey: "dental",
    tags: ["Python", "Selenium", "Openpyxl", "RPA", "Automação"],
    link: "https://github.com/kauankelvin7/Automacao-Clinica-Odontologica",
  },
  {
    id: 3,
    translationKey: "omni",
    tags: ["Java", "Spring Boot", "PostgreSQL", "React", "TypeScript", "Python"],
    image: "/images/projects/omni.png",
    link: "https://github.com/kauankelvin7/Omni",
    demo: "https://omni-six-green.vercel.app",
    caseStudy: "/projects/omni",
  },
  {
    id: 4,
    translationKey: "cinesia",
    tags: ["React", "Vite", "Firebase", "PWA", "Gemini", "Vitest"],
    image: "/images/projects/cinesia.png",
    link: "https://github.com/kauankelvin7/Cinesia",
  },
  {
    id: 5,
    translationKey: "rustdesk",
    tags: ["Open Source", "GitHub", "Fastlane", "pt-BR", "it-IT"],
    link: "https://github.com/rustdesk/rustdesk/pulls?q=is%3Apr+author%3Akauankelvin7",
  },
  {
    id: 6,
    translationKey: "socplug",
    tags: ["Windows", "Batch", "JNLP", "WebSocket", "Troubleshooting"],
    link: "https://github.com/kauankelvin7/socplug-fix",
  },
];
