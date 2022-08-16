import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to',
  hintText: 'Select all that apply.',
  labelText: 'Decide who theylive with',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision',
    },
  },
});

const cy = () => ({
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to - welsh',
  hintText: 'Select all that apply. - welsh',
  labelText: 'Decide who theylive with - welsh',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision  - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
