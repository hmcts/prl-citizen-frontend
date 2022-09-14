import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../app/form/validation';

const en = {
  title: 'Your address',
  addressPostcode: 'Your current postcode',
  continue: 'Continue',
  errors: {
    addressPostcode: {
      required: 'Enter a valid postcode',
    },
  },
};

const cy: typeof en = {
  title: 'Your address',
  addressPostcode: 'Rhif ffôn y DU',
  continue: 'Continue',
  errors: {
    addressPostcode: {
      required: 'Enter a valid postcode',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    addressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.addressPostcode,
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

// export { form } from '../../../common/confirm-contact-details/addresslookup/content';

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
