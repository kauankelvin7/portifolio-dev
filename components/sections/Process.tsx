"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processes } from "@/data/process";
import { Plus, Minus } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { isLowEnd } = useDeviceCapability();

  return (
    <section id="journey" className="bg-brand-orange text-brand-black py-24 relative z-20 border-t-4 border-brand-black">
      
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col border-brand-black">
          {processes.map((step, index) => {
            const isOpen = openIndex === index;

            return (
              <FadeIn key={step.id} delay={index * 0.1} className="w-full">
                  <div 
                    className="border-b-4 border-brand-black group cursor-pointer transition-colors hover:bg-brand-black hover:text-brand-orange"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-center justify-between py-8 md:py-10 px-2 md:px-4">
                        <div className="flex items-center gap-6 md:gap-12">
                            <span className="font-body text-2xl md:text-2xl font-bold opacity-50 group-hover:opacity-100">
                                {step.id}
                            </span>
                            <h3 className="font-body font-extrabold text-2xl md:text-4xl uppercase leading-none">
                                {step.title}
                            </h3>
                        </div>
                        
                        <div className="text-2xl md:text-4xl">
                            {isOpen ? <Minus strokeWidth={3} /> : <Plus strokeWidth={3} />}
                        </div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={isLowEnd ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={isLowEnd ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={isLowEnd ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-10 pl-14 md:pl-28 pr-6 max-w-4xl">
                            <p className="font-body text-lg md:text-xl leading-relaxed font-medium">
                                {step.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}