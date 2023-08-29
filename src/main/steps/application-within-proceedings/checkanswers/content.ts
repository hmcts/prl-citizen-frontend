import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { APPLICATION_SIGNPOSTING_URL } from '../utils';

export * from './routeGuard';

import { prepareSummaryList } from './utils';

export const en = {
  section: 'Check your answers',
  caseNumber: 'Case number',
  application: 'application',
  sectionTitles: {},
  typeOfApplication: 'What are you applying for?',
  whichHearing: 'Which hearing are you applying to delay or cancel?',
  doHaveAgreementForRequest: 'Does the other person in the case agree with the date change?',
  isOtherInformed: 'Can the respondent be informed about the application?',
  documentsUpload: 'Document uploaded',
  doHaveSupportingDocuments: 'Do you have supporting documents to upload?',
  isHwfRequired: 'Will you be using help with fees to pay for this application?',
  hwfReferenceNumber: 'Help with fees reference number',
  change: 'Change',
  cancel: 'Cancel',
  continue: 'Submit Application',
  errors: {},
};

export const cy = {
  section: 'Check your answers -welsh',
  caseNumber: 'Rhif yr achos ',
  application: 'application -welsh',
  sectionTitles: {},
  typeOfApplication: 'What are you applying for? -welsh',
  whichHearing: 'Which hearing are you applying to delay or cancel? -welsh',
  doHaveAgreementForRequest: 'Does the other person in the case agree with the date change? -welsh',
  isOtherInformed: 'Can the respondent be informed about the application? -welsh',
  documentsUpload: 'Document uploaded -welsh',
  doHaveSupportingDocuments: 'Do you have supporting documents to upload? -welsh',
  isHwfRequired: 'Will you be using help with fees to pay for this application? -welsh',
  hwfReferenceNumber: 'Help with fees reference number -welsh',
  change: 'Change -welsh',
  cancel: 'Cancel -welsh',
  continue: 'Submit Application -welsh',
  errors: {},
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: APPLICATION_SIGNPOSTING_URL,
    text: l => l.cancel,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
    sections: [prepareSummaryList(content.language === 'en' ? en : cy, content)],
  };
};
