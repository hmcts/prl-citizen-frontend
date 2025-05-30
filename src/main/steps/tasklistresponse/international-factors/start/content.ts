import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  title: "Are the children's lives mainly based outside of England and Wales?",
  one: 'Yes',
  two: 'No',
  hint: 'For example, is their family life mainly based outside of England and Wales?',
  continue: 'Continue',
  provideDetails: 'Provide details',
  errors: {
    start: {
      required:
        "Select yes if the children's parents (or anyone significant to the children) are mainly based outside of England and Wales",
    },
    iFactorsStartProvideDetails: {
      required:
        "Provide details about the children's parents (or anyone significant to the children) lives outside of England and Wales",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  title: 'Ydy bywyd y plant yn cael ei dreulio’n bennaf y tu allan i Gymru a Lloegr?',
  one: 'Ydy',
  two: 'Nac ydy',
  hint: 'Er enghraifft, a yw eu bywyd teuluol yn bennaf y tu allan i Gymru a Lloegr?',
  continue: 'Parhau',
  provideDetails: 'Rhowch fanylion',
  errors: {
    start: {
      required:
        "Dewiswch ydy os yw rhieni’r plant (neu unrhyw un sy’n bwysig i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr",
    },
    iFactorsStartProvideDetails: {
      required:
        'Rhowch fanylion am rieni’r plant (neu unrhyw un sy’n bwysig i’r plant) sy’n byw y tu allan i Gymru a Lloegr',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    start: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            iFactorsStartProvideDetails: {
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
