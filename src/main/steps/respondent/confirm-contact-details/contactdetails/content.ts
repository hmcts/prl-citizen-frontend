import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';
import { cy, en } from '../../../../steps/common/confirm-contact-details/contactdetails/content';

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    citizenUserPhoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.citizenUserPhoneNumber,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    citizenUserEmailAddress: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.citizenUserEmailAddress,
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
