"use client";

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
    <header className="site-header">
      <div className="container-shell site-header__inner">
        <Link href="#home" className="site-brand site-brand--v5" aria-label={`${siteConfig.name} — início`}>
          <span className="site-brand__sig" aria-hidden="true">K.</span>
          <span className="site-brand__name">{siteConfig.name}</span>
        </Link>

        <nav className="site-nav" aria-label={tA11y("main_navigation")}>
          {navLinks.map((link) => {
            const active = activeSection === link.id || (link.id === "home" && !activeSection);
            return (
              <Link key={link.id} href={link.href} className={`site-nav__link ${active ? "is-active" : ""}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="site-menu-button"
            aria-label={isOpen ? tA11y("close_menu") : tA11y("open_menu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="site-mobile-menu">
          <nav className="container-shell" aria-label={tA11y("mobile_navigation")}>
            {navLinks.map((link, index) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="site-mobile-menu__link"
                style={{ transitionDelay: `${index * 35}ms` }}
              >
                <span>0{index + 1}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
