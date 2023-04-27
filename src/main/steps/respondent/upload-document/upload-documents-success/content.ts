import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  section: 'How your documents will be shared (welsh)',
  status: 'Your documents have been uploaded (welsh)',
  continue: 'Parhau',
  remove: 'Dileu',
  sucess: 'Success (welsh)',
  documentDetails: 'Your documents for (welsh)',
  uploadAgain: 'Upload another document (welsh)',
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
