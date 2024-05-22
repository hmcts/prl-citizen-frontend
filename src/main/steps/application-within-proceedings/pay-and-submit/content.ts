import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { APPLICATION_SIGNPOSTING_URL } from '../utils';

const en = {
  title: 'Pay and submit',
  line1:
    'You will be asked to enter your card details and make payment. You will receive a confirmation email when your payment is successful.',
  line2:
    'Once you have paid, your application will be submitted to the court and you will not be able to make any further changes.',
  line3: 'The court will process your application and take it forward.',
  submit: 'Pay and submit',
  cancel: 'Cancel',
};

const cy: typeof en = {
  title: 'Talu a chyflwyno eich cais',
  line1:
    'Fe ofynnir i chi roi manylion eich cerdyn a thalu ffi. Fe gewch e-bost cadarnhad pan fydd eich taliad yn llwyddiannus.',
  line2:
    'Unwaith y byddwch wedi talu, fe gyflwynir eich cais i’r llys ac ni fyddwch yn gallu gwneud unrhyw newidiadau pellach iddo.',
  line3: 'Bydd y llys yn prosesu eich cais ac yn ei symud yn ei flaen.',
  submit: 'Talu a chyflwyno',
  cancel: 'Canslo',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.submit,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: APPLICATION_SIGNPOSTING_URL,
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
