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
    citizenUserManualAddress1: {
      required: 'Enter the first line of the address',
    },
    citizenUserManualAddressTown: {
      required: 'Enter the town or city',
    },
    citizenUserAddressPostcode: {
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
    citizenUserManualAddress1: {
      required: 'Nac ydwdwch linell gyntaf y cyfeiriad',
    },
    citizenUserManualAddressTown: {
      required: 'Nac ydwdwch y dref neu ddinas',
    },
    citizenUserAddressPostcode: {
      required: 'Nac ydwdwch y cod post',
      invalid: 'Nac ydwdwch god post dilys',
    },
  },
});

export const form: FormContent = {
  fields: {
    citizenUserManualAddress1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine1,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    citizenUserManualAddress2: {
      type: 'text',
      classes: 'govuk-label',
      labelSize: null,
    },
    address3: {
      type: 'text',
      classes: 'govuk-label',
      labelSize: null,
    },
    citizenUserManualAddressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    citizenUserManualAddressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    citizenUserAddressPostcode: {
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
