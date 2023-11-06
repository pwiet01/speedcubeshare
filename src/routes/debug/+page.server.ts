import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';

export const load: PageServerLoad = () => {
  if (dev) {
    throw error(404, 'error.notFound');
  }
};
