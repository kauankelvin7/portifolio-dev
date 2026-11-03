"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type Locale = "pt" | "en" | "es";

const languages = [
  { locale: "pt" as const, code: "PT", flag: "/rebirth/flags/br.svg", name: "Português" },
  { locale: "en" as const, code: "EN", flag: "/rebirth/flags/us.svg", name: "English" },
  { locale: "es" as const, code: "ES", flag: "/rebirth/flags/es.svg", name: "Español" },
];

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestedLocale, setRequestedLocale] = useState<Locale | null>(null);
  const locale = useLocale() as Locale;
  const tA11y = useTranslations("A11y");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
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
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="language-switch__trigger"
        aria-label={`${current.name} — ${tA11y("language_selector")}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="rebirth-language-menu"
      >
        <Image src={current.flag} width={27} height={19} alt="" className="rebirth-flag" />
        <ChevronDown size={13} aria-hidden="true" className={isOpen ? "rotate-180" : ""} />
      </button>

      {isOpen && (
        <div id="rebirth-language-menu" className="language-switch__menu" role="menu">
          {languages.map((language) => (
            <button
              key={language.locale}
              type="button"
              role="menuitemradio"
              aria-checked={language.locale === locale}
              onClick={() => {
                setIsOpen(false);
                if (language.locale !== locale) setRequestedLocale(language.locale);
              }}
              className="language-switch__option"
            >
              <Image src={language.flag} width={27} height={19} alt="" className="rebirth-flag" />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
