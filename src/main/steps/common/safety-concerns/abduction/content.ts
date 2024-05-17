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
  guidanceOnAbductionLabel: 'Canllawiau yn ymwneud ag a oes un o’r rhieni wedi cipio’r plentyn',
  guidanceOnAbductionLink: 'https://www.gov.uk/government/collections/child-abduction',
  getHelpOnReturningChildAbroadLabel: 'Cael help i ddychwelyd plentyn o dramor neu drefnu cyswllt',
  getHelpOnReturningChildAbroadLink: 'https://www.gov.uk/return-or-contact-abducted-child',
  preventChildFromObtainingPassportLabel: 'Stopio plentyn rhag cael pasbort',
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
