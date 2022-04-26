import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Your application has been saved',
  applicationSentTo: 'A link to your application has been sent to:',
  applicationSavedFor6Months: 'Your application will be saved for 6 months.',
  beenSignedOut: 'You have been signed out.',
  signBackIn: 'Sign back in and continue',
};

const cy: typeof en = {
  title: 'Mae eich cais wedi cael ei gadw',
  applicationSentTo: 'Anfonwyd dolen sy’n arwain at eich cais i:',
  applicationSavedFor6Months: 'Bydd eich cais yn cael ei gadw am 6 mis.',
  beenSignedOut: 'Rydych wedi cael eich allgofnodi.',
  signBackIn: 'Mewngofnodi eto a pharhau',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
