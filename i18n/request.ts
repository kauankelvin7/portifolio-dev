import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const supportedLocales = ['pt', 'en', 'es'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale: SupportedLocale = isSupportedLocale(savedLocale) ? savedLocale : 'pt';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
