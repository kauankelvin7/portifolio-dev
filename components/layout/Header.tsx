"use client";

import Image from "next/image";
import Link from "next/link";
import { FileDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/LanguageToggle";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_SECTION_IDS = ["home", "projects", "journey", "contact"] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const t = useTranslations("Nav");
  const tA11y = useTranslations("A11y");
  const activeSection = useActiveSection(NAV_SECTION_IDS);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMobileMenu = () => {
    setIsOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
  };

  const navLinks = [
    { href: "#home", label: t("home"), id: "home" },
    { href: "#projects", label: t("projects"), id: "projects" },
    { href: "#journey", label: t("journey"), id: "journey" },
    { href: "#contact", label: t("contact"), id: "contact" },
  ];

  return (
    <header className="site-header">
      <div className="container-shell site-header__inner">
        <Link href="#home" className="site-brand" aria-label={`${siteConfig.name} — ${t("home")}`}>
          <Image src="/brand/mark.svg" width={28} height={28} alt="" />
          <span className="site-brand__name">{siteConfig.name}</span>
        </Link>

        <nav className="site-nav" aria-label={tA11y("main_navigation")}>
          {navLinks.map((link) => {
            const active = activeSection === link.id || (link.id === "home" && !activeSection);
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={active ? "location" : undefined}
                className={`site-nav__link ${active ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <LanguageToggle />
          <a className="header-resume" href={siteConfig.links.resume} target="_blank" rel="noreferrer">
            <FileDown size={14} aria-hidden="true" />{t("resume")}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="site-menu-button"
            aria-label={isOpen ? tA11y("close_menu") : tA11y("open_menu")}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="site-mobile-menu">
          <nav className="container-shell" aria-label={tA11y("mobile_navigation")}>
            {navLinks.map((link, index) => {
              const active = activeSection === link.id || (link.id === "home" && !activeSection);
              return (
                <Link
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  key={link.id}
                  href={link.href}
                  onClick={closeMobileMenu}
                  aria-current={active ? "location" : undefined}
                  className="site-mobile-menu__link"
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  <span aria-hidden="true">0{index + 1}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
