"use client";

import { useEffect, useRef } from "react";

export default function CreativeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = event;
        containerRef.current.style.setProperty("--x", `${clientX}px`);
        containerRef.current.style.setProperty("--y", `${clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <svg className="fixed top-0 left-0 h-0 w-0 pointer-events-none z-[-1]">
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className="background-spotlight fixed inset-0 z-[-1] w-full h-dvh pointer-events-none"
      />
    </>
  );
}