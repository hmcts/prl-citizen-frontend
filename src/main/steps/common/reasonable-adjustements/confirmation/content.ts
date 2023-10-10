import { TranslationFn } from '../../../../app/controller/GetController';

const en = {
  title: 'Your support - Confirmation',
};

const cy = {
  title: 'Your support - Confirmation -  welsh',
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
  };
};
