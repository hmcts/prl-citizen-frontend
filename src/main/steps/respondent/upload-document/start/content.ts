import { YesOrNo } from 'app/case/definition';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: ' ',
  title: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  line1:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  line1:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    start: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      validator: isFieldFilledIn,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
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
