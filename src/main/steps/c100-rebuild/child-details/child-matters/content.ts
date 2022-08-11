import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

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
  fields: {    
    isDecisionTaken: {
    type: 'checkboxes',
    hint: l => l.hintText,
    values: [
      {
        name: 'isDecisionTaken',
        label: l => l.labelText,
        value: 'Yes',
      },
    ],
  }},
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
