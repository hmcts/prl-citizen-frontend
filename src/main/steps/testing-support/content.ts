import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

console.info('** FOR SONAR **');
const en = {
  title: 'Testing support',
  deleteDrafts: 'Delete Drafts',
  createDraft: 'Create Drafts',
};

const cy: typeof en = {
  title: 'Testing support {in welsh}',
  deleteDrafts: 'Delete Drafts',
  createDraft: 'Create Drafts',
};

export const form: FormContent = {
  fields: {},
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...form,
  ...languages[content.language],
});
