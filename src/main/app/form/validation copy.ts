import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import { validate as isValidEmail } from 'email-validator';

// import { OtherName } from '../../app/case/definition';
// import { Case, CaseDate } from '../case/case';

dayjs.extend(customParseFormat);

// export type Validator = (
//   value: string | string[] | CaseDate | Partial<Case> | OtherName[] | undefined
// ) => void | string;
// export type DateValidator = (value: CaseDate | undefined) => void | string;

// export const enum ValidationError {
//   REQUIRED = 'required',
//   NOT_SELECTED = 'notSelected',
//   INVALID = 'invalid',
// }

// export const isFieldFilledIn: Validator = value => {
//   if (!value || (value as string).trim?.().length === 0) {
//     return ValidationError.REQUIRED;
//   }
// };

// export const atLeastOneFieldIsChecked: Validator = fields => {
//   if (!fields || (fields as []).length === 0) {
//     return ValidationError.REQUIRED;
//   }
// };

// export const notSureViolation: Validator = fields => {
//   const arr = fields as string[];
//   if (arr.length > 1 && arr.find(s => s === 'Not sure')) {
//     return 'notSureViolation';
//   }
// };

// export const areDateFieldsFilledIn: DateValidator = fields => {
//   if (typeof fields !== 'object' || Object.keys(fields).length !== 3) {
//     return ValidationError.REQUIRED;
//   }
//   const values = Object.values(fields);
//   const allFieldsMissing = values.every(value => !value);
//   if (allFieldsMissing) {
//     return ValidationError.REQUIRED;
//   }

//   const someFieldsMissing = values.some(value => !value);
//   if (someFieldsMissing) {
//     if (!fields.day) {
//       return 'incompleteDay';
//     } else if (!fields.month) {
//       return 'incompleteMonth';
//     }
//     return 'incompleteYear';
//   }
// };

// export const doesArrayHaveValues: Validator = value => {
//   if (!value || !(value as (string | OtherName)[])?.length) {
//     return ValidationError.REQUIRED;
//   }
// };

// export const isDateInputInvalid: DateValidator = date => {
//   const invalid = 'invalidDate';
//   if (!date) {
//     return invalid;
//   }

//   for (const value in date) {
//     if (isNaN(+date[value])) {
//       return invalid;
//     }
//   }

//   const year = parseInt(date.year, 10) || 0;
//   const month = parseInt(date.month, 10) || 0;
//   const day = parseInt(date.day, 10) || 0;
//   if (!dayjs(`${year}-${month}-${day}`, 'YYYY-M-D', true).isValid()) {
//     return invalid;
//   }
// };

// export const isFutureDate: DateValidator = date => {
//   if (!date) {
//     return;
//   }

//   const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
//   if (new Date() < enteredDate) {
//     return 'invalidDateInFuture';
//   }
// };

// export const isLessThanAYear: DateValidator = date => {
//   if (!date) {
//     return;
//   }

//   const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
//   const oneYearAgo = new Date();
//   oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
//   if (!(enteredDate < oneYearAgo)) {
//     return 'lessThanAYear';
//   }
// };

// export const isMoreThan18Years: DateValidator = date => {
//   if (!date) {
//     return;
//   }

//   const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
//   const eighteenYearAgo = new Date();
//   eighteenYearAgo.setFullYear(eighteenYearAgo.getFullYear() - 18);
//   if (enteredDate < eighteenYearAgo) {
//     return 'invalidDateOver18';
//   }
// };

// export const isInvalidHelpWithFeesRef: Validator = value => {
//   const fieldNotFilledIn = isFieldFilledIn(value);
//   if (fieldNotFilledIn) {
//     return fieldNotFilledIn;
//   }

//   if (typeof value === 'string') {
//     if (!value.match(/^HWF-[A-Z0-9]{3}-[A-Z0-9]{3}$/i)) {
//       return 'invalid';
//     }

//     if (value.toUpperCase() === 'HWF-A1B-23C') {
//       return 'invalidUsedExample';
//     }
//   }
// };

// export const isInvalidPostcode: Validator = value => {
//   const fieldNotFilledIn = isFieldFilledIn(value);
//   if (fieldNotFilledIn) {
//     return fieldNotFilledIn;
//   }

//   if (!(value as string).match(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i)) {
//     return 'invalid';
//   }
// };

// export const isPhoneNoValid: Validator = value => {
//   if (typeof value === 'string') {
//     return !value.match(/^$|^[0-9 +().-]{9,}$/) ? 'invalid' : undefined;
//   }
// };

// export const isEmailValid: Validator = value => {
//   if (!isValidEmail(value as string)) {
//     return 'invalid';
//   }
// };

// export const isFieldLetters: Validator = value => {
//   if (!(value as string).match(/^[\p{Script=Latin}'’\-\s]*$/gu)) {
//     return 'invalid';
//   }
// };

// export const isValidCaseReference: Validator = value => {
//   if (!(value as string).match(/^\d{16}$/) && !(value as string).match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) {
//     return 'invalid';
//   }
// };

// export const isValidAccessCode: Validator = value => {
//   if ((value as string).trim().length !== 8) {
//     return 'invalid';
//   }
// };

// export const isAddressSelected: Validator = value => {
//   if ((value as string)?.trim() === '-1') {
//     return ValidationError.NOT_SELECTED;
//   }
// };

// export const isTextAreaValid: Validator = value => {
//   if (value && (value as string).trim?.().length > 500) {
//     return ValidationError.INVALID;
//   }
// };
