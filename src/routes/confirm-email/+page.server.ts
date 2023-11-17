import { sendEmailConfirmMessage } from '$lib/server/ts/user/emailConfirmation';
import { error, type Actions } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  throw error(405, 'error.methodNotAllowed');
};

export const actions: Actions = {
  async default(event) {
    const { locals } = event;

    const user = (await locals.auth.validate())?.user;

    if (!user || user.email_confirmed) {
      throw error(403, 'error.forbidden');
    }

    await sendEmailConfirmMessage(user);

    const flash: App.Flash = { type: 'success', message: 'common.auth.confirmEmail.sent' };
    throw redirect('/', flash, event);
  },
};
