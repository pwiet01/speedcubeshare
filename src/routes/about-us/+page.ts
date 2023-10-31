import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    meta: {
      title: 'common.pageTitle.aboutUs',
    },
    layout: {
      showTitle: true,
      maxWidth: 'small',
    },
  };
};
