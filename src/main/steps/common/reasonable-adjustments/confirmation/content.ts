import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  successText: 'You have submitted your request to the court',
  content1: 'What happens next',
  content2: 'Your support needs have been sent to the court. They’ll be reviewed by HMCTS staff or a judge.',
  content3: 'We’ll contact you if we need more information or we cannot provide the support you’ve requested.',
  content4: 'If your hearing is within 2 days',
  content5:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing.',
  closeAndReturn: 'Close and return to case overview',
};

const cy: typeof en = {
  successText: 'You have submitted your request to the court - welsh',
  content1: 'What happens next - welsh',
  content2: 'Your support needs have been sent to the court. They’ll be reviewed by HMCTS staff or a judge. - welsh',
  content3: 'We’ll contact you if we need more information or we cannot provide the support you’ve requested. - welsh',
  content4: 'If your hearing is within 2 days - welsh',
  content5:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing. - welsh',
  closeAndReturn: 'Close and return to case overview - welsh',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.closeAndReturn,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
