import { CaseDate, CaseWithId } from '../../../../app/case/case';
import { CaseType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFieldLetters,
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
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    citizenUserLastNames: {
      required: 'Enter Your last name',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    citizenUserPlaceOfBirth: {
      required: 'Enter Your Place of birth',
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
    citizenUserAdditionalName: {
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
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
  citizenUserLastNames: 'Eich cyfenw',
  previousName: 'Enwau blaenorol, os o gwbl (Dewisol)',
  citizenUserPlaceOfBirth: 'Man geni',
  citizenUserDateOfBirth: 'Eich dyddiad geni',
  hintDateOfBirth: 'Er enghraifft - 31 3 1980',
  continue: 'Parhau',
  errors: {
    citizenUserFirstNames: {
      required: 'Rhowch Eich enw cyntaf',
      invalid:
        ' Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    citizenUserLastNames: {
      required: 'Rhowch Eich Enw Diwethaf',
      invalid:
        ' Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    citizenUserPlaceOfBirth: {
      required: 'Rhowch Eich Man Geni',
      invalid: 'Rydych wedi defnyddio nod annilys. Defnyddiwch lythrennau a rhifau yn unig.',
    },
    citizenUserAdditionalName: {
      invalid:
        ' Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.',
    },
    citizenUserDateOfBirth: {
      required: 'Rhowch eich dyddiad geni',
      invalidDate: 'Rhaid i’r dyddiad geni fod yn ddyddiad go iawn',
      incompleteDay: 'Rhaid i’ch dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’ch dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’ch dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’ch dyddiad geni fod yn y gorffennol',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (caseData: Partial<CaseWithId>) => {
    return {
      citizenUserFirstNames: {
        type: 'text',
        classes: 'govuk-input--width-20',
        label: l => l.citizenUserFirstNames,
        labelSize: null,
        validator: value => isFieldFilledIn(value) || isFieldLetters(value),
      },
      citizenUserLastNames: {
        type: 'text',
        classes: 'govuk-input--width-20',
        label: l => l.citizenUserLastNames,
        labelSize: null,
        validator: value => isFieldFilledIn(value) || isFieldLetters(value),
      },
      citizenUserAdditionalName: {
        type: 'text',
        classes: 'govuk-input--width-20',
        label: l => l.previousName,
        labelSize: null,
        validator: value => isFieldLetters(value),
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
        hidden: caseData?.caseTypeOfApplication === CaseType.FL401,
        validator: value => {
          return !(caseData?.caseTypeOfApplication === CaseType.FL401) ? isFieldFilledIn(value) : undefined;
        },
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form: {
      ...form,
      fields: (form.fields as FormFieldsFn)(content?.userCase || {}, content?.additionalData?.req),
    },
  };
};
