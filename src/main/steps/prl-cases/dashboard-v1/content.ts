import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Welcome to Citizen dashboard',
  paymentError: '',
});

const cy = () => ({
  title: 'Welcome to Citizen dashboard(welsh)',
  paymentError: '',
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