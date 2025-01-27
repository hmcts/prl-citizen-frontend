import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { validate as isValidEmail } from 'email-validator';

import { Case, CaseDate } from '../case/case';
import { AllowedFileExtentionList, C100MaxFileSize, MAX_DOCUMENT_LIMITS, OtherName } from '../case/definition';

dayjs.extend(customParseFormat);

export type Validator = (
  value: string | string[] | CaseDate | Partial<Case> | OtherName[] | File | undefined
) => void | string;
export type DateValidator = (value: CaseDate | undefined) => void | string;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const enum ValidationError {
  REQUIRED = 'required',
  NOT_SELECTED = 'notSelected',
  INVALID = 'invalid',
  NOT_NUMERIC = 'notNumeric',
  LESS = 'lessthan20',
  NOT_UPLOADED = 'NOT_UPLOADED',
}

export const isFieldFilledIn: Validator = value => {
  if (!value || (value as string).trim?.().length === 0) {
    return ValidationError.REQUIRED;
  }
};

export const atLeastOneFieldIsChecked: Validator = fields => {
  let _fields;
  if (Array.isArray(fields)) {
    _fields = fields;
    _fields = _fields.filter(nestedItem => nestedItem !== '');
  } else {
    _fields = fields;
  }
  if (!_fields || (_fields as []).length === 0) {
    return ValidationError.REQUIRED;
  }
};

export const notSureViolation: Validator = fields => {
  const arr = fields as string[];
  if (arr.length > 1 && arr.find(s => s === 'Not sure')) {
    return 'notSureViolation';
  }
};

export const areDateFieldsFilledIn: DateValidator = fields => {
  if (typeof fields !== 'object' || Object.keys(fields).length !== 3) {
    return ValidationError.REQUIRED;
  }
  const values = Object.values(fields);
  const allFieldsMissing = values.every(value => !value);
  if (allFieldsMissing) {
    return ValidationError.REQUIRED;
  }

  const someFieldsMissing = values.some(value => !value);
  if (someFieldsMissing) {
    if (!fields.day) {
      return 'incompleteDay';
    } else if (!fields.month) {
      return 'incompleteMonth';
    }
    return 'incompleteYear';
  }
};

export const doesArrayHaveValues: Validator = value => {
  if (!value || !(value as (string | OtherName)[])?.length) {
    return ValidationError.REQUIRED;
  }
};

export const isDateInputInvalid: DateValidator = date => {
  const invalid = 'invalidDate';
  if (!date) {
    return invalid;
  }

  for (const value in date) {
    if (isNaN(+date[value])) {
      return invalid;
    }
  }

  const year = parseInt(date.year, 10) || 0;
  const month = parseInt(date.month, 10) || 0;
  const day = parseInt(date.day, 10) || 0;
  if (year === 0 && month === 0 && day === 0) {
    return;
  }
  if (!dayjs(`${year}-${month}-${day}`, 'YYYY-M-D', true).isValid()) {
    return invalid;
  }
};

export const isFutureDate: DateValidator = date => {
  if (!date) {
    return;
  }

  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  if (new Date() < enteredDate) {
    return 'invalidDateInFuture';
  }
};

export const isLessThanAYear: DateValidator = date => {
  if (!date) {
    return;
  }

  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  if (enteredDate >= oneYearAgo) {
    return 'lessThanAYear';
  }
};

export const isMoreThan18Years: DateValidator = date => {
  if (!date) {
    return;
  }

  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  const eighteenYearAgo = new Date();
  eighteenYearAgo.setFullYear(eighteenYearAgo.getFullYear() - 18);
  if (enteredDate < eighteenYearAgo) {
    return 'invalidDateOver18';
  }
};

export const isInvalidHelpWithFeesRef: Validator = value => {
  const fieldNotFilledIn = isFieldFilledIn(value);
  if (fieldNotFilledIn) {
    return fieldNotFilledIn;
  }
  const matcher = new RegExp(/^HWF-[A-Z0-9]{3}-[A-Z0-9]{3}$/i);
  if (typeof value === 'string') {
    if (!matcher.test(value)) {
      return 'invalid';
    }

    if (value.toUpperCase() === 'HWF-A1B-23C') {
      return 'invalidUsedExample';
    }
  }
};

export const isInvalidPostcode: Validator = value => {
  const fieldNotFilledIn = isFieldFilledIn(value);
  if (fieldNotFilledIn) {
    return fieldNotFilledIn;
  }
  const matcher = new RegExp(/^[A-Z]{1,2}\d[A-Z0-9]? ?\d[A-Z]{2}$/i);
  if (!matcher.test(value as string)) {
    return 'invalid';
  }
};

export const isPhoneNoValid: Validator = value => {
  if (typeof value === 'string') {
    const matcher = new RegExp(/^$|^[0-9 +().-]{11,}$/);
    return !matcher.test(value) ? 'invalid' : undefined;
  }
};

export const isAlphaNumeric: Validator = value => {
  if (typeof value === 'string') {
    const matcher = new RegExp(/^[a-zA-Z0-9_\s]*$/);
    return !matcher.test(value) ? 'invalid' : undefined;
  }
};
export const isAlphaNumericWithApostrophe: Validator = value => {
  if (typeof value === 'string') {
    const matcher = new RegExp(/^[a-zA-Z0-9'_\s]*$/);
    return !matcher.test(value) ? 'invalid' : undefined;
  }
};
export const isEmailValid: Validator = value => {
  if (!isValidEmail(value as string)) {
    return 'invalid';
  }
};

export const isFieldLetters: Validator = value => {
  const matcher = new RegExp(/^[\p{sc=Latin}'’\-\s]*$/gu);
  if (!matcher.test(value as string)) {
    return 'invalid';
  }
};

export const isValidCaseReference: Validator = value => {
  const matcher = new RegExp(/^\d{4}-\d{4}-\d{4}-\d{4}$/);
  const matcher1 = new RegExp(/^\d{16}$/);
  if (!matcher1.test(value as string) && !matcher.test(value as string)) {
    return 'invalid';
  }
};

export const isValidAccessCode: Validator = value => {
  if ((value as string).trim().length !== 8) {
    return 'invalid';
  }
};

export const isAddressSelected: Validator = value => {
  if ((value as string)?.trim() === '-1') {
    return ValidationError.NOT_SELECTED;
  }
};

export const isTextAreaValid: Validator = value => {
  const matcher = new RegExp(/[<>{}]/);
  if (matcher.test(value as string)) {
    return 'invalidCharacters';
  }

  if (value && (value as string).trim?.().length > 5000) {
    return ValidationError.INVALID;
  }
};

// prl citizen frontend

export const isCaseCodeValid: Validator = value => {
  if (value && (value as string).trim?.().length !== 16) {
    return ValidationError.INVALID;
  }
};

export const isAccessCodeValid: Validator = value => {
  if (value && (value as string).trim?.().length !== 8) {
    return ValidationError.INVALID;
  }
};

export const isNumeric: Validator = value => {
  const matcher = new RegExp(/^\d+$/);
  if (value && !matcher.test(value as string)) {
    return ValidationError.NOT_NUMERIC;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isFileSizeGreaterThanMaxAllowed = (files: any): boolean => {
  const { documents } = files;
  return documents.size > C100MaxFileSize;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isValidFileFormat = (files: any): boolean => {
  const { documents } = files;
  const extension = documents.name.toLowerCase().split('.')[documents.name.split('.').length - 1];
  return AllowedFileExtentionList.indexOf(extension) > -1;
};

export const isExceedingMaxDocuments = (totalDocumentsLength: number, categoryKey = 'DEFAULT'): boolean => {
  const maxLimit = MAX_DOCUMENT_LIMITS[categoryKey] || MAX_DOCUMENT_LIMITS.DEFAULT;
  return totalDocumentsLength >= maxLimit;
};

export const isValidOption: Validator = value => {
  if ((value as string)?.trim() === '') {
    return ValidationError.NOT_SELECTED;
  }
};
