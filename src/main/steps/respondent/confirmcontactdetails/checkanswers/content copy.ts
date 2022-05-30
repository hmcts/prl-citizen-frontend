import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  respondentFirstName: 'respondentFirstName',
  errors: {},
};

const cy: typeof en = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  respondentFirstName: 'respondentFirstName',
  errors: {},
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    resondentFirstName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.caseCodeLabel,
      hint: l => l.caseCodeLabelHint,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
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
