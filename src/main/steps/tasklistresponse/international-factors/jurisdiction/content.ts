import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: ' ',
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'For example, because a court in another country has the power to make decisions or judgements (jurisdiction).',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    jurisdiction: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsJurisdictionProvideDetails: {
      required: 'Please fill the provide details field before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'For example, because a court in another country has the power to make decisions or judgements (jurisdiction).',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    jurisdiction: {
      required: 'Please select one of the options before proceeding further',
    },
    iFactorsJurisdictionProvideDetails: {
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
    jurisdiction: {
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
            iFactorsJurisdictionProvideDetails: {
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
