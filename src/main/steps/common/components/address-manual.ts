import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  citizenUserManualAddress1: 'Building',
  citizenUserManualAddress2: 'Street',
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
    },
  },
});

const cy = () => ({
  citizenUserManualAddress1: 'Adeilad',
  citizenUserManualAddress2: 'Stryd',
  citizenUserManualAddressTown: 'Tref neu ddinas',
  citizenUserManualAddressCounty: 'Sir',
  citizenUserManualAddressPostcode: 'Cod post',
  enterInternationalAddress: 'Nodwch gyfeiriad rhyngwladol',
  errors: {
    citizenUserManualAddress1: {
      required: 'Nodwch linell gyntaf y cyfeiriad',
    },
    citizenUserManualAddressTown: {
      required: 'Nodwch y dref neu’r ddinas',
    },
    citizenUserManualAddressPostcode: {
      required: 'Rhowch god post dilys.',
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
