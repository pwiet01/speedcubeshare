import { error } from '@sveltejs/kit';
import { serverConfig } from '$lib/server/config/serverConfig';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  if (!serverConfig.isDevEnv) {
    throw error(404, 'Not Found');
  }
};
