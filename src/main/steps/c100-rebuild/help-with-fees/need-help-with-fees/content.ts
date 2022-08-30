import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  headingTitle: 'Do you need help with paying the fee for this application?',
  paragraph1: 'This application costs £',
  paragraph2: '. You may be able to get help with paying the fee if \n you have little or no savings, and either:',
  line1: 'get certain benefits',
  line2: 'are on a low income',
  seeEligbilityHyperLink:
    '<a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" target="_blank" aria-label="See if you are eligible for Help with Fees.">See if you are eligible for Help with Fees.</a>',
  select_all_apply: 'Select all that apply',
  yesNeedHelpWithFeesPaying: 'Yes, I need help with paying the fee',
  noNeedHelpWithFeesPaying: 'No, I do not need help',
  errors: {
    needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  headingTitle: 'Do you need help with paying the fee for this application? - welsh',
  paragraph1: 'This application costs £',
  paragraph2:
    '. You may be able to get help with paying the fee if \n you have little or no savings, and either: - welsh',
  line1: 'get certain benefits - welsh',
  line2: 'are on a low income - welsh',
  seeEligbilityHyperLink:
    '<a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" target="_blank" aria-label="See if you are eligible for Help with Fees.">See if you are eligible for Help with Fees. - welsh</a>',
  select_all_apply: 'Select all that apply - welsh',
  yesNeedHelpWithFeesPaying: 'Yes, I need help with paying the fee - welsh',
  noNeedHelpWithFeesPaying: 'No, I do not need help - welsh',
  errors: {
    needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    needHelpWithFees: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      values: [
        {
          label: l => l.yesNeedHelpWithFeesPaying,
          value: YesOrNo.YES,
        },
        {
          label: l => l.noNeedHelpWithFeesPaying,
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
