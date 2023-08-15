import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { AWP_APPLICATION_LIST_FIRST_PAGE } from '../utils';

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
  title: 'Pay and submit (welsh)',
  line1:
    'You will be asked to enter your card details and make payment. You will receive a confirmation email when your payment is successful. (welsh)',
  line2:
    'Once you have paid, your application will be submitted to the court and you will not be able to make any further changes. (welsh)',
  line3: 'The court will process your application and take it forward. (welsh)',
  submit: 'Pay and submit (welsh)',
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
    href: AWP_APPLICATION_LIST_FIRST_PAGE,
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
