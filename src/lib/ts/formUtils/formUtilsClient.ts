import type { FormParseData, FormValidationErrors } from '$lib/ts/formUtils/types';

export function getTranslatedFormErrors(
  formErrors: FormValidationErrors | undefined,
  trans: (key: string, params?: { [key: string]: string }) => string
): {
  [key: string]: string;
} {
  const translatedErrors: { [key: string]: string } = {};

  if (!formErrors) {
    return translatedErrors;
  }

  for (const [key, error] of Object.entries(formErrors)) {
    translatedErrors[key] = trans(error.key, error.translationParams);
  }

  return translatedErrors;
}

export function updateFormData(
  current: FormParseData,
  next: FormParseData | undefined
): FormParseData {
  if (!next) {
    return current;
  }

  const updatedData: FormParseData = {};
  for (const key of Object.keys(current)) {
    updatedData[key] = next[key] ?? '';
  }

  return updatedData;
}
