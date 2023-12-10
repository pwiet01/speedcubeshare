import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/ts/lucia';
import { redirect as redirectWithFlash } from 'sveltekit-flash-message/server';
import { getCurrentUserOrRedirectToLogin } from '$lib/server/ts/user/authorization';
import { parseFormData } from '$lib/server/ts/formUtils/formUtils';
import { globalConfig } from '$lib/config/globalConfig';
import { validatePassword } from '$lib/server/ts/formUtils/userValidation/validate';
import type { FormParseData, FormParseOptions } from '$lib/ts/formUtils/types';
import prisma from '$lib/server/ts/prisma';
import { updateUserPassword } from '$lib/server/ts/user/passwordReset';

export const load: PageServerLoad = async ({ locals }) => {
  const user = await getCurrentUserOrRedirectToLogin(locals.auth);

  return {
    user,
  };
};

export const actions: Actions = {
  async save(event) {
    const { request, locals } = event;
    const user = await getCurrentUserOrRedirectToLogin(locals.auth);
    const formData = await request.formData();

    const formParseOptions: FormParseOptions = {
      displayName: { maxLength: globalConfig.user.displayNameMaxLength },
    };

    const newPassword = !!formData.get('password');
    if (newPassword) {
      formParseOptions['password'] = {
        trim: false,
        minLength: globalConfig.user.passwordMinLength,
        validate: validatePassword,
      };
    }

    const form = await parseFormData(formData, formParseOptions);

    if (!form.validationResult.success) {
      return fail(400, {
        data: form.data,
        errors: form.validationResult.errors,
      });
    }

    await updateUser(user.userId, form.data);
    if (newPassword) {
      await updatePassword(locals, user.userId, form.data['password']);
    }

    const flash: App.Flash = { type: 'success', message: 'settings.saved' };
    throw redirectWithFlash(`/users/${user.username}`, flash, event);
  },
  async signOut(event) {
    const { locals } = event;
    const user = await getCurrentUserOrRedirectToLogin(locals.auth);

    await auth.invalidateAllUserSessions(user.userId);
    locals.auth.setSession(null);

    const flash: App.Flash = { type: 'success', message: 'common.auth.signOutSuccess' };
    throw redirectWithFlash('/login', flash, event);
  },
};

function updateUser(userId: string, data: FormParseData) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      display_name: data['displayName'],
    },
  });
}

async function updatePassword(locals: App.Locals, userId: string, newPassword: string) {
  await updateUserPassword(userId, newPassword);

  const session = await auth.createSession({
    userId,
    attributes: {},
  });

  locals.auth.setSession(session);
}
