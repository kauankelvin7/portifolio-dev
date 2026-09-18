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
    <section id="about" className="editorial-section">
      <div className="container-shell">
        <div className="section-intro">
          <span className="section-index">01</span>
          <span className="section-kicker">{t("present")}</span>
        </div>

        <div className="about-v3">
          <div className="about-v3__copy reveal-stagger">
            <h2 className="editorial-heading">
              {t("title1")} <span>{t("title2")}</span>
            </h2>
            <div className="about-v3__prose">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>
            <blockquote>“{tAbout("quote")}”</blockquote>
          </div>

          <div className="about-v3__profile reveal-stagger">
            <div className="about-v3__photo">
              <Image
                src={siteConfig.profileImage}
                alt={tA11y("profile_photo")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 36vw"
              />
            </div>

            <div className="about-v3__meta">
              <p>{t("philosophy_text")}</p>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="editorial-link">
                @{siteConfig.githubUsername}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>

            <ol className="about-v3__focus">
              {bullets.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
