import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  title: 'For your security, we signed you out',
  signIn: 'Sign in',
};

const cy = {
  title: 'Er eich diogelwch, gwnaethom eich allgofnodi',
  signIn: 'Mewngofnodi',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.signIn,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
