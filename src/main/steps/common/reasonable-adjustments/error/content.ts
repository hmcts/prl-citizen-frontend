import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'Sorry, there is a problem with the service',
  content1: 'Try again later.',
  content2:
    'If you have urgent support needs, contact the court. Find the court dealing with your case on <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">GOV.UK (opens in a new tab).</a>',
  returnToCaseView: 'Return to case view',
};

const cy: typeof en = {
  title: 'Sorry, there is a problem with the service - welsh',
  content1: 'Try again later. - welsh',
  content2:
    'If you have urgent support needs, contact the court. Find the court dealing with your case on <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">GOV.UK (opens in a new tab).</a> - welsh',
  returnToCaseView: 'Return to case view - welsh',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    classes: 'govuk-button--secondary govuk-!-margin-top-6',
    text: l => l.returnToCaseView,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
