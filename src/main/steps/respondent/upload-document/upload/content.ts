import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  continue: 'Save and continue',
  add: 'Submit',
};

const cy: typeof en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  continue: 'Save and continue',
  add: 'Submit',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    start: {
      type: 'radios',
      classes: 'radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [],
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
