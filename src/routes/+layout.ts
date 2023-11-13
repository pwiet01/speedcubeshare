import { loadTranslations } from '$lib/translations';
import type { LayoutLoad } from './$types';
import { user as userStore } from '$lib/ts/stores';
import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ url, data }) => {
  const { pathname } = url;
  const { user } = data;

  if (user !== get(userStore)) {
    userStore.set(user);
  }

  // i18n
  const initLocale = 'en';
  await loadTranslations(initLocale, pathname);

  return data;
};
