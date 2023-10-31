import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';
import lang from './lang.json';

const config: Config<{ s1?: string; s2?: string }> = {
  translations: {
    en: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./en/common.json')).default,
    },
    {
      locale: 'en',
      key: 'legalNotice',
      routes: ['/legal-notice'],
      loader: async () => (await import('./en/legalNotice.json')).default,
    },
  ],
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
