import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAccessCodeValid, isCaseCodeValid, isFieldFilledIn, isNumeric } from '../../../app/form/validation';

import { contact_cy, contact_en } from './contact';

console.info('** FOR SONAR **');

const en = {
  title: 'Enter your access details',
  line1: 'Enter the case number from the email or letter we sent you.',
  caseCodeLabel: 'Your case code',
  caseCodeLabelHint: 'You will find this on the email or letter we sent you',
  accessCodeLabel: 'Your access code',
  accessCodeLabelHint: 'This is a 8 character code',
  contactDetails: contact_en,
  continue: 'Continue',
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'The case code must be made up of 16 characters',
      notNumeric: 'Case code must be numeric',
      invalidReference:
        'You have entered the wrong reference number. Check your email and enter it again before continuing.',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'The access code must be made up of 8 characters',
      invalidAccessCode:
        'You have entered the wrong access code. Check your email and enter it again before continuing.',
      accesscodeAlreadyLinked: 'Provided access code is already linked to the case.',
    },
  },
};

const cy: typeof en = {
  title: 'Nodwch eich manylion mynediad',
  line1: 'Rhowch y rhif achos o’r e-bost neu’r llythyr a anfonwyd atoch',
  caseCodeLabel: 'Cod yr achos',
  caseCodeLabelHint: 'Gellir ei weld yn yr e-bost neu’r llythyr a anfonwyd atoch',
  accessCodeLabel: 'Eich cod mynediad',
  accessCodeLabelHint: 'Mae hwn yn god 8 nod',
  contactDetails: contact_cy,
  continue: 'Parhau',
  errors: {
    caseCode: {
      required: 'Rhowch eich cod achos',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
      notNumeric: 'Rhaid i’ch cod achos fod yn rhif',
      invalidReference:
        'Rydych wedi rhoi cyfeirnod annilys. Gwiriwch eich e-bost a mewnbynnwch y cyfeirnod eto cyn parhau.',
    },
    accessCode: {
      required: 'Nodwch eich cod mynediad',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
      invalidAccessCode:
        'Rydych wedi rhoi cod mynediad sy’n anghywir. Gwiriwch eich e-bost a mewnbynnwch y cod eto cyn parhau.',
      accesscodeAlreadyLinked: 'Mae’r cod mynediad a ddarparwyd eisoes yn gysylltiedig â’r achos.',
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
      validator: value => isFieldFilledIn(value) || isCaseCodeValid(value) || isNumeric(value),
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
  accessCodeCheck: {
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
