"use client";

import { useEffect, useMemo, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
}

export function TypewriterText({
  text,
  className,
  startDelay = 220,
  speed = 26,
}: TypewriterTextProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const chars = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisibleCount(chars.length);
      return;
    }

    setVisibleCount(0);
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleCount((current) => {
          if (current >= chars.length) {
            if (intervalId) window.clearInterval(intervalId);
            return chars.length;
          }
          return current + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [chars, speed, startDelay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{chars.slice(0, visibleCount).join("")}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}
