import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { caseStudies, isCaseStudySlug } from "@/features/portfolio/content/case-studies";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) return {};
  const t = await getTranslations(`CaseStudies.${slug}`);
  return { title: t("meta_title"), description: t("meta_description") };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) notFound();

  const study = caseStudies[slug];
  const t = await getTranslations(`CaseStudies.${slug}`);
  const common = await getTranslations("CaseStudies.common");

  return (
    <main className="case-study">
      <div className="container-shell case-study__hero">
        <Link href="/#projects" className="text-link"><ArrowLeft size={15} />{common("back")}</Link>
        <p className="case-study__kicker">{common("eyebrow")}</p>
        <h1>{t("title")}</h1>
        <p className="case-study__summary">{t("summary")}</p>
        <div className="case-study__actions">
          {study.links.map((link) => <a className="button button--quiet" href={link.href} target="_blank" rel="noreferrer" key={link.href}>{common(link.labelKey)}<ArrowUpRight size={14} /></a>)}
        </div>
      </div>

      <div className="container-shell case-study__image">
        <Image src={study.image} alt={common("image_alt", { title: t("title") })} fill priority sizes="(max-width: 1200px) 100vw, 1120px" />
      </div>

      <article className="container-shell case-study__body">
        <section><h2>{common("problem")}</h2><p>{t("problem_body")}</p></section>
        <section><h2>{common("stack")}</h2><ul className="case-study__stack">{study.stack.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>{common("decisions")}</h2><div className="case-study__grid">{study.decisionKeys.map((key) => <div key={key}><h3>{t(`decisions.${key}.title`)}</h3><p>{t(`decisions.${key}.body`)}</p></div>)}</div></section>
        <section><h2>{common("tradeoffs")}</h2><div className="case-study__grid">{study.tradeoffKeys.map((key) => <div key={key}><h3>{t(`tradeoffs.${key}.title`)}</h3><p>{t(`tradeoffs.${key}.body`)}</p></div>)}</div></section>
        <section><h2>{common("evidence")}</h2><ul className="case-study__evidence">{study.evidenceKeys.map((key) => <li key={key}>{t(`evidence.${key}`)}</li>)}</ul></section>
        <section><h2>{common("next")}</h2><p>{t("next_body")}</p></section>
        <section><h2>{common("sources")}</h2><p>{common("source_note")}</p><div className="case-study__sources">{study.sources.map((source, index) => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{t(`sources.${Object.keys(t.raw("sources"))[index]}`)}<ArrowUpRight size={13} /></a>)}</div></section>
      </article>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}
