import type { FormParseData, FormValidationErrors } from '$lib/ts/formUtils/types';
import { t } from '$lib/translations';
import { get } from 'svelte/store';

export function getTranslatedFormErrors(formErrors: FormValidationErrors | undefined): {
  [key: string]: string;
} {
  const translatedErrors: { [key: string]: string } = {};

  if (!formErrors) {
    return translatedErrors;
  }

  const trans = get(t);
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
