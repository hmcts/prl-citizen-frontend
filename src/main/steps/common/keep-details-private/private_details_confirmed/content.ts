import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'The court will keep your contact details private',
  line1: 'You have told us you want to keep these contact details private',
  address: 'Address',
  email: 'Email',
  phoneNumber: 'Phone Number',
  line2: 'What the court will do',
  line3:
    'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court.',
  continue: 'Continue',
};

const cy: typeof en = {
  title: 'The court will keep your contact details private',
  line1: 'You have told us you want to keep these contact details private',
  address: 'Address',
  email: 'Email',
  phoneNumber: 'Phone Number',
  line2: 'What the court will do',
  line3:
    'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court.',
  continue: 'Continue',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
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
