import { CaseDate } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
} from '../../../../app/form/validation';

const en = {
  title: 'Your name and date of birth',
  citizenUserFirstNames: 'Your first name',
  citizenUserLastNames: 'Your last name',
  previousName: 'Previous name(s), if any (optional)',
  citizenUserPlaceOfBirth: 'Place of birth',
  citizenUserDateOfBirth: 'Your date of birth',
  hintDateOfBirth: 'For example - 31 3 1980',
  continue: 'Continue',
  errors: {
    citizenUserFirstNames: {
      required: 'Enter Your first name',
    },
    citizenUserLastNames: {
      required: 'Enter Your last name',
    },
    citizenUserPlaceOfBirth: {
      required: 'Enter Your Place of birth',
    },
    citizenUserDateOfBirth: {
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
  citizenUserFirstNames: 'Eich enw cyntaf',
  citizenUserLastNames: 'Eich enw olaf',
  previousName: 'Enw(au) blaenorol, os o gwbl (dewisol)',
  citizenUserPlaceOfBirth: 'Man geni',
  citizenUserDateOfBirth: 'Eich dyddiad geni',
  hintDateOfBirth: 'Er enghraifft - 31 3 1980',
  continue: 'Continue',
  errors: {
    citizenUserFirstNames: {
      required: 'Rhowch Eich enw cyntaf',
    },
    citizenUserLastNames: {
      required: 'Rhowch Eich Enw Diwethaf',
    },
    citizenUserPlaceOfBirth: {
      required: 'Rhowch Eich Man Geni',
    },
    citizenUserDateOfBirth: {
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
    citizenUserFirstNames: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.citizenUserFirstNames,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
    citizenUserLastNames: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.citizenUserLastNames,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
    previousName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.previousName,
      labelSize: null,
    },
    citizenUserDateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.citizenUserDateOfBirth,
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
      parser: body => covertToDateObject('citizenUserDateOfBirth', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
    citizenUserPlaceOfBirth: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.citizenUserPlaceOfBirth,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
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
