import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = {
  section: ' ',
  title: 'Your court hearings',
  summaryText: 'Contacts for help',
};

const cy: typeof en = {
  section: ' ',
  title: 'Your court hearings',
  summaryText: 'Contacts for help',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
