import type { Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/ts/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { filterFormParseData, parseFormData } from '$lib/server/ts/formUtils/formUtils';
import { validateEmail } from '$lib/server/ts/formUtils/validate';
import type { User } from 'lucia';
import { LuciaError } from 'lucia';
import type { FormValidationErrors } from '$lib/ts/formUtils/types';

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();

  if (session) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => defaultAction(request, locals),
};

async function defaultAction(request: Request, locals: App.Locals) {
  const form = parseFormData(await request.formData(), {
    email: { validate: validateEmail },
    password: {},
    username: {},
    displayName: {},
  });

  const filteredFormData = filterFormParseData(form.data, new Set(['password']));

  if (!form.validationResult.success) {
    return fail(400, {
      data: filteredFormData,
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
        data: filteredFormData,
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
  throw redirect(302, '/');
}
