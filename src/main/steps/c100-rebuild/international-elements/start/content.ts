/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

export const cy = () => ({
  title: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
  line1: "Er enghraifft, a yw eu bywyd teuluol wedi'i leoli yn bennaf y tu allan i Gymru a Lloegr?",
  one: 'Ydynt',
  two: 'Nac ydynt',
  provideDetails: 'Rhowch fanylion',
  errors: {
    ie_internationalStart: {
      required: "Dewiswch 'ydynt' os yw'r plant yn byw y tu allan i Gymru neu Loegr",
    },
    ie_provideDetailsStart: {
      required: "Darparwch fanylion am y plant sy'n byw y tu allan i Gymru neu Loegr",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
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
