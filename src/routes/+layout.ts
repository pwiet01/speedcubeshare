import { loadTranslations } from '$lib/translations';
import type { LayoutLoad } from './$types';
import { writableUser } from '$lib/ts/stores';
import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ url, data }) => {
  const { pathname } = url;
  const { user } = data;

  if (user !== get(writableUser)) {
    writableUser.set(user);
  }

  // i18n
  const initLocale = 'en';
  await loadTranslations(initLocale, pathname);

  return data;
};
