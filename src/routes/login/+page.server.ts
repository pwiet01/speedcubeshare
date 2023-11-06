import type { Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/ts/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { LuciaError } from 'lucia';
import { parseFormData } from '$lib/server/ts/formUtils/formUtils';
import { validateEmail } from '$lib/server/ts/formUtils/validate';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

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
    password: { hideValue: true },
  });

  if (!form.validationResult.success) {
    return fail(400, {
      data: form.data,
      errors: form.validationResult.errors,
    });
  }

  try {
    const user = await auth.useKey('email', form.data['email'], form.data['password']);

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    locals.auth.setSession(session);
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      return fail(400, {
        message: 'Incorrect email or password',
      });
    }

    return fail(500, {
      message: 'Internal Error',
    });
  }

  throw redirect(302, '/');
}
