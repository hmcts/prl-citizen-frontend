// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  title: 'Has the passport office been notified? - welsh',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
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
