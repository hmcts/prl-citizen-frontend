import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: ' ',
  title: "Are the children's lives mainly based outside of England and Wales?",
  one: 'Yes',
  two: 'No',
  hint: 'For example, is their family life mainly based outside of England and Wales?',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Select yes if the children live outside of England or Wales',
    },
    iFactorsStartProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: "Are the children's lives mainly based outside of England and Wales?",
  one: 'Yes',
  two: 'No',
  hint: 'For example, is their family life mainly based outside of England and Wales?',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Select yes if the children live outside of England or Wales',
    },
    iFactorsStartProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
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
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            iFactorsStartProvideDetails: {
              type: 'textarea',
              label: 'Provide details',
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },

  onlyContinue: {
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
