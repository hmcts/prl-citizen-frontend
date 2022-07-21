import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Welcome to Citizen dashboard',
});

const cy = () => ({
  title: 'Welcome to Citizen dashboard(welsh)',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
