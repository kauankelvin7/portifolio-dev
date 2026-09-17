"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/LanguageToggle";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_SECTION_IDS = ["home", "about", "work", "stack", "contact"] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Nav");
  const tA11y = useTranslations("A11y");
  const activeSection = useActiveSection(NAV_SECTION_IDS);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "#home", label: t("home"), id: "home" },
    { href: "#about", label: t("about"), id: "about" },
    { href: "#work", label: t("projects"), id: "work" },
    { href: "#stack", label: t("stack"), id: "stack" },
    { href: "#contact", label: t("contact"), id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="container-shell flex min-h-[68px] items-center justify-between gap-5">
        <Link href="#home" className="group inline-flex items-center gap-2.5 font-display text-sm tracking-[-0.02em] text-white">
          <Image src="/brand/mark.svg" width={28} height={28} alt="" aria-hidden="true" priority />
          <span>{siteConfig.name}<span className="text-[var(--accent)]">.</span></span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label={tA11y("main_navigation")}>
          {navLinks.map((link) => {
            const active = activeSection === link.id || (link.id === "home" && !activeSection);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`relative py-2 text-xs font-semibold transition-colors ${active ? "text-white" : "text-[var(--text-muted)] hover:text-white"}`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-[var(--accent)] transition-all duration-200 ${active ? "w-full opacity-100" : "w-0 opacity-0"}`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-soft)] transition-colors hover:border-[var(--accent-line)] hover:text-white md:hidden"
            aria-label={isOpen ? tA11y("close_menu") : tA11y("open_menu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 top-[68px] z-40 min-h-[calc(100svh-68px)] border-t border-[var(--border-soft)] bg-[var(--background)] px-5 py-10 md:hidden">
          <nav className="container-shell flex flex-col" aria-label={tA11y("mobile_navigation")}>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-[var(--border-soft)] py-5 font-display text-3xl tracking-[-0.04em] text-white transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
