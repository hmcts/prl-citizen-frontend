import _ from 'lodash';

import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { interpolate } from '../../steps/common/string-parser';
import { getMOJForkingScreenUrl } from '../../steps/urls';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Completing your application',
  paragraphs: [
    'You can complete this application online.',
    'At the end of the application process you will need to pay a court fee{feeText}',
    'The payment will be taken at the end of the process, when you submit your application.',
  ],
  helpPayingCourtFeesSubHeading: 'Get help paying court fees',
  courtFeesParagraphs: [
    'You may be able to get help with some or all of your court fees depending on your savings, income and benefits.',
    'If you apply for help with fees a payment will not be taken when you submit the application.',
    "<p class='govuk-body'> Check the <a href='https://www.gov.uk/get-help-with-court-fees' class='govuk-link' rel='external' target='_blank'>help with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you meet the criteria and apply for support.</p>",
  ],
  feeRetrievedText: ' of £{feeAmount}.',
  errorRetrievingFee:
    ". The leaftlet EX50 tells you the fee amount - <a href='https://www.gov.uk/government/publications/fees-in-the-civil-and-family-courts-main-fees-ex50/family-court-fees-ex50'class='govuk-link' rel='external' target='_blank'>Family court fees (EX50) (opens in a new tab)</a>",
  cancel: 'Cancel',
});

const cy = () => ({
  title: 'Cwblhau eich cais',
  paragraphs: [
    'Gallwch gwblhau’r cais hwn ar-lein.',
    'Ar ddiwedd y broses gwneud cais bydd angen ichi dalu ffi’r llys{feeText}',
    'Fe gymerir y taliad ar ddiwedd y broses, pan fyddwch yn cyflwyno eich cais.',
  ],
  helpPayingCourtFeesSubHeading: 'Help i dalu ffioedd llys',
  courtFeesParagraphs: [
    'Efallai y gallwch gael help gyda rhywfaint o’ch ffioedd llys neu’r holl ffioedd yn dibynnu ar eich cynilion, eich incwm a’ch budd-daliadau.',
    'Os byddwch yn gwneud cais am help i dalu ffioedd ni chymerir y taliad pan fyddwch yn cyflwyno’r cais.',
    "<p class='govuk-body'> Cyfeiriwch at y cyfarwyddyd ar <a href='https://www.gov.uk/get-help-with-court-fees' class='govuk-link' rel='external' target='_blank'>help i dalu ffioedd ar GOV.UK (yn agor mewn tab newydd)</a> i weld os ydych yn bodloni’r meini prawf ac i wneud cais am gymorth. </p>",
  ],
  feeRetrievedText: ' o £{feeAmount}.',
  errorRetrievingFee:
    ". The leaftlet EX50 tells you the fee amount - <a href='https://www.gov.uk/government/publications/fees-in-the-civil-and-family-courts-main-fees-ex50/family-court-fees-ex50'class='govuk-link' rel='external' target='_blank'>Family court fees (EX50) (opens in a new tab)</a> (welsh)",
  cancel: 'Canslo',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.onlycontinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const testingSupport = content.additionalData?.req?.session?.testingSupport;
  const feeAmount = _.get(content, 'userCase.c100ApplicationFees', '');
  const feeText =
    feeAmount !== '' ? interpolate(translations.feeRetrievedText, { feeAmount }) : translations.errorRetrievingFee;
  translations.paragraphs[1] = interpolate(translations.paragraphs[1], {
    feeText,
  });

  return {
    ...translations,
    form: {
      ...form,
      link: {
        ...form.link,
        href: getMOJForkingScreenUrl(testingSupport),
      },
    },
  };
};
