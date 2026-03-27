import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
  index: number;
}

export function ProjectCard({ title, description, tags, link, image, index }: ProjectProps) {
  return (
    <div className="group relative block bg-brand-black border-4 border-brand-orange/20 hover:border-brand-orange transition-all duration-300 h-full hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(255,107,0,1)]">
      
      <Link 
        href={link} 
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
        aria-label={`Ver projeto ${title}`}
      >
        <span className="sr-only">Ver Projeto</span>
      </Link>

      <div className="flex flex-col h-full bg-brand-black relative z-10 overflow-hidden">
        
        {image && (
          <div className="relative w-full h-48 md:h-64 overflow-hidden border-b-4 border-brand-orange/20 group-hover:border-brand-orange transition-colors">
            <Image 
              src={image} 
              alt={title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
          </div>
        )}

        <div className="p-6 md:p-10 flex flex-col flex-1">
          <span className="font-display text-brand-orange text-[10px] mb-4 block uppercase tracking-widest">
            {index + 1 < 10 ? `0${index + 1}` : index + 1} — {title === "Syntax" ? "PROJETO DESTAQUE" : "CASE STUDY"}
          </span>

          <div className="flex justify-between items-start mb-4">
            <h3 className="font-display font-black text-xl md:text-3xl uppercase leading-[0.9] text-brand-cream group-hover:text-brand-orange transition-colors max-w-[80%]">
              {title}
            </h3>
            <div className="bg-brand-orange text-brand-black p-2 group-hover:bg-brand-orange group-hover:shadow-[4px_4px_0_0_#faf9f6] transition-all border-2 border-brand-black">
               <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          <p className="font-body text-sm text-brand-gray mb-8 leading-relaxed max-w-sm">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t-2 border-brand-orange/10 group-hover:border-brand-orange transition-colors">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="font-display text-[9px] uppercase tracking-tighter border-2 border-brand-orange/10 px-2 py-1 text-brand-gray group-hover:border-brand-orange group-hover:text-brand-orange transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}