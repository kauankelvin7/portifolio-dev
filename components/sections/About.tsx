'use client'

import FadeIn from "@/components/ui/FadeIn"
import Counter from "../ui/Counter";
import { Download } from "lucide-react";
import LiquidSpotlightButton from "../ui/LiquidSpotlightButton";

export function About() {
  return (
    <section id="about" className="bg-brand-black text-brand-cream relative z-20">

      <div className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative z-10">
        <FadeIn>
          <h1 className="font-display font-extrabold leading-none text-center mb-16 mt-20 md:mb-24 uppercase">
            <span className="text-6xl md:text-[12rem] inline-block tracking-tighter">QUEM SOU EU ?</span>
          </h1>
        </FadeIn>

        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 text-sm md:text-base border-t border-brand-orange/20 pt-12">

          <div className="space-y-6 text-brand-gray">
            <FadeIn delay={0.2}>
              <p className="">
                <strong className="text-brand-orange font-display block mb-2 tracking-tighter uppercase">DESENVOLVEDOR FULLSTACK & APAIXONADO POR TECNOLOGIA</strong>
                Me chamo Kauan Kelvin, tenho 20 anos e sou apaixonado por aprender novas tecnologias. Atualmente sou estudante de Engenharia de Software na Unicesumar, com foco em Desenvolvimento Back-end.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p>
                Tenho experiência prática com Java, React, TypeScript, Python e Node.js, além de conhecimentos em front-end. Meu objetivo é transformar desafios em soluções escaláveis e seguras, entregando código limpo focado em performance e manutenção de sistemas robustos.
              </p>
            </FadeIn>
          </div>

          <div className="font-body flex flex-col justify-between">
            <FadeIn delay={0.4}>
              <p className="text-brand-orange italic border-l-4 border-brand-orange pl-4 bg-brand-orange/5 py-4">
                "Não é apenas sobre código, é sobre resolver problemas de forma elegante e eficiente."
              </p>
            </FadeIn>

            <div className="font-display mt-10 grid grid-cols-2 gap-8">
              <FadeIn delay={0.5}>
                <div className="border-2 border-brand-orange p-6 shadow-[8px_8px_0px_0px_rgba(255,107,0,1)] bg-brand-black">
                  <h3 className="text-6xl font-extrabold text-brand-orange">
                    <Counter value={5} suffix="º" />
                  </h3>
                  <span className="font-display text-[10px] text-brand-cream uppercase tracking-widest mt-2 block">Semestre</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="border-2 border-brand-orange p-6 shadow-[8px_8px_0px_0px_rgba(255,107,0,1)] bg-brand-black">
                  <h3 className="text-6xl font-extrabold text-brand-orange">
                    <Counter value={20} suffix="" />
                  </h3>
                  <span className="font-display text-[10px] text-brand-cream uppercase tracking-widest mt-2 block">Anos de Idade</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.7}>
                <div className="border-2 border-brand-orange p-6 shadow-[8px_8px_0px_0px_rgba(255,107,0,1)] bg-brand-black">
                  <h3 className="text-6xl font-extrabold text-brand-orange">
                    <Counter value={3} suffix="+" />
                  </h3>
                  <span className="font-display text-[10px] text-brand-cream uppercase tracking-widest mt-2 block">Anos de Código</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.8}>
                <div className="border-2 border-brand-orange p-6 shadow-[8px_8px_0px_0px_rgba(255,107,0,1)] bg-brand-black">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-brand-orange font-display text-4xl leading-none">∞</span>
                    <span className="text-[10px] uppercase font-display tracking-widest text-brand-gray">Curiosidade</span>
                  </div>
                </div>

                <div className="mt-12 flex justify-center md:justify-start col-span-2"> {/* Added col-span-2 to center button */}
                  <LiquidSpotlightButton href="/curriculum/resume.pdf" className="!rounded-none !px-8 border-4 border-brand-orange hover:shadow-[6px_6px_0px_0px_rgba(255,107,0,1)]">
                    <Download size={20} />
                    <span>Download CV</span>
                  </LiquidSpotlightButton>
                </div>
              </FadeIn>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}