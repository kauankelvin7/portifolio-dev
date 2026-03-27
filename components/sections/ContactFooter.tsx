"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import LiquidSpotlightButton from "@/components/ui/LiquidSpotlightButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ContactFooter() {
  const { prefersReduced } = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative w-full min-h-[90vh] bg-brand-black text-brand-cream flex flex-col items-center justify-between px-4 py-20 overflow-hidden border-t-4 border-brand-orange/20"
    >
      <div className="grow flex flex-col items-center justify-center w-full z-10">
        <div className="w-full text-center group cursor-default">
          <motion.h2
            initial={prefersReduced ? { opacity: 0 } : { y: 50, opacity: 0 }}
            whileInView={prefersReduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: prefersReduced ? 0.15 : 0.8 }}
            className="font-display inline-block scale-x-[0.99] scale-y font-black text-[14vw] uppercase leading-none mix-blend-difference text-center"
          >
            VAMOS <br />
            <span className="stroke-white">CONVERSAR?</span>
          </motion.h2>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <p className="font-body text-brand-gray uppercase tracking-widest text-center max-w-lg mb-4">
            Aberto a estágios, freelas e projetos colaborativos. Respondo em até 24h.
          </p>
          <LiquidSpotlightButton href="mailto:kelvinkauan722@gmail.com">
            <Mail size={20} />
            <span>kelvinkauan722@gmail.com</span>
            <ArrowUpRight size={20} />
          </LiquidSpotlightButton>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mt-20 border-t-2 border-brand-orange/20 pt-12 items-end">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="scale-75 px-0 py-0 origin-left flex gap-4">
            <LiquidSpotlightButton href="https://www.linkedin.com/in/kauan-kelvin">
              <Linkedin size={18} /> 
            </LiquidSpotlightButton>

            <LiquidSpotlightButton href="https://www.github.com/kauankelvin7">
              <Github size={18} />
            </LiquidSpotlightButton>
          </div>
        </div>

        <div className="text-center font-display text-[10px] text-brand-gray uppercase tracking-[0.3em]">
          <span>BRASIL / DISPONÍVEL</span>
        </div>

        <div className="text-center md:text-right flex flex-col gap-1 font-display text-[10px] text-brand-gray uppercase tracking-widest">
          <span>DESIGN & CODE BY KAUAN KELVIN</span>
          <span className="text-brand-orange">©2026 — TODOS OS DIREITOS RESERVADOS</span>
        </div>
      </div>
    </section>
  );
}
