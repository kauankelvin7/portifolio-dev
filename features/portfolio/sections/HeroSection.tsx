import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section id="home" className="hero-v4">
      <div className="hero-v4__ambient" aria-hidden="true" />

      <div className="container-shell hero-v4__main">
        <div className="hero-v4__copy">
          <p className="hero-stagger hero-stagger--1 hero-v4__eyebrow">
            <span>{t("role1")}</span>
            <span aria-hidden="true">/</span>
            <span>{t("role2")}</span>
          </p>

          <h1 className="hero-stagger hero-stagger--2 hero-v4__title">
            {t("name1")}<br />
            <span>{t("name2")}</span>
          </h1>

          <p className="hero-stagger hero-stagger--3 hero-v4__lead">{t("status")}</p>

          <div className="hero-stagger hero-stagger--4 hero-v4__actions">
            <Link href="#work" className="editorial-button">
              {t("cta_primary")}
              <ArrowDown size={15} aria-hidden="true" />
            </Link>

            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="editorial-link">
              GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <p className="hero-stagger hero-stagger--5 hero-v4__availability">{t("availability")}</p>
        </div>

        <div className="hero-stagger hero-stagger--3 hero-v4__visual" aria-hidden="true">
          <div className="hero-v4__orbit-frame">
            <Image
              src="/brand/orbit-symbol.svg"
              width={520}
              height={520}
              alt=""
              className="hero-v4__orbit"
              priority
            />
          </div>

          <div className="hero-v4__visual-note hero-v4__visual-note--top">
            <span>01</span>
            <strong>Engineering</strong>
          </div>

          <div className="hero-v4__visual-note hero-v4__visual-note--bottom">
            <span>02</span>
            <strong>Automation</strong>
          </div>
        </div>
      </div>

      <div className="container-shell hero-v4__focus">
        {siteConfig.focus.map(([index, stack]) => (
          <div key={index} className="hero-v4__focus-item">
            <span>{index}</span>
            <strong>{stack}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
