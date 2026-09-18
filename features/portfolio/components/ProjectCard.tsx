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
  variant?: "wide" | "compact" | "tall";
}

export function ProjectCard({
  projectId,
  title,
  description,
  category,
  tags,
  image,
  link,
  featured = false,
  variant = "compact",
}: ProjectCardProps) {
  const index = String(projectId).padStart(2, "0");

  return (
    <article className={`project-v4 project-v4--${featured ? "featured" : variant} reveal-stagger`}>
      <Link href={link} target="_blank" rel="noopener noreferrer" className="project-v4__link">
        <div className="project-v4__media" aria-hidden="true">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="project-v4__image"
              sizes={featured ? "(max-width: 1024px) 100vw, 65vw" : "(max-width: 768px) 100vw, 50vw"}
            />
          ) : (
            <div className="project-v4__abstract">
              <span className="project-v4__abstract-index">{index}</span>
              <span className="project-v4__abstract-line project-v4__abstract-line--a" />
              <span className="project-v4__abstract-line project-v4__abstract-line--b" />
              <span className="project-v4__abstract-dot" />
            </div>
          )}
          <span className="project-v4__index">{index}</span>
        </div>

        <div className="project-v4__content">
          <div className="project-v4__category">{category}</div>
          <div className="project-v4__title-row">
            <h3>{title}</h3>
            <ArrowUpRight size={18} aria-hidden="true" />
          </div>
          <p className="project-v4__description">{description}</p>
          <p className="project-v4__stack">{tags.slice(0, 6).join(" / ")}</p>
        </div>
      </Link>
    </article>
  );
}
