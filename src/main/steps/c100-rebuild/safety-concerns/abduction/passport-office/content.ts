/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child arrangements',
  title: 'Do any of the children have a passport?',
  caption: 'Safety concerns',
  one: 'Yes',
  two: 'No',
  errors: {
    c1A_passportOffice: {
      required: 'Select yes if any of the children have a passport',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
  title: "A oes gan unrhyw un o'r plant basbort?",
  caption: 'Pryderon diogelwch',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    c1A_passportOffice: {
      required: "Dewiswch oes os oes gan unrhyw un o'r plant basbort",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_passportOffice: {
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
    ...parentContent(content),
    form,
  };
};
