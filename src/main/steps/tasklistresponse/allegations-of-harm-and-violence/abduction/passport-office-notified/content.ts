// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  title: 'Has the passport office been notified? ',
  Yes: 'Yes',
  No: 'No',
  errors: {
    PRL_c1A_abductionPassportOfficeNotified: {
      required: 'Select yes if the passport office has been notified',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  serviceName: 'Trefniadau plant',
  caption: 'Pryderon diogelwch',
  title: "Ydy'r swyddfa basbort wedi cael gwybod?",
  Yes: 'Oes',
  No: 'Nac oes',
  errors: {
    PRL_c1A_abductionPassportOfficeNotified: {
      required: 'Dewiswch ydy os yw’r swyddfa basbort wedi’i hysbysu',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_abductionPassportOfficeNotified: {
      id: 'PRL_c1A_abductionPassportOfficeNotified',
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'PRL_c1A_abductionPassportOfficeNotified',
          label: l => l.Yes,
          value: YesOrNo.YES,
        },
        {
          name: 'PRL_c1A_abductionPassportOfficeNotified',
          label: l => l.No,
          value: YesOrNo.NO,
        },
      ],
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
