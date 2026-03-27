import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScrool";
import { TransitionProvider } from "@/app/context/TransitionContext";
import PageTransition from "@/components/ui/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import { AccessibleMotion } from "@/components/ui/AccessibleMotion";

export const metadata: Metadata = {
  metadataBase: new URL('https://kauankelvindev.vercel.app'),
  title: 'Kauan Kelvin — Dev Fullstack',
  description: 'Portfólio com 3D interativo, performance Lighthouse 100 e design bold. Feito para ser lembrado.',
  openGraph: {
    title: 'Kauan Kelvin — Dev Fullstack',
    description: 'Portfólio com 3D interativo, performance Lighthouse 100 e design bold.',
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
    title: 'Kauan Kelvin — Dev Frontend',
    description: 'Portfólio com 3D interativo, performance Lighthouse 100 e design bold.',
    images: ['/og-image.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className="font-body antialiased bg-brand-black text-brand-white selection:bg-brand-red selection:text-white p-2 md:p-4 h-screen"
      >
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
      </body>
    </html>
  );
}