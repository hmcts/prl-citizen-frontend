import { DialogContext } from '../../app/case/definition';
import { SESSION_TIME_OUT_URL } from '../urls';

const COUNTDOWN_DURATION = 50;
const SESSION_TIMEOUT_URL = SESSION_TIME_OUT_URL;

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

export function getDialogContext(language: string): DialogContext {
  const currentLang = (language === 'cy' ? 'cy' : 'en') as 'en' | 'cy';
  const translation = languages[currentLang];

  return {
    ...translation,
    SESSION_TIMEOUT_URL,
    COUNTDOWN_DURATION,
  };
}
