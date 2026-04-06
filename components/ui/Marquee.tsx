"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Marquee() {
    const { prefersReduced } = useReducedMotion();
    const t = useTranslations('Ticker');

    // Get the items from translation and split them
    const itemsString = t('items');
    const items = itemsString.split(' · ');

    return (
        <div 
            className="w-full overflow-hidden relative z-20"
            style={{ 
                background: '#e5591d',
                padding: '12px 0',
                border: 'none'
            }}
        >
            <div
                className="flex items-center animate-marquee whitespace-nowrap"
                style={{
                  width: 'max-content',
                  animation: 'marquee 30s linear infinite',
                  willChange: 'transform'
                }}
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center pr-6">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <span
                                    className="inline-block uppercase select-none px-4"
                                    style={{
                                        fontSize: '10px',
                                        fontWeight: 900,
                                        letterSpacing: '0.14em',
                                        color: '#0c0b09',
                                        fontFamily: 'var(--font-display)'
                                    }}
                                >
                                    {item}
                                </span>
                                <span 
                                    className="mx-2 select-none"
                                    style={{
                                        fontSize: '7px',
                                        color: 'rgba(0,0,0,0.3)'
                                    }}
                                >
                                    ◆
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
