import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { TransitionProvider } from "@/app/context/TransitionContext";
import PageTransition from "@/components/ui/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import { AccessibleMotion } from "@/components/ui/AccessibleMotion";

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
      siteName: 'Kauan Kelvin Portfolio',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Preview do portfólio de Kauan Kelvin',
        },
      ],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className="font-body antialiased bg-brand-black text-brand-white selection:bg-brand-red selection:text-white p-2 md:p-4 h-screen"
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AccessibleMotion>
            <NoiseOverlay />
            <SmoothScroll>
              <TransitionProvider>
                <CustomCursor />
                <PageTransition />
                <main className="relative h-full w-full rounded-3xl md:rounded-4xl overflow-y-auto overflow-x-hidden bg-zinc-950 border border-white/5 shadow-2xl">
                  {children}
                </main>
              </TransitionProvider>
            </SmoothScroll>
          </AccessibleMotion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}