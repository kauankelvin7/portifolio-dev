export interface SkillCategory {
  title: string;
  skills: readonly string[];
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  image: string;
}

export const skillCategories = [
  {
    title: "Back-end e dados",
    skills: ["Java", "Spring Boot", "REST APIs", "Node.js", "SQL", "PostgreSQL", "Firebase"],
  },
  {
    title: "Web e automação",
    skills: ["React", "TypeScript", "Vite", "Tailwind CSS", "Python", "Selenium", "Git", "Linux"],
  },
] satisfies readonly SkillCategory[];

export const certificates = [
  {
    id: 1,
    name: "Engenharia de Software",
    issuer: "FIAP",
    image: "/certificates/engenharia_de_software_fiap.jpg",
  },
  {
    id: 2,
    name: "Banco de Dados",
    issuer: "Fundação Bradesco",
    image: "/certificates/banco-de-dados-fundacao-bradesco.png",
  },
  {
    id: 3,
    name: "Imersão Dev — Agentes de IA",
    issuer: "Alura + Google",
    image: "/certificates/imersao_dev_agentes_de_ia_alura.png",
  },
  {
    id: 4,
    name: "Java Completo",
    issuer: "Udemy",
    image: "/certificates/java-completo-udemy.jpg",
  },
] satisfies readonly Certificate[];
