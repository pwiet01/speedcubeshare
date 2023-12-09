import prisma from '$lib/server/ts/prisma';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { globalConfig } from '$lib/config/globalConfig';
import { validatePassword } from '$lib/server/ts/formUtils/userValidation/validate';
import { parseFormData } from '$lib/server/ts/formUtils/formUtils';
import type { PasswordRestoreToken } from '@prisma/client';
import { updateUserPassword } from '$lib/server/ts/user/passwordReset';
import { redirect as redirectWithFlash } from 'sveltekit-flash-message/server';
import { updateUserEmailConfirmedStatus } from '$lib/server/ts/user/emailConfirmation';

export const load: PageServerLoad = async ({ params }) => {
  await checkToken(params.token);
};

export const actions: Actions = {
  async default(event) {
    const { request, params } = event;
    const token = await checkToken(params.token);

    const form = await parseFormData(await request.formData(), {
      password: {
        trim: false,
        minLength: globalConfig.user.passwordMinLength,
        validate: validatePassword,
      },
    });

    if (!form.validationResult.success) {
      return fail(400, {
        data: form.data,
        errors: form.validationResult.errors,
      });
    }

    const userId = token.user_id;
    await updateUserPassword(userId, form.data['password']);
    await updateUserEmailConfirmedStatus(userId);
    await deleteUserTokens(userId);

    const flash: App.Flash = { type: 'success', message: 'common.auth.resetPasswordSuccess' };
    throw redirectWithFlash('/login', flash, event);
  },
};

async function checkToken(tokenString: string | undefined): Promise<PasswordRestoreToken> {
  if (!tokenString) {
    throw redirect(302, '/');
  }

  const token = await prisma.passwordRestoreToken.findUnique({
    where: {
      token: tokenString,
    },
  });

  const tokenExpired = token && token.expires < new Date();

  if (tokenExpired) {
    await deleteToken(token.token);
  }

  if (!token || tokenExpired) {
    throw redirect(302, '/');
  }

  return token;
}

function deleteToken(token: string) {
  return prisma.passwordRestoreToken.delete({
    where: {
      token,
    },
  });
}

async function deleteUserTokens(userId: string) {
  await prisma.passwordRestoreToken.deleteMany({
    where: {
      user_id: userId,
    },
  });

  await prisma.emailConfirmToken.deleteMany({
    where: {
      user_id: userId,
    },
  });
}
