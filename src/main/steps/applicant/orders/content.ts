import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = {
  section: 'All documents',
  title: 'Orders from the court',
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cy: typeof en = {
  section: 'All documents',
  title: 'Orders from the court',
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
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
