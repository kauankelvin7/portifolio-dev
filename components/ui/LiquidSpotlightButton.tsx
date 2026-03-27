"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LiquidSpotlightButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function LiquidSpotlightButton({ children, href, className = "" }: LiquidSpotlightButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { prefersReduced } = useReducedMotion();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 107, 0, 0.15),
      transparent 80%
    )
  `;

  const borderBg = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 107, 0, 0.4),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (prefersReduced) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      whileHover={prefersReduced ? {} : { scale: 1.05 }}
      whileTap={prefersReduced ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative group"
    >
      <Link
        href={href}
        ref={ref}
        onMouseMove={handleMouseMove}
        target={href.startsWith("http") ? "_blank" : "_self"}
        className={`relative flex items-center justify-center overflow-hidden rounded-3xl bg-brand-black px-10 py-3 text-brand-cream shadow-2xl transition-colors duration-300 border-2 border-brand-orange/20 hover:border-brand-orange ${className}`}
      >
        
        {!prefersReduced && (
          <>
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: spotlightBg,
              }}
            />

            <motion.div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: borderBg,
                maskImage: `linear-gradient(#000, #000), linear-gradient(#000, #000)`,
                maskClip: "content-box, border-box",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1px",
              }}
            />
          </>
        )}

        <div className="relative z-10 flex items-center gap-3 font-display text-base font-bold text-brand-gray transition-colors group-hover:text-brand-orange uppercase tracking-widest">
          {children}
        </div>
      </Link>
    </motion.div>
  );
}