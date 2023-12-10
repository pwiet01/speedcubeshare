import prisma from '$lib/server/ts/prisma';
import { generateToken, getDatePlusDays } from '$lib/ts/utils';
import { serverConfig } from '$lib/server/config/serverConfig';
import { sendMail } from '$lib/server/mail/mailer';
import { ORIGIN } from '$env/static/private';
import { auth } from '$lib/server/ts/lucia';

export async function sendResetPasswordMessage(userId: string, email: string) {
  await deleteUserTokens(userId);
  let token = generateToken();

  // Make sure the token is unique
  while (!(await tokenIsUnique(token))) {
    token = generateToken();
  }

  await createToken(userId, token);

  return sendMail({
    to: email,
    template: 'resetPassword',
    props: {
      resetUrl: `${ORIGIN}/reset-password/${token}`,
    },
  });
}

export async function updateUserPassword(userId: string, plainPassword: string) {
  const user = await auth.getUser(userId);
  await auth.invalidateAllUserSessions(userId);
  await auth.updateKeyPassword('email', user.email, plainPassword);
}

function createToken(userId: string, token: string) {
  return prisma.passwordRestoreToken.create({
    data: {
      user_id: userId,
      token,
      expires: getDatePlusDays(serverConfig.tokenExpiration.resetPassword),
    },
  });
}

function deleteUserTokens(userId: string) {
  return prisma.passwordRestoreToken.deleteMany({
    where: {
      user_id: userId,
    },
  });
}

async function tokenIsUnique(token: string) {
  const existingToken = await prisma.passwordRestoreToken.findUnique({
    where: {
      token,
    },
  });

  return !existingToken;
}
