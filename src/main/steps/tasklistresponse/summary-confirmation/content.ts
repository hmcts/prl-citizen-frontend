import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { typeofcaseuser } from '../../common/typeofcaseuser';
const en = {
  saveAndContinue: 'Continue',
  pagetitle: '',
};

const cy: typeof en = {
  saveAndContinue: 'Continue',
  pagetitle: '',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    form,
  };
};
