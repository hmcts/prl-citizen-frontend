import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { covertToDateObject } from '../../../../app/form/parser';
import { CaseDate } from '../../../../app/case/case';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../../app/form/validation';

const en = {
  title: 'Your name and date of birth',
  firstName: 'Your first name',
  lastName: 'Your last name',
  previousName: 'Previous name(s), if any (optional)',
  placeOfBirth: 'Place of birth',
  dateOfBirth: 'Your date of birth',
  hintDateOfBirth: 'For example - 31 3 1980',
  continue: 'Continue',
  errors: {
    firstName: {
      required: 'Enter Your first name',
    },
    lastName: {
      required: 'Enter Your last name',
    },
    placeOfBirth: {
      required: 'Enter Your Place of birth',
    },
    dateOfBirth: {
      required: 'Enter your date of birth',
      invalidDate: 'Date of birth must be a real date',
      incompleteDay: 'Your date of birth must include a day',
      incompleteMonth: 'Your date of birth must include a month',
      incompleteYear: 'Your date of birth must include a year',
      invalidDateInFuture: 'Your date of birth must be in the past',
    },
  },
};

const cy: typeof en = {
  title: 'Eich enw a dyddiad geni',
  firstName: 'Eich enw cyntaf',
  lastName: 'Eich enw olaf',  
  previousName: 'Enw(au) blaenorol, os o gwbl (dewisol)',
  placeOfBirth: 'Man geni',
  dateOfBirth: 'Eich dyddiad geni',
  hintDateOfBirth: 'Er enghraifft - 31 3 1980',
  continue: 'Continue',
  errors: {
    firstName: {
      required: 'Rhowch Eich enw cyntaf',
    },
    lastName: {
      required: 'Rhowch Eich Enw Diwethaf',
    },
    placeOfBirth: {
      required: 'Rhowch Eich Man Geni',
    },
    dateOfBirth: {
      required: 'Enter your date of birth',
      invalidDate: 'Date of birth must be a real date',
      incompleteDay: 'Your date of birth must include a day',
      incompleteMonth: 'Your date of birth must include a month',
      incompleteYear: 'Your date of birth must include a year',
      invalidDateInFuture: 'Your date of birth must be in the past',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    firstName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.firstName,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
    lastName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.lastName,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
    previousName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.previousName,
      labelSize: null,
    },
    dateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.dateOfBirth,
      hint: l => l.hintDateOfBirth,
      values: [
        {
          label: l => l.dateFormat['day'],
          name: 'day',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          name: 'month',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          name: 'year',
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
        },
      ],
      parser: body => covertToDateObject('dateOfBirth', body as Record<string, unknown>),
      validator: value =>
          areDateFieldsFilledIn(value as CaseDate) ||
          isDateInputInvalid(value as CaseDate) ||
          isFutureDate(value as CaseDate),
    },
    placeOfBirth: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.placeOfBirth,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
  },
  accessCodeCheck: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
