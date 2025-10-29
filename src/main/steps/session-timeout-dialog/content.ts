import { TranslationFn } from '../../app/controller/GetController';
import { SESSION_TIME_OUT_URL } from '../urls';

const COUNTDOWN_DURATION = 50;

export const en = {
  title: 'You’re about to be signed out',
  forYourSecurity: 'For your security, we will sign you out in',
  StaySignInButton: 'Stay Signed In ',
  SignOutButton: 'Sign Out ',
};

export const cy: typeof en = {
  title: 'Rydych ar fin cael eich allgofnodi',
  forYourSecurity: 'Er eich diogelwch, byddwn yn eich allgofnodi cyn pen',
  StaySignInButton: 'Parhau i fod wedi’ch mewngofnodi',
  SignOutButton: 'Allgofnodi',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language];
  return {
    ...translation,
    SESSION_TIME_OUT_URL,
    COUNTDOWN_DURATION,
  };
};
