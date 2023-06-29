import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Do any of the children have a passport?',
  caption: 'Safety concerns',
  one: 'Yes',
  two: 'No',
  errors: {
    PRL_c1A_passportOffice: {
      required: 'Select yes if any of the children have a passport',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  serviceName: 'Trefniadau plant',
  title: "A oes gan unrhyw un o'r plant basbort?",
  caption: 'Pryderon diogelwch',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    PRL_c1A_passportOffice: {
      required: 'Select yes if any of the children have a passport - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_passportOffice: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
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
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    ...parentContent(content),
    form,
  };
};
