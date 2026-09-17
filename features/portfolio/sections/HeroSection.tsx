import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function HeroSection() {
  const t = await getTranslations("Hero");
  const tA11y = await getTranslations("A11y");

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container-shell relative z-10 grid min-h-[calc(100svh-72px)] items-center gap-14 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-20">
        <div className="max-w-4xl">
          <div className="hero-enter mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.08em] text-[var(--text-muted)]">
            <span className="status-pill">{t("role1")}</span>
            <span className="hidden h-px w-8 bg-[var(--border)] sm:block" />
            <span>{t("role2")}</span>
          </div>

          <h1 className="hero-title hero-enter hero-enter--2">
            {t("name1")} <span>{t("name2")}</span>
          </h1>

          <p className="hero-enter hero-enter--3 mt-7 max-w-2xl text-base leading-7 text-[var(--text-soft)] md:text-lg md:leading-8">{t("status")}</p>

          <div className="hero-enter hero-enter--4 mt-8 flex flex-wrap gap-3">
            <Link href="#work" className="button-primary">
              {t("cta_primary")}
              <ArrowDownRight size={17} aria-hidden="true" />
            </Link>
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer" className="button-secondary">
              {t("cta_secondary")}
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="button-secondary" aria-label={`GitHub de ${siteConfig.name}`}>
              <Github size={17} aria-hidden="true" />
              GitHub
            </a>
          </div>

          <div className="hero-enter hero-enter--5 mt-10 flex items-center gap-3 text-sm leading-6 text-[var(--text-muted)]">
            <span className="availability-dot h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{t("availability")}</span>
          </div>
        </div>

        <div className="hero-console hero-enter hero-enter--6" aria-label={tA11y("focus_technologies")}>
          <div className="hero-console__topbar">
            <div className="hero-console__identity">
              <Image src="/brand/mark.svg" width={22} height={22} alt="" aria-hidden="true" />
              <span>kauan.dev / focus</span>
            </div>
            <span>01—04</span>
          </div>
          <div className="hero-console__body">
            <div className="hero-console__mark" aria-hidden="true">K</div>
            <div className="relative z-10 space-y-2">
              {siteConfig.focus.map(([index, stack]) => (
                <div key={index} className="hero-console__row"><span>{index}</span><strong>{stack}</strong></div>
              ))}
            </div>
            <div className="relative z-10 mt-10 grid grid-cols-3 gap-3 border-t border-[var(--border-soft)] pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-xs">
              <span>{t("focus_backend")}</span><span>{t("focus_automation")}</span><span>{t("focus_web")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
