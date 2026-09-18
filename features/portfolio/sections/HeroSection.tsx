import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section id="home" className="hero-v3">
      <div className="container-shell hero-v3__grid">
        <div className="hero-v3__copy">
          <p className="hero-stagger hero-stagger--1 hero-v3__eyebrow">
            <span>{t("role1")}</span>
            <span aria-hidden="true">/</span>
            <span>{t("role2")}</span>
          </p>

          <h1 className="hero-stagger hero-stagger--2 hero-v3__title">
            {t("name1")}<br />{t("name2")}<span className="hero-v3__dot">.</span>
          </h1>

          <p className="hero-stagger hero-stagger--3 hero-v3__lead">{t("status")}</p>

          <div className="hero-stagger hero-stagger--4 hero-v3__actions">
            <Link href="#work" className="editorial-button">
              {t("cta_primary")}
              <ArrowDown size={15} aria-hidden="true" />
            </Link>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="editorial-link">
              GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <p className="hero-stagger hero-stagger--5 hero-v3__availability">{t("availability")}</p>
        </div>

        <aside className="hero-stagger hero-stagger--3 hero-index" aria-label="Technical focus">
          <div className="hero-index__brand" aria-hidden="true">
            <Image src="/brand/mark.svg" width={42} height={42} alt="" />
            <span>KK / 26</span>
          </div>

          <div className="hero-index__list">
            {siteConfig.focus.map(([index, stack]) => (
              <div key={index} className="hero-index__row">
                <span>{index}</span>
                <strong>{stack}</strong>
              </div>
            ))}
          </div>

          <div className="hero-index__footer">
            <span>Brasília / GO</span>
            <span>Software engineering</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
