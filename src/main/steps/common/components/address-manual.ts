import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  citizenUserManualAddress1: 'Building and street',
  citizenUserManualAddressTown: 'Town or city',
  citizenUserManualAddressCounty: 'County',
  citizenUserManualAddressPostcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  errors: {
    citizenUserManualAddress1: {
      required: 'Enter the first line of the address',
    },
    citizenUserManualAddressTown: {
      required: 'Enter the town or city',
    },
    citizenUserManualAddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
});

const cy = () => ({
  citizenUserManualAddress1: 'Building and street (in welsh)',
  citizenUserManualAddressTown: 'Town or city (in welsh)',
  citizenUserManualAddressCounty: 'County (in welsh)',
  citizenUserManualAddressPostcode: 'Postcode (in welsh)',
  enterInternationalAddress: 'Enter an international address (in welsh)',
  errors: {
    citizenUserManualAddress1: {
      required: 'Enter the first line of the address (in welsh)',
    },
    citizenUserManualAddressTown: {
      required: 'Enter the town or city (in welsh)',
    },
    citizenUserManualAddressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    citizenUserManualAddress1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.citizenUserManualAddress1,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    citizenUserManualAddress2: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.citizenUserManualAddress2,
      labelSize: null,
    },
    citizenUserManualAddressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.citizenUserManualAddressTown,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    citizenUserManualAddressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.citizenUserManualAddressCounty,
      labelSize: null,
    },
    citizenUserManualAddressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.citizenUserManualAddressPostcode,
      labelSize: null,
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
