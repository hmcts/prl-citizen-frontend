/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Enter Case Name',
  caseNameHint: 'Enter the eldest child’s full name. For example, John Smith',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
});

export const cy = () => ({
  title: 'Enter Case Name - welsh',
  caseNameHint: 'Enter the eldest child’s full name. For example, John Smith - welsh',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required - welsh',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only. -Welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicantCaseName: {
      id: 'applicantCaseName',
      type: 'text',
      classes: 'govuk-input--width-20',
      hint: hint => hint.caseNameHint,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isFieldLetters(value),
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
