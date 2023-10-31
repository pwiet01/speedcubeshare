import { loadTranslations } from '$lib/translations';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data }) => {
  const { pathname } = url;

  // i18n
  const initLocale = 'en';
  await loadTranslations(initLocale, pathname);

  return data;
};
