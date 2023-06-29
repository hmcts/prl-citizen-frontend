import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  title: 'Your documents have been uploaded',
  uploadAgain: 'Upload another document',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
};

const cy: typeof en = {
  section: 'Sut fydd eich dogfennau’n cael eu rhannu',
  status: 'Your documents have been uploaded (welsh)',
  title: 'Your documents have been uploaded (welsh)',
  uploadAgain: 'Upload another document (welsh)',
  continue: 'Parhau',
  remove: 'Dileu',
  sucess: 'Success (welsh)',
  documentDetails: 'Your documents for (welsh)',
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
  return {
    ...translations,
    form,
  };
};
