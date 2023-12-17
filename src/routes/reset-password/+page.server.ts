import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseFormData } from '$lib/server/ts/formUtils/formUtils';
import { validateEmailExists } from '$lib/server/ts/formUtils/userValidation/validate';
import { sendResetPasswordMessage } from '$lib/server/ts/user/passwordReset';
import prisma from '$lib/server/ts/prisma';
import { redirect as redirectWithFlash } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (user) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  async default(event) {
    const { request } = event;

    const form = await parseFormData(await request.formData(), {
      email: { validate: validateEmailExists },
    });

    if (!form.validationResult.success) {
      return fail(400, {
        data: form.data,
        errors: form.validationResult.errors,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: form.data['email'],
      },
    });

    if (user) {
      await sendResetPasswordMessage(user.id, user.email);
    }

    const flash: App.Flash = { type: 'success', message: 'common.auth.forgotPasswordSuccess' };
    throw redirectWithFlash('/login', flash, event);
  },
};
