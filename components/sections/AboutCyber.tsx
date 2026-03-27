'use client'

import FadeIn from "@/components/ui/FadeIn"

export function AboutCyber() {
  return (
    <section className="bg-brand-black text-brand-cream relative z-20 overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative z-10">

        <FadeIn>
            <h2 className="font-display uppercase font-light text-2xl md:text-3xl tracking-widest leading-loose text-center mb-16 text-brand-orange duration-300">
            SOLUÇÕES <span className="text-brand-cream/50">&</span>  <br />
            <span className="inline-block text-6xl md:text-[10rem] font-display tracking-tighter text-brand-cream">ESCALÁVEIS</span>
            </h2>
        </FadeIn>

        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 font-body text-sm md:text-base border-t border-brand-orange/20 pt-12">

          <div className="font-body space-y-6 text-brand-gray">
            <FadeIn delay={0.2}>
                <p>
                <strong className="font-display font-bold text-brand-orange block mb-2 text-xl tracking-wider uppercase">BACK-END ROBUSTO</strong>
                Meu foco é desenvolver sistemas que não apenas funcionam, mas que aguentam o tranco. Utilizo Java e Spring Boot para criar APIs seguras e eficientes, sempre pensando na escalabilidade.
                </p>
            </FadeIn>
            
            <FadeIn delay={0.3}>
                <p>
                O terminal que você viu simboliza minha busca constante por automação e eficiência. De scripts em Python a deploys em Linux, busco sempre o controle total do ecossistema onde meu código roda.
                </p>
            </FadeIn>
          </div>

          <div className="font-body flex flex-col justify-between">
            <ul className="space-y-4">
              <FadeIn delay={0.4}>
                  <li className="flex items-center gap-4 group">
                    <span className="w-2 h-2 bg-brand-orange rounded-sm group-hover:animate-ping"></span>
                    <span>APIs RESTful & Microserviços com Java</span>
                  </li>
              </FadeIn>
              <FadeIn delay={0.5}>
                  <li className="flex items-center gap-4 group">
                    <span className="w-2 h-2 bg-brand-orange rounded-sm group-hover:animate-ping"></span>
                    <span>Modelagem SQL & Bancos Não Relacionais</span>
                  </li>
              </FadeIn>
              <FadeIn delay={0.6}>
                  <li className="flex items-center gap-4 group">
                    <span className="w-2 h-2 bg-brand-orange rounded-sm group-hover:animate-ping"></span>
                    <span>Automação de Processos com Python</span>
                  </li>
              </FadeIn>
            </ul>

            <FadeIn delay={0.8}>
                <div className="mt-10 pt-10 border-t border-brand-orange/20">
                <p className="font-display font-light text-[10px] uppercase tracking-[0.3em] text-brand-gray mb-2">Status do Sistema</p>
                <div className="flex items-center gap-2 text-brand-orange animate-pulse">
                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                    <p className="font-display text-sm">SISTEMA ONLINE & SEGURO</p>
                </div>
                </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  )
}