import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseFormData } from '$lib/server/ts/formUtils/formUtils';
import { validateEmailExists } from '$lib/server/ts/formUtils/userValidation/validate';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (user) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ request }) => defaultAction(request),
};

async function defaultAction(request: Request) {
  const form = await parseFormData(await request.formData(), {
    email: { validate: validateEmailExists },
  });

  if (!form.validationResult.success) {
    return fail(400, {
      data: form.data,
      errors: form.validationResult.errors,
    });
  }

  return {
    success: true,
    data: {
      email: '',
    },
  };
}
