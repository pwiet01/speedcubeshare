import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    meta: {
      title: 'common.pageTitle.legalNotice',
    },
    layout: {
      showTitle: true,
      maxWidth: 'small',
    },
  };
};
