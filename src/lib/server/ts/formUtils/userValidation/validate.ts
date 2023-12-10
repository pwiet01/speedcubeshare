import type { FormValidationResult } from '$lib/ts/formUtils/types';
import {
  validateEmailFormat,
  validatePasswordFormat,
  validateUsernameFormat,
} from '$lib/ts/formUtils/userValidation/validateClient';
import prisma from '$lib/server/ts/prisma';
import { fail, success } from '$lib/server/ts/formUtils/validate';

export async function validateEmail(key: string, value: string): Promise<FormValidationResult> {
  if (!validateEmailFormat(value)) {
    return fail(key, 'error.formValidation.email');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (user) {
    return fail(key, 'error.formValidation.userAlreadyExists');
  }

  return success();
}

export async function validateEmailExists(
  key: string,
  value: string
): Promise<FormValidationResult> {
  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (!user) {
    return fail(key, 'error.formValidation.userDoesNotExist');
  }

  return success();
}

export function validatePassword(key: string, value: string): FormValidationResult {
  if (!validatePasswordFormat(value)) {
    return fail(key, 'error.formValidation.password');
  }

  return success();
}

export async function validateUsername(key: string, value: string): Promise<FormValidationResult> {
  if (!validateUsernameFormat(value)) {
    return fail(key, 'error.formValidation.username');
  }

  const user = await prisma.user.findUnique({
    where: {
      username: value,
    },
  });

  if (user) {
    return fail(key, 'error.formValidation.usernameAlreadyTaken');
  }

  return success();
}
