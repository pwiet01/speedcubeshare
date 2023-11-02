import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/ts/prisma';

export const load: PageServerLoad = async ({ params: { userName } }) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });

  if (!user) {
    throw error(404, 'Not Found');
  }

  return {
    user: user,
  };
};
