import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: "Do the children's parents or anyone significant to the children live outside of England or Wales?",
  line1:
    'Including for example, a grandparent or any other close relative. They may work, own property or have children in school outside of England or Wales.',
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
  title: "Do the children's parents or anyone significant to the children live outside of England or Wales? - welsh ",
  line1:
    'Including for example, a grandparent or any other close relative. They may work, own property or have children in school outside of England or Wales. - welsh  ',
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
