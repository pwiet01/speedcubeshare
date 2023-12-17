import type { Handle, HandleServerError } from '@sveltejs/kit';
import { auth } from '$lib/server/ts/lucia';
import { ADMIN_LOGIN } from '$env/static/private';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
  if (!dev) {
    // BASIC AUTH (Production Only)
    const basicAuthHeader = event.request.headers.get('Authorization');

    if (basicAuthHeader !== `Basic ${btoa(ADMIN_LOGIN)}`) {
      return new Response('Not authorized. SpeedCubeShare is currently under construction...', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Access to SpeedCubeShare", charset="UTF-8"',
        },
      });
    }
  }

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
