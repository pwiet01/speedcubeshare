import { globalConfig } from '$lib/config/globalConfig';

export function validateEmailFormat(value: string): boolean {
  return /^\S+@\S+$/.test(value);
}

export function validatePasswordFormat(value: string): boolean {
  return (
    value.length >= globalConfig.user.passwordMinLength &&
    /\D/.test(value) && // any non-digit
    /\d/.test(value) // any digit
  );
}

export function validateUsernameFormat(value: string): boolean {
  // only lowercase chars, digits and underscores allowed
  return /^([a-z]|\d|_)+$/.test(value);
}
