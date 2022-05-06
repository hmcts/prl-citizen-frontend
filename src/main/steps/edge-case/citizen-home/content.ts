import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAccessCodeValid, isCaseCodeValid, isFieldFilledIn } from '../../../app/form/validation';

import { contact_cy, contact_en } from './contact';

const en = {
  title: 'Enter your access details',
  line1: 'Enter the claim number from the email or letter we sent you.',
  caseCodeLabel: 'Your case code',
  caseCodeLabelHint: 'You will find this on the email or letter we sent you',
  accessCodeLabel: 'Your access code',
  accessCodeLabelHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  contactDetails: contact_en,
  continue: 'Continue',
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'The case code must be made up of 16 characters',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'The access code must be made up of 8 characters',
    },
  },
};

const cy: typeof en = {
  title: 'Enter your access details',
  line1: 'Enter the claim number from the email or letter we sent you.',
  caseCodeLabel: 'Your case code',
  caseCodeLabelHint: 'You will find this on the email or letter we sent you',
  accessCodeLabel: 'Your access code',
  accessCodeLabelHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  contactDetails: contact_cy,
  continue: 'Continue',
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    caseCode: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.caseCodeLabel,
      hint: l => l.caseCodeLabelHint,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isCaseCodeValid(value),
    },
    accessCode: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.accessCodeLabel,
      hint: l => l.accessCodeLabelHint,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isAccessCodeValid(value),
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
