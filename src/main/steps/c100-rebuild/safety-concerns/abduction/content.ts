import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  guidanceParentalChildHyperlink: 'https://www.gov.uk/government/collections/child-abduction',
  guidanceParentalChildLabel: 'Guidance on parental child abduction',
  helpForAbroadChildHyperlink: 'https://www.gov.uk/return-or-contact-abducted-child',
  helpForAbroadChildLabel: 'Get help to return a child from abroad or arrange contact',
  stopChildGettingPassportHyperlink: 'https://www.gov.uk/stop-child-passport',
  stopChildGettingPassportLabel: 'Stop a child from getting a passport',
});

const cy = () => ({
  guidanceParentalChildHyperlink: 'https://www.gov.uk/government/collections/child-abduction  - welsh',
  guidanceParentalChildLabel: 'Guidance on parental child abduction  - welsh',
  helpForAbroadChildHyperlink: 'https://www.gov.uk/return-or-contact-abducted-child  - welsh',
  helpForAbroadChildLabel: 'Get help to return a child from abroad or arrange contact  - welsh',
  stopChildGettingPassportHyperlink: 'https://www.gov.uk/stop-child-passport  - welsh',
  stopChildGettingPassportLabel: 'Stop a child from getting a passport  - welsh',
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
