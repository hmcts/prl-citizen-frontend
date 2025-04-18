import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';
import { interpolate } from '../../../../steps/common/string-parser';

const en = {
  title: 'Confirm address details for {name}',
  citizenUserAddress1: 'Building',
  addressLine2: 'Street',
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
  title: 'Cadarnhau manylion cyfeiriad ar gyfer {name}',
  citizenUserAddress1: 'Adeilad',
  addressLine2: 'Stryd',
  citizenUserAddressTown: 'Tref neu ddinas',
  citizenUserAddressCounty: 'Sir',
  citizenUserAddressPostcode: 'Cod post',
  errors: {
    citizenUserAddress1: {
      required: 'Nodwch linell gyntaf y cyfeiriad',
    },
    citizenUserAddressTown: {
      required: 'Nodwch y dref neu’r ddinas',
    },
    citizenUserAddressPostcode: {
      required: 'Rhowch god post dilys.',
      invalid: 'Rhowch god post dilys.',
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
    title: interpolate(translations.title, { name: content.userCase!.citizenUserFullName! }),
    form,
  };
};
