import { Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { ProjectCard } from "@/features/portfolio/components/ProjectCard";
import { projects } from "@/features/portfolio/content/projects";

export async function ProjectsSection() {
  const t = await getTranslations("Projects");
  const tSection = await getTranslations("ProjectsSection");

  return (
    <section id="work" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <span className="eyebrow">{tSection("eyebrow")}</span>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <h2 className="section-heading">{t("title")} <span className="text-[var(--accent)]">{t("subtitle")}</span></h2>
          <p className="body-copy max-w-xl lg:justify-self-end">{t("description")}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              title={tSection(`${project.translationKey}.title`)}
              description={tSection(`${project.translationKey}.description`)}
              category={tSection(`${project.translationKey}.category`)}
              tags={project.tags}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-start">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="button-secondary">
            <Github size={17} aria-hidden="true" />
            {t("github_button")}
          </a>
        </div>
      </div>
    </section>
  );
}
