import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: ' ',
  title: 'Has another country asked (or been asked) for information or help for the children?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'It may be that there are child protection concerns, a court needs help with a request on another case, an order needs to be enforced abroad, or efforts are being made to return children to England or Wales.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    request: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    iFactorsRequestProvideDetails: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: 'Has another country asked (or been asked) for information or help for the children?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'It may be that there are child protection concerns, a court needs help with a request on another case, an order needs to be enforced abroad, or efforts are being made to return children to England or Wales.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    request: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    iFactorsRequestProvideDetails: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
    },
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
