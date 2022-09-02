import { TranslationFn } from '../../../app/controller/GetController';
import { C100_CREATE_APPLICATION } from '../../../steps/urls';

const en = () => ({
  pageTitle: 'Create C100 Application',
  button: {
    startNow: 'Start Now',
  },
});

const cy = () => ({
  pageTitle: 'Create C100 Application - Welish',
  button: {
    startNow: 'Start Now - Welish',
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    data: {
      serviceUrl: C100_CREATE_APPLICATION,
    },
  };
};
