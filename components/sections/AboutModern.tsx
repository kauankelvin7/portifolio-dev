"use client";

import FadeIn from "@/components/ui/FadeIn";

export function AboutModern() {
  return (
    <section className="bg-brand-black text-brand-cream relative z-20">
      <div className=" min-h-screen flex flex-col items-center justify-center py-52 px-6 relative z-10">
        <FadeIn>
          <h2 className="font-display font-extrabold text-6xl md:text-[10rem] tracking-tighter
           leading-[0.8] mb-30 uppercase text-brand-orange text-center">
            ENGENHARIA <br />
            <span className="font-display tracking-widest flex justify-center font-light text-[2rem] text-brand-cream leading-loose">
              & CÓDIGO
            </span>
          </h2>
        </FadeIn>

        <div className=" max-w-5xl w-full grid md:grid-cols-2 gap-12 font-body text-sm md:text-base border-t border-brand-orange/20 pt-12">
          <div className="space-y-6 text-brand-gray">
            <FadeIn delay={0.2}>
              <p>
                <strong className="font-display text-brand-orange block mb-2 text-xl uppercase">
                  O PRESENTE
                </strong>
                Minha jornada acadêmica em Engenharia de Software me deu a base teórica necessária para construir sistemas robustos. Hoje, foco em transformar essa teoria em aplicações escaláveis com Java e o ecossistema JavaScript.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p>
                Trabalho como Desenvolvedor FullStack Freelancer, onde enfrento desafios reais de negócios, desde a modelagem de bancos de dados SQL até a criação de dashboards performáticos no React.
              </p>
            </FadeIn>
          </div>

          <div className="font-body flex flex-col justify-between">
            <ul className="space-y-4">
              <FadeIn delay={0.4}>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(255,107,0,0.5)]"></span>
                  <span>Arquitetura de Sistemas & Back-end</span>
                </li>
              </FadeIn>
              <FadeIn delay={0.5}>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(255,107,0,0.5)]"></span>
                  <span>Java / Spring Boot & Node.js</span>
                </li>
              </FadeIn>
              <FadeIn delay={0.6}>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(255,107,0,0.5)]"></span>
                  <span>React, Vite & Tailwind CSS</span>
                </li>
              </FadeIn>
            </ul>

            <FadeIn delay={0.7}>
              <div className="mt-10 pt-10 border-t border-brand-orange/20">
                <p className="font-display text-xs uppercase tracking-widest text-brand-orange mb-2">
                  Filosofia de Código
                </p>
                <p className="italic text-brand-gray">"Entregar valor através de código limpo, seguro e performático."</p>
              </div>
            </FadeIn>
          </div>
        </div>

      </div>
    </section>
  );
}
