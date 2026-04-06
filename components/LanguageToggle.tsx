"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Locale = "pt" | "en" | "es" | "fr" | "zh";

interface LangOption {
  locale: Locale;
  flagCode: string;
  code: string;
  name: string;
}

const LANGUAGES: LangOption[] = [
  { locale: "pt", flagCode: "br", code: "PT", name: "Português" },
  { locale: "en", flagCode: "us", code: "EN", name: "English" },
  { locale: "es", flagCode: "es", code: "ES", name: "Español" },
  { locale: "fr", flagCode: "fr", code: "FR", name: "Français" },
  { locale: "zh", flagCode: "cn", code: "ZH", name: "中文" },
];

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLocale, setActiveLocale] = useState<Locale>("pt");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const match = document.cookie.match(/(^| )NEXT_LOCALE=([^;]+)/);
      if (match && match[2]) {
        const cLocale = match[2] as Locale;
        if (LANGUAGES.some((l) => l.locale === cLocale)) {
          setActiveLocale(cLocale);
        }
      }
    } catch (e) {
      // Default to 'pt' silently
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (locale: Locale) => {
    setActiveLocale(locale);
    setIsOpen(false);
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
    router.refresh();
  };

  const currentLang = LANGUAGES.find((l) => l.locale === activeLocale) || LANGUAGES[0];

  return (
    <div
      className="relative pointer-events-auto"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[6px] bg-[#1a1815] border-solid border rounded-full transition-colors duration-200"
        style={{
          borderWidth: "1px",
          borderColor: isOpen ? "#e5591d" : "#2a2825",
          padding: "5px 10px 5px 5px", // Overridden by classes for mobile
        }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .lang-trigger-btn { padding: 5px 10px 5px 5px; }
          @media (max-width: 768px) {
            .lang-trigger-btn { padding: 5px 8px 5px 5px !important; }
            .lang-code-text { display: none !important; }
            .lang-dropdown-menu { min-width: 140px !important; }
          }
          .lang-trigger-btn:hover { border-color: ${isOpen ? '#e5591d' : '#444444'} !important; }
        `}} />

        <div className="flex items-center gap-[6px] lang-trigger-btn w-full h-full" style={{ padding: 0 }}>
          {/* Flag ball */}
          <div className="w-[28px] h-[28px] rounded-full overflow-hidden border-[1.5px] border-solid border-[#333333] flex-shrink-0 flex items-center justify-center">
            <img
              src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/flags/4x3/${currentLang.flagCode}.svg`}
              alt={currentLang.name}
              style={{ width: "34px", height: "34px", objectFit: "cover" }}
            />
          </div>

          <span
            className="lang-code-text transition-colors duration-200"
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: isOpen ? "#ffffff" : "#aaaaaa",
            }}
          >
            {currentLang.code}
          </span>

          <svg
            viewBox="0 0 10 6"
            style={{
              width: "10px",
              height: "10px",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="#666666"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className="lang-dropdown-menu absolute"
        role="listbox"
        style={{
          top: "calc(100% + 8px)",
          right: 0,
          background: "#131210",
          border: "1px solid #2a2825",
          borderRadius: "16px",
          padding: "5px",
          minWidth: "160px",
          zIndex: 50,
          opacity: isOpen ? 1 : 0,
          transform: `translateY(${isOpen ? '0' : '-6px'}) scale(${isOpen ? 1 : 0.97})`,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {LANGUAGES.map((lang) => {
          const isActive = activeLocale === lang.locale;
          return (
            <button
              key={lang.locale}
              role="option"
              aria-selected={isActive}
              onClick={() => handleSelect(lang.locale)}
              className="w-full flex items-center justify-between text-left transition-colors duration-150"
              style={{
                padding: "8px 10px",
                borderRadius: "10px",
                background: isActive ? "#1e1c19" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "#1e1c19";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <div className="flex items-center gap-[10px]">
                {/* Small flag ball */}
                <div
                  className="rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    width: "24px",
                    height: "24px",
                    border: "1.5px solid #333",
                  }}
                >
                  <img
                    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/flags/4x3/${lang.flagCode}.svg`}
                    alt={lang.name}
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                      margin: "-3px 0 0 -3px",
                      maxWidth: "none"
                    }}
                  />
                </div>

                {/* Language name */}
                <span
                  style={{
                    fontSize: "13px",
                    color: isActive ? "#ffffff" : "#bbbbbb",
                  }}
                >
                  {lang.name}
                </span>
              </div>

              {/* Active dot */}
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#e5591d",
                  visibility: isActive ? "visible" : "hidden",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
