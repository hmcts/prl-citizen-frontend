import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  title: 'Has the passport office been notified? ',
  Yes: 'Yes',
  No: 'No',
  errors: {
    c1A_abductionPassportOfficeNotified: {
      required: 'Select yes if the passport office has been notified',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: "Pryderon diogelwch",
  title: "Ydy'r swyddfa basbort wedi cael gwybod?",
  Yes: "Ydy",
  No: "Nac ydy",
  errors: {
    c1A_abductionPassportOfficeNotified: {
      required: 'Select yes if the passport office has been notified - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_abductionPassportOfficeNotified: {
      id: 'c1A_abductionPassportOfficeNotified',
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_abductionPassportOfficeNotified',
          label: l => l.Yes,
          value: YesOrNo.YES,
        },
        {
          name: 'c1A_abductionPassportOfficeNotified',
          label: l => l.No,
          value: YesOrNo.NO,
        },
      ],
    },
  },
  onlycontinue: {
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
