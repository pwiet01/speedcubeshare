import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    meta: {
      title: 'common.pageTitle.settings',
    },
    layout: {
      showTitle: true,
      maxWidth: 'small',
    },
  };
};
