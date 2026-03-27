"use client";

import { motion } from "framer-motion";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export function Marquee() {
    const { tier, prefersReducedMotion, isLowEnd } = useDeviceCapability();

    return (
        <div className="w-full overflow-hidden bg-brand-red py-6 border-y-4 border-brand-black relative z-20">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: tier === 'high' ? 12 : 20, // Faster marquee
                }}
            >
                {Array.from({ length: 12 }).map((_, i) => (
                    <span
                        key={i}
                        className="font-display font-light text-[5rem]  inline-block uppercase text-brand-black mr-12 leading-none select-none"
                        style={{
                            WebkitTextStroke: "2px white",
                            color: "transparent"
                        }}
                    >
                        WORK
                    </span>
                ))}
            </motion.div>
        </div>
    )
}


