"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { companies, stats } from "@/data/companies";
import FadeIn from "@/components/ui/FadeIn";
import Counter from "../ui/Counter";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export function Companies() {
  const { tier, prefersReducedMotion, isLowEnd } = useDeviceCapability();
  const isReduced = prefersReducedMotion || isLowEnd;

  return (
    <section id="statistics" className="bg-brand-black py-24 border-t-4 border-brand-orange/20 relative z-20">

      <FadeIn>
        <div className="w-full overflow-hidden mb-32 relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-brand-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-brand-black to-transparent pointer-events-none" />

          <div className="flex">
            <motion.div
              className="flex gap-16 md:gap-20 items-center pr-16 md:pr-32"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: tier === 'high' ? 18 : 35, // Faster carousel
              }}
            >
              {[...Array(10)].flatMap(() => companies).map((company, index) => (
                <div key={index} className=" relative w-32 h-16 md:w-48 md:h-24 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </FadeIn>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            
            const numericValue = parseInt(stat.value.replace(/\D/g, '')) || 0
            const suffix = stat.value.replace(/[0-9]/g, '')

            return (
              <FadeIn key={index} delay={0.2 + (index * 0.1)} className="h-full">
                <div 
                  className="bg-brand-black border-4 border-brand-orange/20 p-8 md:p-12 hover:border-brand-orange transition-all duration-300 group h-full hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(255,107,0,1)]"
                >
                  <h3 className="font-display text-6xl md:text-[7rem] font-bold text-brand-cream mb-4 group-hover:text-brand-orange transition-colors flex items-center leading-none">
                    <Counter value={numericValue} suffix={suffix} />
                  </h3>
                  
                  <p className="font-display text-brand-orange uppercase tracking-widest text-sm md:text-base border-t-2 border-brand-orange/20 pt-4 group-hover:border-brand-orange group-hover:text-brand-orange transition-colors">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>

    </section>
  );
}