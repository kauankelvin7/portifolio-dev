"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".reveal-stagger",
  ".section-intro",
  ".editorial-heading",
  ".projects-v4__heading > p",
  ".github-v4__heading > p",
  ".stack-v4__heading > p",
  ".journey-v3__heading > p",
  ".contact-v4__intro",
  ".contact-v4__form",
].join(",");

const staggerGroups = [
  ".projects-v4__mosaic",
  ".github-v4__timeline",
  ".journey-v3__list",
  ".credentials-v4__list",
];

export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));

    for (const groupSelector of staggerGroups) {
      document.querySelectorAll<HTMLElement>(groupSelector).forEach((group) => {
        Array.from(group.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;
          child.classList.add("motion-reveal");
          child.style.setProperty("--motion-delay", `${Math.min(index * 70, 350)}ms`);
        });
      });
    }

    revealElements.forEach((element) => element.classList.add("motion-reveal"));
    root.classList.add("motion-ready");

    if (reduced) {
      document.querySelectorAll<HTMLElement>(".motion-reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    document.querySelectorAll<HTMLElement>(".motion-reveal").forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
