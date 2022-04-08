import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

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

export const form: FormContent = {
  fields: {
    selectJurisdiction: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.one, value: 'C100' },
        { label: l => l.two, value: 'FL401' },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
