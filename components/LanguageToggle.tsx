"use client";

import { ChevronDown, Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type Locale = "pt" | "en" | "es";

const languages = [
  { locale: "pt" as const, code: "PT", name: "Português" },
  { locale: "en" as const, code: "EN", name: "English" },
  { locale: "es" as const, code: "ES", name: "Español" },
];

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestedLocale, setRequestedLocale] = useState<Locale | null>(null);
  const locale = useLocale() as Locale;
  const tA11y = useTranslations("A11y");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!requestedLocale || requestedLocale === locale) return;
    document.cookie = `NEXT_LOCALE=${requestedLocale};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }, [locale, requestedLocale, router]);

  const current = languages.find((language) => language.locale === locale) ?? languages[0];

  return (
    <div ref={dropdownRef} className="language-switch">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="language-switch__trigger"
        aria-label={tA11y("language_selector")}
        aria-expanded={isOpen}
      >
        <Globe2 size={14} aria-hidden="true" />
        <span>{current.code}</span>
        <ChevronDown size={12} className={isOpen ? "rotate-180" : ""} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="language-switch__menu" role="listbox">
          {languages.map((language) => (
            <button
              key={language.locale}
              type="button"
              role="option"
              aria-selected={language.locale === locale}
              onClick={() => {
                setIsOpen(false);
                if (language.locale !== locale) setRequestedLocale(language.locale);
              }}
              className="language-switch__option"
            >
              <span>{language.name}</span>
              <span>{language.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
