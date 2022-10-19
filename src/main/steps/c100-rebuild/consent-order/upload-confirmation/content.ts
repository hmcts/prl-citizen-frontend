import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Upload the draft of your consent agreement',
  confirmationText: 'Your consent agreement draft has been uploaded',
  secondaryTitle: 'Your documents for Consent order',
});

const cy = () => ({
  title: 'Upload the draft of your consent agreement - welsh',
  confirmationText: 'Your consent agreement draft has been uploaded - welsh',
  secondaryTitle: 'Your documents for Consent order - welsh',
});

const languages = {
  en,
  cy,
};
export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};
export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
