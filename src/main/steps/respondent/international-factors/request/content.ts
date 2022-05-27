import { YesOrNo } from 'app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: ' ',
  title: 'Has another country asked (or been asked) for information or help for the children?',
  one: 'Yes',
  two: 'No',
  twoHint: 'This may be due to child protection concerns, the need to enforce an order abroad or to help a court with a request for another case.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    request: {
      required: 'Please select one of the options before proceeding further',
    }
  },
};

const cy: typeof en = {
  section: ' ',
  title: 'Has another country asked (or been asked) for information or help for the children?',
  one: 'Yes',
  two: 'No',
  twoHint: 'This may be due to child protection concerns, the need to enforce an order abroad or to help a court with a request for another case.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    request: {
      required: 'Please select one of the options before proceeding further',
    }
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    request: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.twoHint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            iFactorsRequestProvideDetails: {
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
        }
      ],
      validator: isFieldFilledIn,
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
