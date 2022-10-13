import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  line1: 'Your current postcode',
  enterAddressManually: 'I live outisde the UK',
  errors: {
    addressPostcode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
  manualAddressUrl: '#',
});

const cy = () => ({
  line1: 'Your current postcode (in welsh)',
  enterAddressManually: 'I live outisde the UK (in welsh)',
  errors: {
    addressPostcode: {
      required: 'Enter a real postcode (in welsh)',
      invalid: 'Enter a real postcode (in welsh)',
    },
  },
  manualAddressUrl: '#',
});

export const form: FormContent = {
  fields: {
    addressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      labelSize: 'm',
      attributes: {
        maxLength: 14,
      },
      validator: isInvalidPostcode,
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
