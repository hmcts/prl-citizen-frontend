import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';


const en = {
  saveAndContinue: 'Continue',
};

const cy: typeof en = {
  saveAndContinue: 'Continue',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.saveAndContinue,
  },
  
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
