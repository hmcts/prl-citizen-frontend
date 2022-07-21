import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'Postal address',
  addressLine1: 'Building and street',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  town: 'Town or city',
  country: 'Country',
  postcode: 'Postcode',
  continue: 'Save and continue',
  errors: {},
};

const cy: typeof en = {
  title: 'Postal address',
  addressLine1: 'Building and street',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  town: 'Town or city',
  country: 'Country',
  postcode: 'Postcode',
  continue: 'Save and continue',
  errors: {},
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    addressLine1: {
      type: 'text',
      label: l => l.addressLine1,
      labelSize: null,
    },
    addressLine2: {
      type: 'text',
    },
    addressLine3: {
      type: 'text',
    },
    town: {
      type: 'text',
      label: l => l.town,
      labelSize: null,
    },
    country: {
      type: 'text',
      label: l => l.country,
      labelSize: null,
    },
    postcode: {
      type: 'text',
      label: l => l.postcode,
      labelSize: null,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
