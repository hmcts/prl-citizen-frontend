import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Will you be using a legal representative in these proceedings?',
  one: 'Yes',
  two: 'No',
});

const cy = () => ({
  title: 'Will you be using a legal representative in these proceedings? -welsh',
  one: 'Yes -welsh',
  two: 'No -welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicationGuidanceLegalRepresentative: {
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
