import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, data }) => {
  return {
    meta: {
      title: params.userName,
      disableTitleTranslation: true,
    },
    ...data,
  };
};
