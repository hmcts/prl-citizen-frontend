import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Upload the draft of your consent order',
  confirmationText: 'Your consent order draft has been uploaded',
  secondaryTitle: 'Your documents for Consent order',
});

const cy = () => ({
  title: 'Llwytho drafft o’r gorchymyn cydsynio i fyny',
  confirmationText: 'Mae’r drafft o’r gorchymyn cydsynio wedi ei lwytho',
  secondaryTitle: 'Eich dogfennau ar gyfer Gorchymyn cydsynio',
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
