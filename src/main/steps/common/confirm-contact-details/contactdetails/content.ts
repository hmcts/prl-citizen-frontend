import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isAlphaNumeric, isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';
import { typeofcaseuser } from '../../../../steps/typeofcaseuserutil';
const en = {
  title: 'Your contact details',
  citizenUserPhoneNumber: 'UK telephone number',
  citizenUserEmailAddress: 'Email address',
  citizenUserSafeToCall: 'When it is safe to call you (optional)',
  pagetitle: '',
  safeToCallHint: 'Give a time between 9am and 5pm when it is safe to call you',
  continue: 'Continue',
  errors: {
    citizenUserPhoneNumber: {
      required: 'Enter a valid UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
    citizenUserEmailAddress: {
      required: 'Enter a valid email address',
      invalid: 'Enter a valid email address, like name@example.com',
    },
    citizenUserSafeToCall: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
  },
};

const cy: typeof en = {
  title: 'Eich manylion cyswllt',
  citizenUserPhoneNumber: 'Rhif ffôn y DU',
  citizenUserEmailAddress: 'Cyfeiriad ebost',
  pagetitle: '',
  citizenUserSafeToCall: 'When it is safe to call you (optional)',
  safeToCallHint: 'Give a time between 9am and 5pm when it is safe to call you',
  continue: 'Continue',
  errors: {
    citizenUserPhoneNumber: {
      required: 'Rhowch rif ffôn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
    citizenUserEmailAddress: {
      required: 'Rhowch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
    },
    citizenUserSafeToCall: {
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.(in Welsh)',
    },
  },
};

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
    citizenUserSafeToCall: {
      type: 'text',
      classes: 'govuk-input--width-20',
      hint: l => l.safeToCallHint,
      label: l => l.citizenUserSafeToCall,
      labelSize: null,
      validator: value => isAlphaNumeric(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication);
  return {
    ...translations,
    form,
  };
};
