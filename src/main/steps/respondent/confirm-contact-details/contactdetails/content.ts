import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';

const en = {
  title: 'Your contact details',
  phoneNumber: 'UK telephone number',
  email: 'Email address',
  continue: 'Continue',
  errors: {
    phoneNumber: {
      required: 'Enter UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
    email: {
      required: 'Enter Email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
};

const cy: typeof en = {
  title: 'Eich manylion cyswllt',
  phoneNumber: 'Rhif ffôn y DU',
  email: 'Cyfeiriad ebost',
  continue: 'Continue',
  errors: {
    phoneNumber: {
      required: 'Rhowch rif ffôn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
    email: {
      required: 'Rhowch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    phoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.phoneNumber,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    email: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.email,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isEmailValid(value),
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
