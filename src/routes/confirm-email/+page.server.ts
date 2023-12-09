import { sendEmailConfirmMessage } from '$lib/server/ts/user/emailConfirmation';
import { error, type Actions } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  throw error(405, 'error.methodNotAllowed');
};

export const actions: Actions = {
  async default(event) {
    const { locals, request } = event;

    const user = (await locals.auth.validate())?.user;

    if (!user || user.email_confirmed) {
      throw error(403, 'error.forbidden');
    }

    await sendEmailConfirmMessage(user.userId, user.email);

    const flash: App.Flash = { type: 'success', message: 'common.auth.confirmEmail.sent' };

    let redirectPath = (await request.formData()).get('redirectPath');
    if (!redirectPath || typeof redirectPath !== 'string') {
      redirectPath = '/';
    }

    throw redirect(redirectPath, flash, event);
  },
};
