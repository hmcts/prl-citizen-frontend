import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title:
    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
  line1:
    'For example, this could include a grandparent or another close relative. They may have work, property or school arrangements that are mainly based outside of England and Wales.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    internationalParents: {
      required:
        "Select yes if the children's parents or anyone significant to the children living outside of England or Wales",
    },
    provideDetailsParents: {
      required:
        "Provide details about the children's parents or anyone significant to the children living outside of England or Wales",
    },
  },
});

const cy = () => ({
  title:
    "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales? - welsh",
  line1:
    'For example, this could include a grandparent or another close relative. They may have work, property or school arrangements that are mainly based outside of England and Wales. - welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  provideDetails: 'Provide details - Welsh',
  errors: {
    internationalParents: {
      required:
        "Select yes if the children's parents or anyone significant to the children living outside of England or Wales - Welsh",
    },
    provideDetailsParents: {
      required:
        "Provide details about the children's parents or anyone significant to the children living outside of England or Wales - Welsh ",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    internationalParents: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            provideDetailsParents: {
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
