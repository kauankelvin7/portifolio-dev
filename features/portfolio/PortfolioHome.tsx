import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CheckCircle2, Code2, Database, GitPullRequest, ServerCog } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { projects } from "@/features/portfolio/content/projects";
import { certificates } from "@/features/portfolio/content/skills";
import { ThreeFallback } from "@/features/portfolio/three-d";

const sceneByProject = {
  leve: "leve",
  omni: "omni",
  cinesia: "cinesia",
  dental: "automation",
} as const;

const featuredKeys = ["omni", "leve", "cinesia", "dental"] as const;

export async function PortfolioHome() {
  const t = await getTranslations("V5");
  const projectT = await getTranslations("ProjectsSection");
  const featured = featuredKeys.map((key) => projects.find((project) => project.translationKey === key)!);
  const diagnostic = projects.find((project) => project.translationKey === "socplug")!;

  const proofs = [
    {
      icon: GitPullRequest,
      title: t("proofs.rustdesk_title"),
      body: t("proofs.rustdesk_body"),
      href: "https://github.com/rustdesk/rustdesk/pulls?q=is%3Apr+author%3Akauankelvin7",
      link: t("proofs.rustdesk_link"),
    },
    {
      icon: Database,
      title: t("proofs.leve_title"),
      body: t("proofs.leve_body"),
      href: "https://github.com/kauankelvin7/Leve#readme",
      link: t("proofs.repository_link"),
    },
    {
      icon: ServerCog,
      title: t("proofs.omni_title"),
      body: t("proofs.omni_body"),
      href: "https://github.com/kauankelvin7/Omni#readme",
      link: t("proofs.repository_link"),
    },
  ];

  const stackGroups = [
    { key: "backend", primary: true, items: ["Java 17", "Spring Boot", "PostgreSQL", "REST APIs", "SQL"] },
    { key: "frontend", items: ["React", "TypeScript", "Next.js", "HTML", "CSS"] },
    { key: "automation", items: ["Python", "Selenium", "Openpyxl", "RPA"] },
    { key: "tools", items: ["Git", "GitHub Actions", "Docker", "Linux", "Playwright"] },
  ] as const;

  return (
    <>
      <section id="home" className="hero">
        <div className="hero__grid" aria-hidden="true" />
        <div className="container-shell hero__layout">
          <div className="hero__copy">
            <p className="hero__availability"><span />{t("hero.availability")}</p>
            <h1>{t("hero.title")}</h1>
            <p className="hero__lead">{t("hero.lead")}</p>
            <dl className="hero__facts">
              <div><dt>{t("hero.role_label")}</dt><dd>{t("hero.role")}</dd></div>
              <div><dt>{t("hero.stack_label")}</dt><dd>Java 17 · Spring Boot · PostgreSQL</dd></div>
            <div><dt>{t("hero.location_label")}</dt><dd>{siteConfig.location} · {t("hero.remote")}</dd></div>
            </dl>
            <div className="hero__actions">
              <Link className="button button--primary" href="#projects">{t("hero.projects_cta")}<ArrowDown size={16} /></Link>
              <a className="button button--quiet" href={siteConfig.links.resume} target="_blank">{t("hero.resume_cta")}<ArrowUpRight size={16} /></a>
            </div>
            <a className="hero__3d-link" href={siteConfig.links.portfolio3d} target="_blank" rel="noreferrer">
              <span className="hero__3d-pulse" aria-hidden="true" />
              {t("hero.portfolio3d_cta")}<ArrowUpRight size={14} />
            </a>
          </div>

          <div className="hero__visual" id="hero-three" data-three-scene="hero" role="img" aria-label={t("hero.visual_alt")}>
            <ThreeFallback scene="hero" />
            <div className="hero__visual-label" aria-hidden="true"><span>K</span><p>{t("hero.visual_caption")}</p></div>
          </div>
        </div>
      </section>

      <section className="proofs" aria-labelledby="proofs-title">
        <div className="container-shell">
          <div className="section-heading section-heading--compact">
            <h2 id="proofs-title">{t("proofs.title")}</h2>
          </div>
          <div className="proofs__grid">
            {proofs.map((proof) => {
              const Icon = proof.icon;
              return (
                <article className="proof" key={proof.title}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{proof.title}</h3>
                  <p>{proof.body}</p>
                  <a href={proof.href} target="_blank" rel="noreferrer">{proof.link}<ArrowUpRight size={14} /></a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="section projects" aria-labelledby="projects-title">
        <div className="container-shell">
          <div className="section-heading">
            <h2 id="projects-title">{t("projects.title")}</h2>
            <span>{t("projects.intro")}</span>
          </div>
          <div className="projects__grid">
            {featured.map((project) => {
              const scene = sceneByProject[project.translationKey as keyof typeof sceneByProject];
              return (
                <article className={`project project--${project.translationKey}`} key={project.id}>
                  <div className="project__media" data-three-scene={project.image ? undefined : scene}>
                    {project.image && <Image src={project.image} alt={projectT(`${project.translationKey}.image_alt`)} fill sizes="(max-width: 760px) 100vw, 50vw" className="project__image" />}
                    {!project.image && <ThreeFallback scene={scene} />}
                  </div>
                  <div className="project__body">
                    {project.image && <div className="project__scene" data-three-scene={scene}><ThreeFallback scene={scene} /></div>}
                    <p className="project__category">{projectT(`${project.translationKey}.category`)}</p>
                    <h3>{projectT(`${project.translationKey}.title`)}</h3>
                    <p>{projectT(`${project.translationKey}.description`)}</p>
                    <ul aria-label={t("projects.stack_label")}>{project.tags.slice(0, 6).map((tag) => <li key={tag}>{tag}</li>)}</ul>
                    <div className="project__links">
                      {project.caseStudy && <Link href={project.caseStudy}>{projectT("case_study")}</Link>}
                      <a href={project.link} target="_blank" rel="noreferrer">{projectT("repository")}<ArrowUpRight size={13} /></a>
                      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">{projectT("demo")}<ArrowUpRight size={13} /></a>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <article className="project project--compact">
            <div className="project--compact__mark" aria-hidden="true">
              <Code2 size={34} />
              <span>JNLP → WSS</span>
            </div>
            <div><p className="project__category">{projectT("socplug.category")}</p><h3>{projectT("socplug.title")}</h3><p>{projectT("socplug.description")}</p></div>
            <a href={diagnostic.link} target="_blank" rel="noreferrer">{projectT("repository")}<ArrowUpRight size={13} /></a>
          </article>
        </div>
      </section>

      <section className="section contribution" aria-labelledby="contribution-title">
        <div className="container-shell contribution__grid">
          <div className="section-heading">
            <h2 id="contribution-title">{t("contribution.title")}</h2>
            <span>{t("contribution.body")}</span>
          </div>
          <div className="contribution__body">
            <GitPullRequest size={28} aria-hidden="true" />
            <div>
              <h3>{t("contribution.pr_16135_title")}</h3>
              <p>{t("contribution.pr_16135_body")}</p>
              <a className="text-link" href="https://github.com/rustdesk/rustdesk/pull/16135" target="_blank" rel="noreferrer">{t("contribution.pr_16135_link")}<ArrowUpRight size={15} /></a>
            </div>
            <div>
              <h3>{t("contribution.pr_16162_title")}</h3>
              <p>{t("contribution.pr_16162_body")}</p>
              <a className="text-link" href="https://github.com/rustdesk/rustdesk/pull/16162" target="_blank" rel="noreferrer">{t("contribution.pr_16162_link")}<ArrowUpRight size={15} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="section stack" aria-labelledby="stack-title">
        <div className="container-shell">
          <div className="section-heading"><h2 id="stack-title">{t("stack.title")}</h2><span>{t("stack.intro")}</span></div>
          <div className="stack__grid">
            {stackGroups.map((group) => (
              <section className={"primary" in group && group.primary ? "stack-group stack-group--primary" : "stack-group"} key={group.key}>
                {group.key === "backend" ? <Database aria-hidden="true" /> : group.key === "tools" ? <Code2 aria-hidden="true" /> : <ServerCog aria-hidden="true" />}
                <h3>{t(`stack.${group.key}`)}</h3>
                <ul>{group.items.map((item, index) => <li key={item} className={"primary" in group && group.primary && index < 3 ? "is-core" : ""}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="section journey" aria-labelledby="journey-title">
        <div className="container-shell journey__layout">
          <div className="journey__identity">
            <div className="section-heading"><h2 id="journey-title">{t("journey.title")}</h2></div>
            <div className="journey__portrait"><Image src={siteConfig.profileImage} alt={siteConfig.name} fill sizes="(max-width: 900px) 100vw, 34vw" /></div>
          </div>
          <div className="journey__content">
            <ol className="journey__timeline">
              <li><span>2024 — {t("journey.present")}</span><h3>{t("journey.education_title")}</h3><p>{t("journey.education_body")}</p></li>
              <li><span>2024 — {t("journey.present")}</span><h3>{t("journey.work_title")}</h3><p>{t("journey.work_body")}</p></li>
            </ol>
            <div className="journey__languages"><h3>{t("journey.languages_title")}</h3><p>{t("journey.languages")}</p></div>
            <div className="certificates"><h3>{t("journey.certificates_title")}</h3>{certificates.map((certificate) => <div key={certificate.id}><CheckCircle2 size={15} /><span>{certificate.name}</span><small>{certificate.issuer}</small></div>)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
