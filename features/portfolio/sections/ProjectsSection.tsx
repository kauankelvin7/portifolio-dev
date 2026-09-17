import { Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { ProjectCard } from "@/features/portfolio/components/ProjectCard";
import { projects } from "@/features/portfolio/content/projects";

export async function ProjectsSection() {
  const t = await getTranslations("Projects");
  const tp = await getTranslations("ProjectsSection");

  return (
    <section id="work" className="section-shell bg-[var(--surface)]">
      <div className="container-shell">
        <div className="motion-reveal flex flex-col gap-6 border-b border-[var(--border-soft)] pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">{tp("eyebrow")}</span>
            <h2 className="section-heading mt-6">{t("title")} <span className="text-[var(--accent)]">{t("subtitle")}</span></h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--text-muted)] md:text-right">{t("description")}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              title={tp(`${project.translationKey}.title`)}
              description={tp(`${project.translationKey}.description`)}
              category={tp(`${project.translationKey}.category`)}
              tags={project.tags}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>

        <div className="motion-reveal mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--background)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-muted)]">{t("more")}</p>
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="button-secondary">
            <Github size={16} aria-hidden="true" />
            {t("github_button")}
          </a>
        </div>
      </div>
    </section>
  );
}
