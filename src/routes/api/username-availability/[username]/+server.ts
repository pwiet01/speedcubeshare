import type { RequestHandler } from '@sveltejs/kit';
import { validateUsername } from '$lib/server/ts/formUtils/userValidation/validate';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  return json(await validateUsername('username', params.username ?? ''));
};
