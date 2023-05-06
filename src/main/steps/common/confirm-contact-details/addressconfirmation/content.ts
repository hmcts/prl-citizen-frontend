import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';

const en = {
  title: 'Your Address',
  citizenUserAddress1: 'Building and street',
  citizenUserAddressTown: 'Town or city',
  citizenUserAddressCounty: 'County',
  citizenUserAddressPostcode: 'Postcode',
  errors: {
    citizenUserAddress1: {
      required: 'Enter the first line of the address',
    },
    citizenUserAddressTown: {
      required: 'Enter the town or city',
    },
    citizenUserAddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
};

const cy: typeof en = {
  title: 'Beth yw eich cyfeiriad?',
  citizenUserAddress1: 'Adeilad a stryd',
  citizenUserAddressTown: 'Tref neu ddinas',
  citizenUserAddressCounty: 'Gwlad',
  citizenUserAddressPostcode: 'Cod post',
  errors: {
    citizenUserAddress1: {
      required: 'Enter the first line of the address (in welsh)',
    },
    citizenUserAddressTown: {
      required: 'Enter the town or city (in welsh)',
    },
    citizenUserAddressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
};

export const form: FormContent = {
  fields: {
    citizenUserAddress1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.citizenUserAddress1,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    citizenUserAddress2: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine2,
      labelSize: null,
    },
    citizenUserAddressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.citizenUserAddressTown,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    citizenUserAddressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.citizenUserAddressCounty,
      labelSize: null,
    },
    citizenUserAddressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.citizenUserAddressPostcode,
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
