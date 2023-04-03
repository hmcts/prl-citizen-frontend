import { TranslationFn } from '../../../app/controller/GetController';

const en = {
  title: 'Testing support - create drafts',
  deleteC100Draft: 'Delete C100 Draft/s',
};

const cy: typeof en = {
  title: 'Testing support - create drafts (in welsh)',
  deleteC100Draft: 'Delete C100 Draft/s (in welsh)',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language],
});
