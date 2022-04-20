import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  continue: 'Continue',
  label: 'Type of application',
  one: 'C100 Child Arrangements Application',
  two: 'FL401 Non-Molestation &/or Occupation Order Application',
  errors: {
    selectJurisdiction: {
      required: 'required',
    },
  },
});

const cy = () => ({
  continue: 'Continue',
  label: 'Type of application',
  one: 'C100 Child Arrangements Application',
  two: 'FL401 Non-Molestation &/or Occupation Order Application',
  errors: {
    selectJurisdiction: {
      required: 'requiued',
    },
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
