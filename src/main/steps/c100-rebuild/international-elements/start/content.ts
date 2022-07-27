import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Do the children live outside of England or Wales? ',
  line1: 'For example, does their main family life take place outside of England and Wales?    ',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    detailsKnown: {
      required: 'Select yes if the children live outside of England or Wales',
    },
    provideDetails: {
      required: 'Provide details about the children living outside of England or Wales',
    },
  },
});

const cy = () => ({
  title: 'Do the children live outside of England or Wales?  - welsh',
  line1: 'For example, does their main family life take place outside of England and Wales? - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  provideDetails: 'Provide details - Welsh',
  errors: {
    detailsKnown: {
      required: 'Select yes if the children live outside of England or Wales - Welsh',
    },
    provideDetails: {
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
    detailsKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            provideDetails: {
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
    text: l => l.continue,
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
