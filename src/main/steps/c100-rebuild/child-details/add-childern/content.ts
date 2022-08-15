import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Enter the names of the children',
  subTitle: 'Only include the children you’re making this application about',
  errors: {
    'firstname-1': {
      required: 'Select first name',
    },
    'lastname-1': {
      required: 'Select last name',
    },
  },
});

const cy = () => ({
  pageTitle: 'Enter the names of the children - welsh',
  subTitle: 'Only include the children you’re making this application about - welsh',
  errors: {
    'firstname-1': {
      required: 'Select first name - welsh',
    },
    'lastname-1': {
      required: 'Select last name - welsh',
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
