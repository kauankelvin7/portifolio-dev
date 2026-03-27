"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative w-full h-12 md:h-16 bg-brand-orange border-y-4 border-brand-black overflow-hidden flex items-center -rotate-1 z-30 my-10 md:my-20 scale-105">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        <div className="flex gap-8 items-center px-4">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl font-black text-brand-black flex items-center gap-8">
              DEVELOPER <span className="w-3 h-3 bg-brand-black rotate-45" /> 2026 <span className="w-3 h-3 bg-brand-black rotate-45" /> FULLSTACK
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
