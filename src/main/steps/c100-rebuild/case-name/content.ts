/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

console.info('** FOR SONAR **');

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
  title: "Enw'r achos",
  caseNameHint: 'Nodwch enw llawn y plentyn hynaf. Er enghraifft, John Smith',

  errors: {
    applicantCaseName: {
      required: 'Mae angen enw’r achos',
      invalid: 'Nodwch enw achos dilys i barhau',
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
