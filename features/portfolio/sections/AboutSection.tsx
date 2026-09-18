import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function AboutSection() {
  const t = await getTranslations("AboutModern");
  const tAbout = await getTranslations("About");
  const tA11y = await getTranslations("A11y");
  const bullets = [t("bullet1"), t("bullet2"), t("bullet3")];

  return (
    <section id="about" className="editorial-section about-v4-section">
      <div className="container-shell">
        <div className="section-intro">
          <span className="section-index">01</span>
          <span className="section-kicker">{t("present")}</span>
        </div>

        <div className="about-v4">
          <div className="about-v4__media reveal-stagger">
            <div className="about-v4__photo">
              <Image
                src={siteConfig.profileImage}
                alt={tA11y("profile_photo")}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>

            <div className="about-v4__media-footer">
              <span>@{siteConfig.githubUsername}</span>
              <span>Brasília / GO</span>
            </div>
          </div>

          <div className="about-v4__content reveal-stagger">
            <h2 className="editorial-heading">
              {t("title1")} <span>{t("title2")}</span>
            </h2>

            <div className="about-v4__prose">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            <blockquote>“{tAbout("quote")}”</blockquote>

            <ol className="about-v4__focus">
              {bullets.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>

            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="editorial-link">
              {t("profile_link")}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
