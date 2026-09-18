import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  projectId: number;
  title: string;
  description: string;
  category: string;
  tags: readonly string[];
  image?: string;
  link: string;
  featured?: boolean;
}

export function ProjectCard({ projectId, title, description, category, tags, image, link, featured = false }: ProjectCardProps) {
  const index = String(projectId).padStart(2, "0");

  return (
    <article className={featured ? "project-editorial project-editorial--featured reveal-stagger" : "project-editorial reveal-stagger"}>
      <Link href={link} target="_blank" rel="noopener noreferrer" className="project-editorial__link">
        <div className="project-editorial__media" aria-hidden="true">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="project-editorial__image"
              sizes={featured ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 768px) 100vw, 50vw"}
            />
          ) : (
            <div className="project-editorial__fallback">
              <span>{index}</span>
            </div>
          )}
        </div>

        <div className="project-editorial__content">
          <div className="project-editorial__meta">
            <span>{index}</span>
            <span>{category}</span>
          </div>

          <div className="project-editorial__title-row">
            <h3>{title}</h3>
            <ArrowUpRight size={18} aria-hidden="true" />
          </div>

          <p className="project-editorial__description">{description}</p>
          <p className="project-editorial__stack">{tags.slice(0, 6).join(" / ")}</p>
        </div>
      </Link>
    </article>
  );
}
