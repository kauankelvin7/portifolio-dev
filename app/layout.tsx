import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { siteConfig, type SiteLocale } from "@/config/site";
import "./globals.css";
import "./v5.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = (await getLocale()) as SiteLocale;
  const localeConfig = siteConfig.locales[locale] ?? siteConfig.locales.pt;

  return {
    metadataBase: new URL(siteConfig.url),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteConfig.url}${localeConfig.path}`,
      siteName: "Kauan Kelvin — Portfolio",
      locale: localeConfig.openGraphLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `${siteConfig.url}${localeConfig.path}`,
      languages: Object.fromEntries(Object.values(siteConfig.locales).map((item) => [item.languageTag, `${siteConfig.url}${item.path}`])),
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.profileImage}`,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Desenvolvedor back-end em formação",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: ["Java", "Spring Boot", "PostgreSQL", "Python", "React", "TypeScript"],
  };

  return (
    <html lang={siteConfig.locales[locale as SiteLocale]?.languageTag ?? "pt-BR"} className={`${plex.variable} ${newsreader.variable}`}>
      <body className="bg-[var(--background)] text-[var(--text)]">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}

