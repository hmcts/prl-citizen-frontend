import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';

const en = () => ({
  addressLine1: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  errors: {
    address1: {
      required: 'Enter the first line of the address',
    },
    addressTown: {
      required: 'Enter the town or city',
    },
    addressPostcode: {
      required: 'Enter the postcode',
      invalid: 'Enter a real postcode',
    },
  },
});

const cy = () => ({
  addressLine1: 'Adeilad a stryd',
  town: 'Tref neu ddinas',
  county: 'Sir',
  postcode: 'Cod post',
  enterInternationalAddress: 'Nac ydwdwch gyfeiriad rhyngwladol',
  errors: {
    address1: {
      required: 'Nac ydwdwch linell gyntaf y cyfeiriad',
    },
    addressTown: {
      required: 'Nac ydwdwch y dref neu ddinas',
    },
    addressPostcode: {
      required: 'Nac ydwdwch y cod post',
      invalid: 'Nac ydwdwch god post dilys',
    },
  },
});

export const form: FormContent = {
  fields: {
    address1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine1,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    address2: {
      type: 'text',
      classes: 'govuk-label',
      labelSize: null,
    },
    address3: {
      type: 'text',
      classes: 'govuk-label',
      labelSize: null,
    },
    addressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    addressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    addressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: null,
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
