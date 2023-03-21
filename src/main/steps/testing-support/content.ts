import { TranslationFn } from '../../app/controller/GetController';

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

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language]
});
