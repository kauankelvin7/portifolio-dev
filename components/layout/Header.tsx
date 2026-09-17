"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTransition } from "@/app/context/TransitionContext";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { startTransition } = useTransition();
  const t = useTranslations("Nav");
  const activeSection = useActiveSection(["home", "about", "work", "stack", "contact"]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: t('home'), id: "home" },
    { href: "/#about", label: t('about'), id: "about" },
    { href: "/#work", label: t('projects'), id: "work" },
    { href: "/#contact", label: t('contact'), id: "contact" },
  ];

  const navigate = async (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    setIsOpen(false);
    await startTransition(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[rgba(12,11,9,0.88)] backdrop-blur-xl">
      <div className="container-shell flex min-h-[68px] items-center justify-between gap-5">
        <Link href="/" onClick={(event) => navigate(event, '/')} className="font-display text-sm tracking-[-0.02em] text-white">
          Kauan Kelvin<span className="text-[var(--accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const active = activeSection === link.id || (link.id === "home" && !activeSection);

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(event) => navigate(event, link.href)}
                className={`text-xs font-semibold transition ${active ? "text-white" : "text-[var(--text-muted)] hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-soft)] md:hidden"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 top-[68px] z-40 min-h-[calc(100dvh-68px)] bg-[var(--background)] px-5 py-10 md:hidden">
          <nav className="container-shell flex flex-col" aria-label="Navegação mobile">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={(event) => navigate(event, link.href)}
                className="border-b border-[var(--border-soft)] py-5 font-display text-3xl tracking-[-0.04em] text-white"
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
