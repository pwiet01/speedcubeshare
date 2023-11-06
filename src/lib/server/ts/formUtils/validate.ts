import type { FormValidationResult } from '$lib/ts/formUtils/types';

export function validateType(
  key: string,
  value: FormDataEntryValue | null,
  expectedType: 'string' | 'file',
  required: boolean
): FormValidationResult {
  if (required && (value === null || (typeof value === 'string' && value.length === 0))) {
    return fail(key, 'error.formValidation.required');
  }

  if (
    (expectedType === 'string' && typeof value !== 'string') ||
    (expectedType === 'file' && !(value instanceof File))
  ) {
    return fail(key, 'error.formValidation.invalidType', { s1: expectedType });
  }

  return success();
}

export function validateLength(
  key: string,
  value: string,
  minLength: number,
  maxLength: number
): FormValidationResult {
  if (value.length < minLength) {
    return fail(key, 'error.formValidation.minLength', { s1: minLength.toString() });
  }

  if (value.length > maxLength) {
    return fail(key, 'error.formValidation.maxLength', { s1: maxLength.toString() });
  }

  return success();
}

export function validateEmail(key: string, value: string): FormValidationResult {
  if (!/^\S+@\S+$/.test(value)) {
    return fail(key, 'error.formValidation.email');
  }

  return success();
}

function success(): FormValidationResult {
  return {
    success: true,
  };
}

function fail(
  key: string,
  errorKey: string,
  translationParams?: { [param: string]: string }
): FormValidationResult {
  return {
    success: false,
    errors: {
      [key]: {
        key: errorKey,
        translationParams,
      },
    },
  };
}
