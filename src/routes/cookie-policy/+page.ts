import type { PageLoad } from './$types';

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
