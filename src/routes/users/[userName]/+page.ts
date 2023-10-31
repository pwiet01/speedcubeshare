import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    meta: {
      title: params.userName,
      disableTitleTranslation: true,
    },
  };
};
