import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Do you agree to pay the court fee online using a debit or credit card?',
  paragraph:
    "If you've applied for help with paying court fees, you'll be given a reference number. You can provide this at the end of the process instead of making a payment.",
  one: 'Yes',
  two: 'No',
});

const cy = () => ({
  title: 'Do you agree to pay the court fee online using a debit or credit card? -welsh',
  paragraph:
    "If you've applied for help with paying court fees, you'll be given a reference number. You can provide this at the end of the process instead of making a payment. -welsh",
  one: 'Yes -welsh',
  two: 'No -welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicationGuidancePayOnline: {
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
