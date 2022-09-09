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
  applicant1FirstNames: 'Your first name',
  applicant1LastNames: 'Your last name',
  previousName: 'Previous name(s), if any (optional)',
  applicant1PlaceOfBirth: 'Place of birth',
  applicant1DateOfBirth: 'Your date of birth',
  hintDateOfBirth: 'For example - 31 3 1980',
  continue: 'Continue',
  errors: {
    applicant1FirstNames: {
      required: 'Enter Your first name',
    },
    applicant1LastNames: {
      required: 'Enter Your last name',
    },
    applicant1PlaceOfBirth: {
      required: 'Enter Your Place of birth',
    },
    applicant1DateOfBirth: {
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
  applicant1FirstNames: 'Eich enw cyntaf',
  applicant1LastNames: 'Eich enw olaf',
  previousName: 'Enw(au) blaenorol, os o gwbl (dewisol)',
  applicant1PlaceOfBirth: 'Man geni',
  applicant1DateOfBirth: 'Eich dyddiad geni',
  hintDateOfBirth: 'Er enghraifft - 31 3 1980',
  continue: 'Continue',
  errors: {
    applicant1FirstNames: {
      required: 'Rhowch Eich enw cyntaf',
    },
    applicant1LastNames: {
      required: 'Rhowch Eich Enw Diwethaf',
    },
    applicant1PlaceOfBirth: {
      required: 'Rhowch Eich Man Geni',
    },
    applicant1DateOfBirth: {
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
    applicant1FirstNames: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.applicant1FirstNames,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
    applicant1LastNames: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.applicant1LastNames,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
    previousName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.previousName,
      labelSize: null,
    },
    applicant1DateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.applicant1DateOfBirth,
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
      parser: body => covertToDateObject('applicant1DateOfBirth', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
    applicant1PlaceOfBirth: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.applicant1PlaceOfBirth,
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
