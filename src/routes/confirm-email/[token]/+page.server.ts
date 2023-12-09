import prisma from '$lib/server/ts/prisma';
import { updateUserEmailConfirmedStatus } from '$lib/server/ts/user/emailConfirmation';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const { params } = event;

  const token = await prisma.emailConfirmToken.findUnique({
    where: {
      token: params.token,
    },
  });

  const tokenExpired = token && token.expires < new Date();

  if (tokenExpired) {
    await deleteToken(token.token);
  }

  if (!token || tokenExpired) {
    throw redirect(302, '/');
  }

  const userId = token.user_id;
  await updateUserEmailConfirmedStatus(userId);
  await deleteUserTokens(userId);

  throw redirect(302, '/confirm-email/success');
};

function deleteToken(token: string) {
  return prisma.emailConfirmToken.delete({
    where: {
      token,
    },
  });
}

function deleteUserTokens(userId: string) {
  return prisma.emailConfirmToken.deleteMany({
    where: {
      user_id: userId,
    },
  });
}
