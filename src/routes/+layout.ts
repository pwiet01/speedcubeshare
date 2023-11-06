import { loadTranslations } from '$lib/translations';
import type { LayoutLoad } from './$types';
import { user } from '$lib/ts/stores';
import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ url, data }) => {
  const { pathname } = url;
  const { session } = data;

  if (session?.user !== get(user)) {
    user.set(session?.user);
  }

  // i18n
  const initLocale = 'en';
  await loadTranslations(initLocale, pathname);

  return data;
};
