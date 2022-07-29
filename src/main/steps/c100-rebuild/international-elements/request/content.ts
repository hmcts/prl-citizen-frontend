import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Has another country asked (or been asked) for information or help for the children?',
  line1:
    'This may be due to child protection concerns, the need to enforce an order abroad or to help a court with a request for another case.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    internationalRequest: {
      required: 'Select yes if another country has asked (or been asked) for information or help for the children',
    },
    provideDetailsRequest: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children',
    },
  },
});

const cy = () => ({
  title: 'Has another country asked (or been asked) for information or help for the children? - welsh ',
  line1:
    'This may be due to child protection concerns, the need to enforce an order abroad or to help a court with a request for another case. - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  provideDetails: 'Provide details - Welsh',
  errors: {
    internationalRequest: {
      required:
        'Select yes if another country has asked (or been asked) for information or help for the children - Welsh',
    },
    provideDetailsRequest: {
      required:
        'Provide details about another country asking (or being asked) for information or help for the children - Welsh ',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    internationalRequest: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            provideDetailsRequest: {
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
