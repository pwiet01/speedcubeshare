import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
  return {
    meta: {
      title: 'common.pageTitle.settings',
    },
    layout: {
      showTitle: true,
      maxWidth: 'small',
    },
    ...data,
  };
};
