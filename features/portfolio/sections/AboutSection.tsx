import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function AboutSection() {
  const t = await getTranslations("AboutModern");
  const tAbout = await getTranslations("About");
  const bullets = [t("bullet1"), t("bullet2"), t("bullet3")];

  return (
    <section id="about" className="editorial-section about-v5-section">
      <div className="container-shell">
        <div className="section-intro">
          <span className="section-index">01</span>
          <span className="section-kicker">{t("present")}</span>
        </div>

        <div className="about-v5">
          <div className="about-v5__statement reveal-stagger">
            <h2 className="editorial-heading">
              {t("title1")} <span>{t("title2")}</span>
            </h2>
            <blockquote>“{tAbout("quote")}”</blockquote>
          </div>

          <div className="about-v5__content reveal-stagger">
            <div className="about-v5__prose">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            <ol className="about-v5__focus" data-stagger-group>
              {bullets.map((item, index) => (
                <li key={item} data-stagger-item>
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
