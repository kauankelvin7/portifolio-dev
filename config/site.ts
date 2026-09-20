export const siteConfig = {
  name: "Kauan Kelvin",
  shortName: "Kauan",
  url: "https://kauankelvindev.vercel.app",
  defaultLocale: "pt",
  locales: {
    pt: { languageTag: "pt-BR", openGraphLocale: "pt_BR", path: "/?lang=pt" },
    en: { languageTag: "en", openGraphLocale: "en_US", path: "/?lang=en" },
    es: { languageTag: "es", openGraphLocale: "es_ES", path: "/?lang=es" },
  },
  githubUsername: "kauankelvin7",
  profileImage: "/images/kauan-profile.webp",
  location: "Entorno do DF, GO",
  email: "kelvinkauan722@gmail.com",
  links: {
    github: "https://github.com/kauankelvin7",
    linkedin: "https://www.linkedin.com/in/kauan-kelvin/",
    portfolio3d: "https://kauan-kelvin.vercel.app/",
    resume: "/curriculum/resume.pdf",
  },
  focus: [
    ["01", "Java / Spring Boot"],
    ["02", "REST APIs / PostgreSQL"],
    ["03", "Python / Automação"],
    ["04", "React / TypeScript"],
  ],
} as const;

export type SiteLocale = keyof typeof siteConfig.locales;
