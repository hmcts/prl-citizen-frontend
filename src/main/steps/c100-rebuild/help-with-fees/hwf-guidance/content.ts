import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = () => ({
  hwfGuidanceTitle: 'You need to apply for help with your child arrangements application fee',
  hwfApplyLinkHint1: 'You need to',
  hwfApplyLinkHint2: 'before you continue with this child arrangements application.',
  applyForHwf: 'apply for help with fees (opens in a new tab)',
  hwfGuidanceC100Hint: "Enter 'C100' when you are asked for your court or tribunal form number.",
  hwfGuidanceHint2: `After you have applied for help with fees, you will receive a reference number.
  Add this reference number below to proceed with the child arrangements application.`,
  hwfReferenceNumberLabel: 'Enter your help with fees reference number',
  hwfReferenceNumberHint: 'For example, HWF-A1B-23C',
  errors: {
    hwfGuidanceRefNumber: {
      required: 'provide details',
    },
  },
});

const cy = () => ({
  hwfGuidanceTitle: 'You need to apply for help with your child arrangements application fee - welsh',
  hwfApplyLinkHint1: 'You need to - welsh',
  hwfApplyLinkHint2: 'before you continue with this child arrangements application. - welsh',
  applyForHwf: 'apply for help with fees (opens in a new tab) - welsh',
  hwfGuidanceC100Hint: "Enter 'C100' when you are asked for your court or tribunal form number. - welsh",
  hwfGuidanceHint2: `After you have applied for help with fees, you will receive a reference number.
  Add this reference number below to proceed with the child arrangements application. - welsh`,
  hwfReferenceNumberLabel: 'Enter your help with fees reference number - welsh',
  hwfReferenceNumberHint: 'For example, HWF-A1B-23C - welsh',
  errors: {
    hwfGuidanceRefNumber: {
      required: 'provide details - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hwfGuidanceRefNumber: {
      type: 'text',
      label: l => l.hwfReferenceNumberLabel,
      labelSize: 'm',
      hint: l => l.hwfReferenceNumberHint,
      classes: 'govuk-input--width-10',
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
    form,
  };
};
