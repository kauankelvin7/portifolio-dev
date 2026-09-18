import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { ProjectCard } from "@/features/portfolio/components/ProjectCard";
import { projects } from "@/features/portfolio/content/projects";

export async function ProjectsSection() {
  const t = await getTranslations("Projects");
  const tp = await getTranslations("ProjectsSection");
  const [featured, ...secondary] = projects;

  return (
    <section id="work" className="editorial-section editorial-section--alt">
      <div className="container-shell">
        <div className="section-intro">
          <span className="section-index">02</span>
          <span className="section-kicker">{tp("eyebrow")}</span>
        </div>

        <div className="projects-v3__heading">
          <h2 className="editorial-heading">{t("title")} <span>{t("subtitle")}</span></h2>
          <p>{t("description")}</p>
        </div>

        <div className="projects-v3__featured">
          <ProjectCard
            projectId={featured.id}
            title={tp(`${featured.translationKey}.title`)}
            description={tp(`${featured.translationKey}.description`)}
            category={tp(`${featured.translationKey}.category`)}
            tags={featured.tags}
            image={featured.image}
            link={featured.link}
            featured
          />
        </div>

        <div className="projects-v3__grid">
          {secondary.map((project) => (
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

        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="projects-v3__github editorial-link">
          {t("github_button")}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
