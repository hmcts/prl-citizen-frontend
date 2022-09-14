import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Enter your name  ',
  subTitle: 'Only include the children you’re making this application about',
  firstName: 'First name(s)',
  firstNameHint: 'Include all middle names here',
  lastName: 'Last name(s)',
  errors: {
    'firstname-1': {
      required: 'Enter the first name',
    },
    'lastname-1': {
      required: 'Enter the last name',
    },
  },
});

const cy = () => ({
  pageTitle: 'Enter your name - welsh',
  subTitle: 'Only include the children you’re making this application about - welsh',
  firstName: 'First name(s) - welsh',
  firstNameHint: 'Include all middle names here - welsh',
  lastName: 'Last name(s) - welsh',
  errors: {
    'firstname-1': {
      required: 'Enter the first name - welsh',
    },
    'lastname-1': {
      required: 'Enter the last name - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
