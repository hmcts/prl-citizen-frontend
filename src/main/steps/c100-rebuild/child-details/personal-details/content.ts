import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Provide details for',
  label: 'Date of birth',
  hint: 'For example, 31 3 2016',
  childSexLabel: 'Sex',
  male: 'Male',
  female: 'Female',
  unspecified: 'Unspecified',
  approximateCheckboxLabel: 'I don’t know their date of birth',
  approximateDobLabel: 'Approximate date of birth',
  errors: {
    childDateOfBirth: {
      required: 'Enter the date of birth',
    },
    childSex: {
      required: 'Select the sex',
    },
    apDateOfBirth: {
      required: 'Select approximate date of birth',
    },
  },
});

const cy = () => ({
  pageTitle: 'Enter the names of the children - welsh',
  label: 'Date of birth - welsh',
  hint: 'For example, 31 3 2016 - welsh',
  childSexLabel: 'Sex - welsh',
  male: 'Male - welsh',
  female: 'Female - welsh',
  unspecified: 'Unspecified - welsh',
  approximateCheckboxLabel: 'I don’t know their date of birth- welsh',
  approximateDobLabel: 'Approximate date of birth - welsh',
  errors: {
    childDateOfBirth: {
      required: 'Enter the date of birth  - welsh',
    },
    childSex: {
      required: 'Select the sex  - welsh',
    },
    apDateOfBirth: {
      required: 'Select approximate date of birth - welsh',
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
