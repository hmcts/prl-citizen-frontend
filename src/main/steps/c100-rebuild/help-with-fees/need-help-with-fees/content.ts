/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
    hwf_needHelpWithFees: {
      required: 'Select yes if you already applied for help with your application fee',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
  headingTitle: 'A ydych angen help i dalu’r ffi am wneud y cais hwn?',
  paragraph1: 'Cost y cais hwn £',
  paragraph2:
    '. Mae’n bosibl y gallwch gael help i dalu’r ffi os  \n nad oes gennych fawr ddim cynilion, neu ddim cynilion o gwbl, a naill ai:',
  line1: 'cael budd-daliadau penodol',
  line2: 'ar incwm isel',
  seeEligbilityHyperLink:
    '<a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" target="_blank" aria-label="See if you are eligible for Help with Fees.">Gweld a ydych yn gymwys i gael help i dalu ffioedd.</a>',
  select_all_apply: 'Dewiswch bob un sy’n berthnasol',
  yesNeedHelpWithFeesPaying: 'Oes, rwyf eisiau help i dalu’r ffi',
  noNeedHelpWithFeesPaying: 'Nac oes, ni wyf eisiau help',
  errors: {
    hwf_needHelpWithFees: {
      required: 'Dewiswch oes os ydych chi eisiau help i dalu’r ffi am y cais hwn',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hwf_needHelpWithFees: {
      type: 'radios',
      classes: 'govuk-radios',
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
