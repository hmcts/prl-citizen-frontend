import { TranslationFn } from '../../../app/controller/GetController';

const en = {
  title: 'Testing support - create drafts',
  createC100Draft: 'Create C100 Draft',
  createC100ResponseDraft: 'Create C100 Response Draft',
};

const cy: typeof en = {
  title: 'Testing support - create drafts (in welsh)',
  createC100Draft: 'Create C100 Draft (in welsh)',
  createC100ResponseDraft: 'Create C100 Response Draft (in welsh)',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language]
});
