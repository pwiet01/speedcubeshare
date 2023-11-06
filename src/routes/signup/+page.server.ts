import type { Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/ts/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
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
    username: {},
    displayName: { required: false },
  });

  if (!form.validationResult.success) {
    return fail(400, {
      data: form.data,
      errors: form.validationResult.errors,
    });
  }

  const user = await auth.createUser({
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

  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });

  locals.auth.setSession(session);
  throw redirect(302, '/');
}
