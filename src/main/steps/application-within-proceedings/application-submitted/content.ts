import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = {
  title: 'Application submitted',
  updatesFromCourt: 'You will get updates from the court about the progress of your application.',
  next: 'What happens next',
  courtConsider: 'The court will consider your application and will be in touch to let you know what happens next.',
  closeAndReturn: 'Close and return to case overview',
};

const cy: typeof en = {
  title: 'Application submitted (welsh)',
  updatesFromCourt: 'You will get updates from the court about the progress of your application. (welsh)',
  next: 'What happens next (welsh)',
  courtConsider:
    'The court will consider your application and will be in touch to let you know what happens next. (welsh)',
  closeAndReturn: 'Close and return to case overview (welsh)',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.closeAndReturn,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
