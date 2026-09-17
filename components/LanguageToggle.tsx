"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

type Locale = "pt" | "en" | "es";

type Language = {
  locale: Locale;
  code: string;
  name: string;
};

const languages: readonly Language[] = [
  { locale: "pt", code: "PT", name: "Português" },
  { locale: "en", code: "EN", name: "English" },
  { locale: "es", code: "ES", name: "Español" },
];

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestedLocale, setRequestedLocale] = useState<Locale | null>(null);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!requestedLocale || requestedLocale === locale) return;

    document.cookie = `NEXT_LOCALE=${requestedLocale};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }, [locale, requestedLocale, router]);

  const selectLanguage = (nextLocale: Locale) => {
    setIsOpen(false);
    if (nextLocale !== locale) setRequestedLocale(nextLocale);
  };

  const currentLanguage = languages.find((language) => language.locale === locale) ?? languages[0];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-soft)] transition-colors hover:border-[#575148] hover:text-white"
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        {currentLanguage.code}
        <span aria-hidden="true" className={`text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-36 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-1 shadow-2xl" role="listbox">
          {languages.map((language) => {
            const active = language.locale === locale;
            return (
              <button
                key={language.locale}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => selectLanguage(language.locale)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-[var(--text-soft)] transition-colors hover:bg-white/5 hover:text-white"
              >
                <span>{language.name}</span>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
