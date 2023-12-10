import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    meta: {
      title: 'common.pageTitle.debug',
    },
    layout: {
      showTitle: true,
      maxWidth: 'small',
    },
  };
};
