import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    meta: {
      title: 'Legal Notice',
      keywords: 'legal-notice',
    },
  };
};
