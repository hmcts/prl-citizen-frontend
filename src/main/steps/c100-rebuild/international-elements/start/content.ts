/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child arrangements',
  title: "Are the children's lives mainly based outside of England and Wales?",
  line1: 'For example, is their family life mainly based outside of England and Wales?',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    ie_internationalStart: {
      required: 'Select yes if the children live outside of England or Wales',
    },
    ie_provideDetailsStart: {
      required: 'Provide details about the children living outside of England or Wales',
    },
  },
});

export const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  title: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
  line1: "Er enghraifft, a yw eu bywyd teuluol wedi'i leoli yn bennaf y tu allan i Gymru a Lloegr?",
  one: 'Ydynt',
  two: 'Nac ydynt',
  provideDetails: 'Rhowch fanylion',
  errors: {
    ie_internationalStart: {
      required: 'Select yes if the children live outside of England or Wales - Welsh',
    },
    ie_provideDetailsStart: {
      required: 'Provide details about the children living outside of England or Wales - Welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ie_internationalStart: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            ie_provideDetailsStart: {
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
