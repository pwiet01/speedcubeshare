import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
  return {
    meta: {
      title: 'common.pageTitle.cookiePolicy',
    },
    layout: {
      showTitle: true,
      maxWidth: 'small',
    },
  };
};
