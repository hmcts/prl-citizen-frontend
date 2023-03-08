import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Service Name',
  title: 'Do you want your representative to complete the application for you?',
  one: 'Yes',
  two: 'No',
});

const cy = () => ({
  serviceName: 'Service Name -welsh',
  title: 'Do you want your representative to complete the application for you? -welsh',
  one: 'Yes -welsh',
  two: 'No -welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicationFillupLegalRepresentative: {
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
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
