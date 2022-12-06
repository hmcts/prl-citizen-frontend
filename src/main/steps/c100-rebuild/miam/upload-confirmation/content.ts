import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Upload your MIAM certificate',
  confirmationText: 'Your MIAM certificate has been uploaded',
  secondaryTitle: 'Your documents',
});

const cy = () => ({
  title: 'Llwytho eich tystysgrif MIAM',
  confirmationText: 'YMae eich tystysgrif MIAM wedi’i llwytho',
  secondaryTitle: 'Eich dogfennau',
  //success:"abcd"
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
