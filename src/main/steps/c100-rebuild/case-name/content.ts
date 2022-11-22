import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAlphaNumeric, isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Enter Case Name',
  caseNameHint: 'Enter the eldest child’s full name. For example, John Smith',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required',
      invalid: 'Please enter a valid case name to proceed',
    },
  },
});

const cy = () => ({
  title: 'Enter Case Name - welsh',
  caseNameHint: 'Enter the eldest child’s full name. For example, John Smith - welsh',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required - welsh',
      invalid: 'Please enter a valid case name to proceed - welsh',
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
      validator: value => isFieldFilledIn(value) || isAlphaNumeric(value),
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
