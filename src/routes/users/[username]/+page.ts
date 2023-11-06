import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, data }) => {
  return {
    meta: {
      title: params.username,
      disableTitleTranslation: true,
    },
    ...data,
  };
};
