import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  guidanceOnAbduction: 'Guidance on parental child abduction',
  guidanceOnAbductionLink: 'https://www.gov.uk/government/collections/child-abduction',
  getHelpOnReturningChildAbroad: 'Get help to return a child from abroad or arrange contact',
  getHelponReturningChildAbroadLink: 'https://www.gov.uk/return-or-contact-abducted-child',
  preventChildFromObtainingPassport: 'Stop a child from getting a passport',
  preventChildFromObtainingPassportLink: 'https://www.gov.uk/stop-child-passport',
});

const cy = () => ({
  guidanceOnAbduction: 'Guidance on parental child abduction - welsh',
  guidanceOnAbductionLink: 'https://www.gov.uk/government/collections/child-abduction',
  getHelpOnReturningChildAbroad: 'Get help to return a child from abroad or arrange contact - welsh',
  getHelponReturningChildAbroadLink: 'https://www.gov.uk/return-or-contact-abducted-child',
  preventChildFromObtainingPassport: 'Stop a child from getting a passport - welsh',
  preventChildFromObtainingPassportLink: 'https://www.gov.uk/stop-child-passport',
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
