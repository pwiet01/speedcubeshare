import prisma from '$lib/server/ts/prisma';
import { generateToken, getDatePlusDays } from '$lib/ts/utils';
import { sendMail } from '$lib/server/mail/mailer';
import { serverConfig } from '$lib/server/config/serverConfig';
import { ORIGIN } from '$env/static/private';

export async function sendEmailConfirmMessage(
  userId: string,
  email: string,
  deleteExisting = true
) {
  if (deleteExisting) {
    await deleteUserTokens(userId);
  }

  let token = generateToken();

  // Make sure the token is unique
  while (!(await tokenIsUnique(token))) {
    token = generateToken();
  }

  await createToken(userId, token);

  return sendMail({
    to: email,
    template: 'confirmEmail',
    props: {
      confirmUrl: `${ORIGIN}/confirm-email/${token}`,
    },
  });
}

export function updateUserEmailConfirmedStatus(userId: string, status = true) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email_confirmed: status,
    },
  });
}

function createToken(userId: string, token: string) {
  return prisma.emailConfirmToken.create({
    data: {
      user_id: userId,
      token,
      expires: getDatePlusDays(serverConfig.tokenExpiration.confirmEmail),
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

async function tokenIsUnique(token: string) {
  const existingToken = await prisma.emailConfirmToken.findUnique({
    where: {
      token,
    },
  });

  return !existingToken;
}
