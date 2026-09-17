import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function AboutSection() {
  const t = await getTranslations("AboutModern");
  const tAbout = await getTranslations("About");
  const tA11y = await getTranslations("A11y");

  return (
    <section id="about" className="section-shell bg-[var(--background)]">
      <div className="container-shell">
        <span className="eyebrow">{t("present")}</span>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div className="motion-reveal">
            <h2 className="section-heading">{t("title1")} <span className="text-[var(--accent)]">{t("title2")}</span></h2>
            <div className="mt-10 max-w-2xl space-y-6">
              <p className="body-copy">{t("p1")}</p>
              <p className="body-copy">{t("p2")}</p>
            </div>
            <blockquote className="mt-10 max-w-2xl border-l-2 border-[var(--accent)] pl-5 text-base leading-7 text-[var(--text-muted)]">“{tAbout("quote")}”</blockquote>
          </div>

          <article className="profile-card motion-reveal self-start">
            <div className="profile-card__media">
              <Image
                src={siteConfig.profileImage}
                alt={tA11y("profile_photo")}
                fill
                className="profile-card__image"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <span className="profile-card__handle">@{siteConfig.githubUsername}</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{t("profile_label")}</p>
                  <p className="mt-3 max-w-md text-lg leading-8 text-[var(--text)]">{t("philosophy_text")}</p>
                </div>
                <Github className="mt-1 shrink-0 text-[var(--accent)]" size={20} aria-hidden="true" />
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">{t("profile_caption")}</p>

              <div className="mt-7 space-y-2 border-t border-[var(--border-soft)] pt-5">
                {[t("bullet1"), t("bullet2"), t("bullet3")].map((item) => (
                  <div key={item} className="flex items-start gap-3 py-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm leading-6 text-[var(--text-soft)]">{item}</span>
                  </div>
                ))}
              </div>

              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="button-secondary mt-7">
                {t("profile_link")}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
