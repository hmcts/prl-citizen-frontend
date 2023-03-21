import { TranslationFn } from '../../../app/controller/GetController';

const en = {
  title: 'Created Draft By Testing Support',

  };

const cy: typeof en = {
  title: 'Created Draft By Testing Support{in welsh}',
 
  };

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
