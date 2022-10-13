import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';
import { form as manualAddressForm } from '../../../common/components/address-manual';

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
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
};

const cy: typeof en = {
  title: 'Beth yw eich cyfeiriad?',
  citizenUserAddress1: 'Building and street (in welsh)',
  citizenUserAddressTown: 'Town or city (in welsh)',
  citizenUserAddressCounty: 'County (in welsh)',
  citizenUserAddressPostcode: 'Postcode (in welsh)',
  errors: {
    citizenUserAddress1: {
      required: 'Enter the first line of the address (in welsh)',
    },
    citizenUserAddressTown: {
      required: 'Enter the town or city (in welsh)',
    },
    citizenUserAddressPostcode: {
      required: 'Enter a real postcode (in welsh)',
      invalid: 'Enter a real postcode (in welsh)',
    },
  },
};

export const form: FormContent = {
  ...manualAddressForm,
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
