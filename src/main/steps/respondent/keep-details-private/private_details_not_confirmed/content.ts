import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'The court will not keep your contact details private',
  line1: 'You have told us you do not want to keep your contact details private from the other people in this application.',
  continue: 'Continue'
};

const cy: typeof en = {
  title: 'The court will not keep your contact details private',
  line1: 'You have told us you do not want to keep your contact details private from the other people in this application.',
  continue: 'Continue'
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};

