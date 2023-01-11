/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

export const en = () => ({
  hwfGuidanceTitle: 'You need to apply for help with your child arrangements application fee',
  hwfApplyLinkHint1: 'You need to',
  hwfApplyLinkHint2: 'before you continue with this child arrangements application.',
  applyForHwfLink:
    '<a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank" aria-label="apply for help with fees (opens in a new tab)">apply for help with fees (opens in a new tab)</a>',
  hwfGuidanceC100Hint: "Enter 'C100' when you are asked for your court or tribunal form number.",
  hwfGuidanceHint2: `After you have applied for help with fees, you will receive a reference number.
  Add this reference number below to proceed with the child arrangements application.`,
  hwfReferenceNumberLabel: 'Enter your help with fees reference number',
  hwfReferenceNumberHint: 'For example, HWF-A1B-23C',
  errors: {
    helpWithFeesReferenceNumber: {
      required: 'Enter the help with fees reference number you received when you applied for help with fees',
    },
  },
});

export const cy = () => ({
  hwfGuidanceTitle: 'Mae angen ichi wneud cais am help i dalu ffi eich cais trefniadau plant',
  hwfApplyLinkHint1: 'Mae angen ichi',
  hwfApplyLinkHint2: 'cyn ichi fwrw ymlaen â’r cais trefniadau plant hwn.',
  applyForHwfLink:
    '<a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank" aria-label="apply for help with fees (opens in a new tab)">gwneud cais am help i dalu ffioedd (mae\'n agor mewn tab newydd)</a>',
  hwfGuidanceC100Hint: 'Nodwch ‘C100’ pan ofynnir wrthych am rif ffurflen llys neu dribiwnlys.',
  hwfGuidanceHint2: `Wedi ichi wneud cais am help i dalu ffioedd, byddwch yn cael cyfeirnod.
  Nodwch y cyfeirnod hwnnw isod i fwrw ymlaen â’r cais trefniadau plant.`,
  hwfReferenceNumberLabel: 'Nodwch eich cyfeirnod help i dalu ffioedd',
  hwfReferenceNumberHint: 'Er enghraifft, HWF-A1B-23C',
  errors: {
    helpWithFeesReferenceNumber: {
      required: 'Nodwch y cyfeirnod Help i dalu Ffioedd a gawsoch pan wnaethoch chi wneud cais am Help i dalu Ffioedd',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    helpWithFeesReferenceNumber: {
      type: 'text',
      label: l => l.hwfReferenceNumberLabel,
      labelSize: 'm',
      hint: l => l.hwfReferenceNumberHint,
      classes: 'govuk-input--width-10',
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
