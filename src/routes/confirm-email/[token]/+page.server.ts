import prisma from '$lib/server/ts/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const { params } = event;

  const token = await prisma.emailConfirmToken.findUnique({
    where: {
      token: params.token,
    },
  });

  if (!token) {
    return {
      success: false,
      message: 'common.auth.confirmEmail.tokenInvalid',
    };
  }

  if (token.expires < new Date()) {
    await deleteToken(token.token);

    return {
      success: false,
      message: 'common.auth.confirmEmail.tokenExpired',
    };
  }

  const userId = token.user_id;
  await updateUserEmailConfirmedStatus(userId);
  await deleteUserTokens(userId);

  return {
    success: true,
    message: 'common.auth.confirmEmail.success',
  };
};

function deleteToken(token: string) {
  return prisma.emailConfirmToken.delete({
    where: {
      token,
    },
  });
}

function deleteUserTokens(userId: string) {
  return prisma.emailConfirmToken.delete({
    where: {
      user_id: userId,
    },
  });
}

function updateUserEmailConfirmedStatus(userId: string, status = true) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email_confirmed: status,
    },
  });
}
