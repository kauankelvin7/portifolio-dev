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
}

export function ProjectCard({ projectId, title, description, category, tags, image, link }: ProjectCardProps) {
  return (
    <article className="project-card surface-card motion-reveal group h-full overflow-hidden">
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
        aria-label={`${title} — ${description}`}
      >
        <div className="project-media md:min-h-64">
          {image ? (
            <>
              <Image
                src={image}
                alt=""
                fill
                className="project-media__image"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="project-media__overlay" aria-hidden="true" />
            </>
          ) : (
            <div className="project-fallback" aria-hidden="true">
              <div className="project-fallback__number">{String(projectId).padStart(2, "0")}</div>
            </div>
          )}

          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
            <span className="rounded-full border border-white/10 bg-[rgba(9,13,9,0.72)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/75 backdrop-blur-sm">
              {category}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[rgba(9,13,9,0.72)] text-white transition-colors group-hover:border-[var(--accent-line)] group-hover:text-[var(--accent)]">
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-2xl leading-tight tracking-[-0.025em] text-white">{title}</h3>
          <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">{description}</p>

          <div className="mt-7 flex flex-wrap gap-2 border-t border-[var(--border-soft)] pt-5">
            {tags.slice(0, 6).map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 py-1.5 text-[11px] text-[var(--text-soft)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
