import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';

const en = {
  title: 'Your contact details',
  citizenUserPhoneNumber: 'UK telephone number',
  citizenUserEmailAddress: 'Email address',
  applicant1SafeToCall: 'When it is safe to call you (optional)',
  safeToCallHint: 'Give a time between 9am and 5pm when it is safe to call you',
  continue: 'Continue',
  errors: {
    citizenUserPhoneNumber: {
      required: 'Enter UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
    citizenUserEmailAddress: {
      required: 'Enter Email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
};

const cy: typeof en = {
  title: 'Eich manylion cyswllt',
  citizenUserPhoneNumber: 'Rhif ffôn y DU',
  citizenUserEmailAddress: 'Cyfeiriad ebost',
  applicant1SafeToCall: 'When it is safe to call you (optional)',
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
    applicant1SafeToCall: {
      type: 'text',
      classes: 'govuk-input--width-20',
      hint: l => l.safeToCallHint,
      label: l => l.applicant1SafeToCall,
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
