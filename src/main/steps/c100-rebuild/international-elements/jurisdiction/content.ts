/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  line1: 'For example, because a court in another country has the power (jurisdiction) to make decisions or judgments.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    ie_internationalJurisdiction: {
      required:
        'Select yes if another person in the application could apply for a similar order in a country outside England or Wales?',
    },
    ie_provideDetailsJurisdiction: {
      required:
        'Provide details about another person in the application applying for a similar order in a country outside England or Wales?',
    },
  },
});

export const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  title:
    'Could another person in the application apply for a similar order in a country outside England or Wales? - welsh',
  line1:
    'For example, because a court in another country has the power (jurisdiction) to make decisions or judgments. - welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  provideDetails: 'Provide details - Welsh',
  errors: {
    ie_internationalJurisdiction: {
      required:
        'Select yes if another person in the application could apply for a similar order in a country outside England or Wales? - Welsh',
    },
    ie_provideDetailsJurisdiction: {
      required:
        'Provide details about another person in the application applying for a similar order in a country outside England or Wales? - Welsh ',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ie_internationalJurisdiction: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            ie_provideDetailsJurisdiction: {
              type: 'textarea',
              label: l => l.provideDetails,
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
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
