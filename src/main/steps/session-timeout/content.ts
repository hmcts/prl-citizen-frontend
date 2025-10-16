import { TranslationFn } from '../../app/controller/GetController';

export const en = {
  title: 'You were signed out to protect your privacy',
  signInButton: 'Sign in',
};

export const cy: typeof en = {
  title: 'Cawsoch eich allgofnodi i amddiffyn eich preifatrwydd',
  signInButton: 'Mewngofnodi',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language];
  return {
    ...translation,
  };
};
