import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/ts/lucia';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

  if (session) {
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
  }

  throw redirect(302, '/login');
};
