import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { typeofcaseuser } from '../../../../steps/typeofcaseuserutil';
const en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  pagetitle: '',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
};

const cy: typeof en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  pagetitle: '',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication);
  return {
    ...translations,
    form,
  };
};
