import { TranslationFn } from '../../app/controller/GetController';
import { SESSION_TIME_OUT_URL } from '../urls';

const COUNTDOWN_DURATION = 50;

export const en = {
  dialog_title: 'You’re about to be signed out',
  dialog_forYourSecurity: 'For your security, we will sign you out in',
  dialog_StaySignInButton: 'Stay Signed In',
  dialog_SignOutButton: 'Sign Out',
  dialog_seconds: 'seconds',
};

export const cy: typeof en = {
  dialog_title: 'Rydych ar fin cael eich allgofnodi',
  dialog_forYourSecurity: 'Er eich diogelwch, byddwn yn eich allgofnodi cyn pen',
  dialog_StaySignInButton: 'Parhau i fod wedi’ch mewngofnodi',
  dialog_SignOutButton: 'Allgofnodi',
  dialog_seconds: 'eiliad',
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
