import type {
  FormParseOptions,
  FormParseResult,
  FormParseData,
  FormValidationResult,
  FormValidationErrors,
  FormParseFieldOptions,
} from '$lib/ts/formUtils/types';
import { validateLength, validateType } from '$lib/server/ts/formUtils/validate';

const defaultOptions: FormParseFieldOptions = {
  required: true,
  expectedType: 'string',
  minLength: 0,
  maxLength: 255,
  trim: true,
};

export async function parseFormData(
  formData: FormData,
  options: FormParseOptions
): Promise<FormParseResult> {
  let validationResult: FormValidationResult = { success: true };
  const data: FormParseData = {};

  for (const [key, fieldOptions] of Object.entries(options)) {
    let value = formData.get(key);
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

    if (mergedOptions.trim) {
      value = value.trim();
    }

    data[key] = value;

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
      const customValidationResult = await mergedOptions.validate(key, value);

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

export function filterFormParseData(data: FormParseData, hideKeys: Set<string>): FormParseData {
  const filteredData: FormParseData = {};
  for (const [key, value] of Object.entries(data)) {
    if (!hideKeys.has(key)) {
      filteredData[key] = value;
    }
  }

  return filteredData;
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
