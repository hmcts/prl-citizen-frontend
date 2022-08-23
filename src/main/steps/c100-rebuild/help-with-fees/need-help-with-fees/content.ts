import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Need Help With Fees',
  headingTitle: `Do you need help with paying
   the fee for this application?`,
  paragraph1:
    'This application costs £232. You may be able to get help with paying the fee if \n you have little or no savings, and either:',
  line1: 'get certain benefits',
  line2: 'are on a low income',
  seeEligbilityHyperLink: 'See if you are eligible for Help with Fees.',
  select_all_apply: 'Select all that apply',
  one: 'Yes, I need help with paying the fee',
  two: 'No, I do not need help',
  errors: {
    needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee',
    },
  },
});

const languages = {
  en,
};

export const form: FormContent = {
  fields: {
    needHelpWithFees: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
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
    form,
  };
};
