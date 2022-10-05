import { TranslationFn } from '../../../../app/controller/GetController';

const en = {
  title: 'Transfer your case to your legal representative',
  line1: 'To transfer your case to your legal representative, provide them with your Case number.',
  line2:
    "Once your case is passed to your representative, you won't be able to edit your response. They will handle your case and receive any updates from the court.",
  listItem: 'Your Case number is: ',
  warning: 'Warning',
  line3:
    'Do not respond to this application yourself if you plan to have a legal representative complete the response.',
  continue: 'Continue',
};

const cy: typeof en = {
  title: 'Transfer your case to your legal representative - welsh',
  line1: 'To transfer your case to your legal representative, provide them with your Case number. - welsh',
  line2:
    "Once your case is passed to your representative, you won't be able to edit your response. They will handle your case and receive any updates from the court. - welsh",
  listItem: 'Your Case number is:  - welsh',
  warning: 'Warning - welsh',
  line3:
    'Do not respond to this application yourself if you plan to have a legal representative complete the response. - welsh',
  continue: 'Continue',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const caseId = content.userCase?.id;
  return {
    ...translations,
    caseId,
  };
};
