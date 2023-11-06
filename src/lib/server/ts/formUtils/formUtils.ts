import type {
  FormParseOptions,
  FormParseResult,
  FormParseData,
  FormValidationResult,
  FormValidationErrors,
  FormParseFieldOptions,
} from '$lib/server/ts/formUtils/types';
import { validateLength, validateType } from '$lib/server/ts/formUtils/validate';

const defaultOptions: FormParseFieldOptions = {
  required: true,
  expectedType: 'string',
  minLength: 0,
  maxLength: 255,
  hideValue: false,
};

export function parseFormData(formData: FormData, options: FormParseOptions): FormParseResult {
  let validationResult: FormValidationResult = { success: true };
  const data: FormParseData = {};

  for (const [key, fieldOptions] of Object.entries(options)) {
    const value = formData.get(key);
    const mergedOptions = { ...defaultOptions, ...fieldOptions };

    const typeValidationResult = validateType(
      key,
      value,
      mergedOptions.expectedType,
      mergedOptions.required
    );

    if (!typeValidationResult.success) {
      validationResult = mergeValidationResults(validationResult, typeValidationResult);
      continue;
    }

    // Ignore files
    if (typeof value !== 'string') {
      continue;
    }

    if (!mergedOptions.hideValue) {
      data[key] = value;
    }

    const lengthValidationResult = validateLength(
      key,
      value,
      mergedOptions.minLength,
      mergedOptions.maxLength
    );

    if (!lengthValidationResult.success) {
      validationResult = mergeValidationResults(validationResult, lengthValidationResult);
      continue;
    }

    if (mergedOptions.validate) {
      const customValidationResult = mergedOptions.validate(key, value);

      if (!customValidationResult.success) {
        validationResult = mergeValidationResults(validationResult, customValidationResult);
      }
    }
  }

  return {
    validationResult,
    data,
  };
}

function mergeValidationResults(
  prev: FormValidationResult,
  current: FormValidationResult
): FormValidationResult {
  const success = prev.success && current.success;
  if (success) {
    return { success };
  }

  let errors: FormValidationErrors = {};

  if (!prev.success) {
    errors = {
      ...errors,
      ...prev.errors,
    };
  }

  if (!current.success) {
    errors = {
      ...errors,
      ...current.errors,
    };
  }

  return {
    success,
    errors,
  };
}
