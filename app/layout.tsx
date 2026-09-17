import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: '400',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    metadataBase: new URL('https://kauankelvindev.vercel.app'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://kauankelvindev.vercel.app',
      siteName: 'Kauan Kelvin — Portfolio',
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfólio de Kauan Kelvin',
      }],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${archivoBlack.variable}`}>
      <body className="font-body bg-[var(--background)] text-[var(--text)]">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <main className="min-h-screen w-full overflow-x-clip bg-[var(--background)]">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
