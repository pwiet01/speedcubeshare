export interface FormValidationErrors {
  [key: string]: {
    messageKey: string;
    translationParams?: {
      [param: string]: string;
    };
  };
}

export type FormValidationResult =
  | {
      success: true;
    }
  | {
      success: false;
      errors: FormValidationErrors;
    };

export interface FormParseFieldOptions {
  validate?: (key: string, value: string) => FormValidationResult;
  required: boolean;
  expectedType: 'string' | 'file';
  minLength: number;
  maxLength: number;
  hideValue: boolean;
}

export interface FormParseOptions {
  [fieldName: string]: Partial<FormParseFieldOptions>;
}

export interface FormParseData {
  [fieldName: string]: string;
}

export interface FormParseResult {
  validationResult: FormValidationResult;
  data: FormParseData;
}
