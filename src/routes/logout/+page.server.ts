import { auth } from '$lib/server/ts/lucia';
import type { Actions } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

export const actions: Actions = {
  async default(event) {
    const { locals } = event;
    const session = await locals.auth.validate();

    if (session) {
      await auth.invalidateSession(session.sessionId);
      locals.auth.setSession(null);
    }

    const flash: App.Flash = { type: 'success', message: 'common.auth.toast.signOut' };
    throw redirect('/login', flash, event);
  },
};
