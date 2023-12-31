import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/ts/prisma';

export const load: PageServerLoad = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    throw error(404, 'error.notFound');
  }

  return {
    user,
  };
};
