import type { Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/ts/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseFormData } from '$lib/server/ts/formUtils/formUtils';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '$lib/server/ts/formUtils/userValidation/validate';
import type { User } from 'lucia';
import { LuciaError } from 'lucia';
import type { FormValidationErrors } from '$lib/ts/formUtils/types';
import { globalConfig } from '$lib/config/globalConfig';
import { sendEmailConfirmMessage } from '$lib/server/ts/user/emailConfirmation';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (user) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  async default({ request, locals }) {
    const form = await parseFormData(await request.formData(), {
      email: { validate: validateEmail },
      password: {
        trim: false,
        minLength: globalConfig.user.passwordMinLength,
        validate: validatePassword,
      },
      username: { maxLength: globalConfig.user.usernameMaxLength, validate: validateUsername },
      displayName: { maxLength: globalConfig.user.displayNameMaxLength },
    });

    if (!form.validationResult.success) {
      return fail(400, {
        data: form.data,
        errors: form.validationResult.errors,
      });
    }

    let user: User;

    try {
      user = await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: form.data['email'],
          password: form.data['password'],
        },
        attributes: {
          email: form.data['email'],
          username: form.data['username'],
          display_name: form.data['displayName'],
          email_confirmed: false,
        },
      });
    } catch (e) {
      if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
        const errors: FormValidationErrors = {
          email: {
            key: 'error.formValidation.userAlreadyExists',
          },
        };

        return fail(400, {
          data: form.data,
          errors,
        });
      }

      throw e;
    }

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    locals.auth.setSession(session);
    await sendEmailConfirmMessage(user.userId, user.email, false);

    throw redirect(303, '/');
  },
};
