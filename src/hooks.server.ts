import type { Handle, HandleServerError } from '@sveltejs/kit';
import { auth } from '$lib/server/ts/lucia';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  return resolve(event);
};

export const handleError: HandleServerError = async ({ error, event }) => {
  // 404 Error
  if (!event.route.id) {
    return {
      message: 'error.notFound',
    };
  }

  // eslint-disable-next-line no-console
  console.error(error);

  return {
    message: 'error.internal',
  };
};
