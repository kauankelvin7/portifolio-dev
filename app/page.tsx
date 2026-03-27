'use client';

import dynamic from 'next/dynamic';
import { Header } from "@/components/layout/Header";
import LazyLoad from "@/components/layout/LazyLoad";
import { About } from "@/components/sections/About";
import { AboutModern } from "@/components/sections/AboutModern";
import { AboutCyber } from "@/components/sections/AboutCyber";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Companies } from "@/components/sections/Companies";
import { Skills } from "@/components/sections/Skills";
import ContactFooter from "@/components/sections/ContactFooter";
import SectionDivider from "@/components/ui/SectionDivider";

import CanvasLoader from '@/components/ui/CanvasLoader';

const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

const SceneMacbook = dynamic(() => import("@/components/3d/SceneMacbook"), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

const SceneCyber = dynamic(() => import("@/components/3d/SceneCyber"), {
  ssr: false,
  loading: () => <CanvasLoader />,
});


export default function Home() {
  return (
    <div className="relative w-full bg-brand-black text-brand-cream font-body">
      
      <Header />

      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-brand-orange px-6 text-brand-black">
        <div id="home" className="absolute inset-0 z-10">
           <LazyLoad>
            <Scene />
          </LazyLoad>
        </div>

        <div className="absolute z-10 pointer-events-none w-full px-6 top-24 flex justify-between items-start md:top-12 md:left-12 md:right-12 md:px-0">
          <div className="font-display p-0 md:p-4 text-xs md:text-sm font-bold tracking-wider uppercase flex flex-col">
            <p className="text-left">SOFTWARE ENGINEER</p>
            <p className="text-left">FULLSTACK DEVELOPER</p>
          </div>
          <div className="font-display p-0 md:p-4 text-xs md:text-sm font-bold tracking-wider uppercase flex flex-col text-right md:text-left">
            <p>DESIGN &</p>
            <p>PERFORMANCE.</p>
          </div>
        </div>

        <div className="relative z-20 mt-auto mb-12 text-center md:mb-24">
           <h1 className="font-display text-4xl md:text-8xl uppercase leading-none tracking-tighter mb-4">
            KAUAN KELVIN
          </h1>
          <p className="font-body text-sm md:text-xl uppercase tracking-[0.2em] opacity-80">
            Aberto a oportunidades
          </p>
        </div>
      </section>

      <SectionDivider />

      <About />

      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-brand-red">
        <LazyLoad>
          <SceneMacbook />
        </LazyLoad>
      </section>
      
      <AboutModern />

      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-brand-orange">
        <LazyLoad>
          <SceneCyber />
        </LazyLoad> 
      </section>

      <AboutCyber />
      
      <SectionDivider />
      
      <Projects />
      <Process />
      <Companies />
      
      <SectionDivider />
      
      <Skills />
      
      <SectionDivider />
      
      <ContactFooter />
    </div>
  );
}