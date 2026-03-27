"use client";

import Image from "next/image";
import { skillCategories, certificates } from "@/data/skills";
import FadeIn from "@/components/ui/FadeIn";

export function Skills() {
  return (
    <section id="stack" className="bg-brand-black text-brand-cream py-32 border-t-4 border-brand-orange/20 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          
          <div className="flex-1">
            <FadeIn>
                <h2 className="font-display font-extrabold text-5xl md:text-7xl mb-16 uppercase leading-none tracking-tighter">
                Minha <br /><span className="text-brand-orange">Stack</span>
                </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {skillCategories.map((category, index) => (
                 <FadeIn key={category.title} delay={index * 0.1}>
                   <div className="border-4 border-brand-orange/20 p-8 hover:border-brand-orange transition-all hover:shadow-[8px_8px_0px_0px_rgba(255,107,0,1)] bg-brand-black group">
                     <h3 className="font-display text-brand-orange mb-6 uppercase tracking-widest text-sm border-b-2 border-brand-orange pb-2 inline-block">{category.title}</h3>
                     <ul className="font-display space-y-3 font-bold text-xl uppercase">
                        {category.skills.map(skill => (
                          <li key={skill} className="hover:text-brand-orange transition-colors cursor-pointer flex items-center gap-2">
                            <span className="w-2 h-2 bg-brand-orange/30 group-hover:bg-brand-orange transition-colors" />
                            {skill}
                          </li>
                        ))}
                     </ul>
                   </div>
                 </FadeIn>
               ))}
            </div>
          </div>

          <div className="flex-1">
            <FadeIn delay={0.2}>
                <div className="flex items-end justify-between mb-12 border-b border-white/20 pb-4">
                  <h3 className="font-body font-bold tracking-wide text-3xl uppercase text-brand-orange">Certificados</h3>
                  <span className="font-body uppercase text-[10px] text-brand-orange animate-pulse">Sincronizando dados...</span>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <FadeIn key={`cert-${index}`} delay={0.3 + (index * 0.1)}>
                    <div
                      className={`relative group aspect-video bg-zinc-950 overflow-hidden cursor-pointer transition-all duration-500 border-4 
                        ${cert.status === 'locked' 
                          ? 'border-brand-orange/10 opacity-50'
                          : 'border-brand-orange/20 hover:border-brand-orange hover:shadow-[6px_6px_0px_0px_rgba(255,107,0,1)]' 
                        }`}
                    >
                      {cert.image ? (
                        <div className="relative w-full h-full p-4">
                            <Image 
                              src={cert.image}
                              alt={cert.name}
                              fill
                              className={`object-contain transition-all duration-700
                                ${cert.status === 'locked' 
                                  ? 'grayscale opacity-20 brightness-50 blur-[2px]'
                                  : 'opacity-100 grayscale group-hover:grayscale-0 group-hover:scale-105'
                                }`}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                           <span className="text-zinc-700 font-mono text-xs">[ NO_SIGNAL ]</span>
                        </div>
                      )}

                      {cert.status === 'locked' && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <div className="bg-black/50 p-3 rounded-none border-2 border-brand-orange/20 backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange w-6 h-6"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/80 to-transparent flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center z-30">
                          <p className="font-display text-sm uppercase text-brand-cream leading-tight mb-1">
                            {cert.status === 'locked' ? '???' : cert.name}
                          </p>
                          <p className="font-display text-[10px] text-brand-orange font-bold uppercase tracking-widest">
                            {cert.status === 'locked' ? 'RECURSO BLOQUEADO' : cert.issuer}
                          </p>
                      </div>

                      <div className="absolute top-2 right-2 z-30">
                          {cert.status === 'locked' ? (
                            <span className="text-[10px] font-display bg-brand-black px-2 py-1 text-zinc-600 border-2 border-zinc-800">LOCKED</span>
                          ) : (
                            <span className="text-[10px] font-display  bg-brand-black px-2 py-1 text-brand-orange border-2 border-brand-orange font-bold">VERIFICADO</span>
                          )}
                      </div>
                      
                    </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}