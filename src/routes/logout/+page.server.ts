import { auth } from '$lib/server/ts/lucia';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
  async default({ locals }) {
    const session = await locals.auth.validate();

    if (session) {
      await auth.invalidateSession(session.sessionId);
      locals.auth.setSession(null);
    }

    throw redirect(302, '/login');
  },
};
