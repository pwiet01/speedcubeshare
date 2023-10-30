import { serverConfig } from '$lib/server/config/serverConfig';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
  return {
    debug: serverConfig.isDevEnv,
  };
};
