import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  projectId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  link: string;
}

export function ProjectCard({ projectId, title, description, category, tags, image, link }: ProjectProps) {
  return (
    <article className="group surface-card h-full overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
        aria-label={`${title} — ${description}`}
      >
        <div className="relative min-h-56 overflow-hidden border-b border-[var(--border-soft)] bg-[var(--surface-strong)] md:min-h-64">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover opacity-85 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-end p-6">
              <div className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-[-0.06em] text-white/5">
                {projectId.padStart(2, "0")}
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <span className="rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/75">
              {category}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-2xl leading-tight tracking-[-0.025em] text-white">
            {title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2 border-t border-[var(--border-soft)] pt-5">
            {tags.slice(0, 6).map((tag) => (
              <span key={tag} className="rounded-full bg-white/[0.035] px-3 py-1.5 text-[11px] text-[var(--text-soft)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
