import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'Keeping your contact details private',
  title: 'The court will keep your contact details private',
  line1: 'You have told us you want to keep these contact details private:',
  address: 'Home address',
  email: 'Email',
  postalAddress: 'Postal address',
  phone: 'Telephone number',
  line2: 'What the court will do',
  line3:
    'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.',
  continue: 'Continue',
};

const cy: typeof en = {
  section: 'Keeping your contact details private',
  title: 'The court will keep your contact details private',
  line1: 'You have told us you want to keep these contact details private:',
  address: 'Home address',
  email: 'Email',
  postalAddress: 'Postal address',
  phone: 'Telephone number',
  line2: 'What the court will do',
  line3:
    'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.',
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
