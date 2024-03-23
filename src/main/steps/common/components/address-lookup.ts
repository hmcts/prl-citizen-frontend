import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  citizenUserAddressPostcode: 'Your current postcode',
  enterAddressManually: 'I live outside the UK',
  errors: {
    citizenUserAddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
  manualAddressUrl: '#',
  onlyContinue: 'Continue',
});

const cy = () => ({
  citizenUserAddressPostcode: 'Eich cod post cyfredol',
  enterAddressManually: 'Rwy’n byw y tu allan i’r DU',
  errors: {
    citizenUserAddressPostcode: {
      required: 'Rhowch god post dilys.',
      invalid: 'Rhowch god post dilys.',
    },
  },
  manualAddressUrl: '#',
  onlyContinue: 'Parhau',
});

export const form: FormContent = {
  fields: {
    citizenUserAddressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.citizenUserAddressPostcode,
      labelSize: 'm',
      attributes: {
        maxLength: 14,
      },
      validator: isInvalidPostcode,
    },
  },
  submit: {
    text: l => l.onlyContinue,
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
