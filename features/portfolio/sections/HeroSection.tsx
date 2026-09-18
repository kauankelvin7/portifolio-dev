import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { siteConfig } from "@/config/site";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section id="home" className="hero-v5">
      <div className="container-shell hero-v5__grid">
        <div className="hero-v5__copy">
          <TypewriterText
            text={`${t("role1")} / ${t("role2")}`}
            className="hero-v5__eyebrow"
            startDelay={180}
            speed={24}
          />

          <h1 className="hero-v5__title" aria-label={siteConfig.name}>
            <span className="hero-v5__title-line hero-v5__title-line--1">Kauan</span>
            <span className="hero-v5__title-line hero-v5__title-line--2">Kelvin<span className="hero-v5__accent">.</span></span>
          </h1>

          <p className="hero-v5__lead">{t("status")}</p>

          <div className="hero-v5__actions">
            <Link href="#work" className="editorial-button">
              {t("cta_primary")}
              <ArrowDown size={15} aria-hidden="true" />
            </Link>

            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="editorial-link">
              GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-v5__meta">
            <span>{t("availability")}</span>
            <span aria-hidden="true">↘</span>
          </div>
        </div>

        <div className="hero-v5__portrait">
          <div className="hero-v5__portrait-frame">
            <Image
              src={siteConfig.profileImage}
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
              className="hero-v5__portrait-image"
            />
            <div className="hero-v5__portrait-scan" aria-hidden="true" />
          </div>

          <div className="hero-v5__portrait-caption">
            <span>Software engineering</span>
            <span>Brasília / GO</span>
          </div>
        </div>
      </div>

      <div className="container-shell hero-v5__focus" data-stagger-group>
        {siteConfig.focus.map(([index, stack]) => (
          <div key={index} className="hero-v5__focus-item" data-stagger-item>
            <span>{index}</span>
            <strong>{stack}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
