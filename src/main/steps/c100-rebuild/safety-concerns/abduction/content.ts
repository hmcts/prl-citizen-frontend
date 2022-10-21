import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  guidanceOnAbductionLabel: 'Guidance on parental child abduction',
  guidanceOnAbductionLink: 'https://www.gov.uk/government/collections/child-abduction',
  getHelpOnReturningChildAbroadLabel: 'Get help to return a child from abroad or arrange contact',
  getHelpOnReturningChildAbroadLink: 'https://www.gov.uk/return-or-contact-abducted-child',
  preventChildFromObtainingPassportLabel: 'Stop a child from getting a passport',
  preventChildFromObtainingPassportLink: 'https://www.gov.uk/stop-child-passport',
});

const cy = () => ({
  guidanceOnAbductionLabel: 'Guidance on parental child abduction - welsh',
  guidanceOnAbductionLink: 'https://www.gov.uk/government/collections/child-abduction',
  getHelpOnReturningChildAbroadLabel: 'Get help to return a child from abroad or arrange contact - welsh',
  getHelpOnReturningChildAbroadLink: 'https://www.gov.uk/return-or-contact-abducted-child',
  preventChildFromObtainingPassportLabel: 'Stop a child from getting a passport - welsh',
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
