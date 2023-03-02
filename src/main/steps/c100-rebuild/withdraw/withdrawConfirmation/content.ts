import { TranslationFn } from '../../../../app/controller/GetController';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  successMessage: 'Your application has been submitted',
  label: 'Case number',
  subContent:
    'The court will consider your request to withdraw the application, and will let you know if it is granted.',
  secondaryContent:
    'Your child arrangements application will not be issued to the other parties, while the court is considering your request.',
  secondaryBtnLabel: 'Return to your dashboard',
});

const cy = () => ({
  successMessage: 'Your application has been submitted -welsh',
  label: 'Case number -welsh',
  subContent:
    'The court will consider your request to withdraw the application, and will let you know if it is granted. -welsh',
  secondaryContent:
    'Your child arrangements application will not be issued to the other parties, while the court is considering your request. -welsh',
  secondaryBtnLabel: 'Return to your dashboard',
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
