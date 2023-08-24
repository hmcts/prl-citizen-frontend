import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
//import { CommonContent } from '../../common/common.content';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
// import {
//   APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
//   APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
//   APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
//   APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
//   APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
//   APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
// } from '../../urls';
import { getApplicationDetails } from '../utils';

import { populateUserCase, summaryList } from './utils';

export const en = {
  section: 'Check your answers',
  caseNumber: 'Case number',
  application: 'application',
  sectionTitles: {},
  keys: {
    applicationList: 'What are you applying for?',
    cancelDelayHearing: 'Which hearing are you applying to delay or cancel?',
    agreementForRequest: 'Does the other person in the case agree with the date change?',
    informOther:"Can the respondent be informed about the application?",
    uploadedApplicationForms: 'Document uploaded',
    hasSupportingDocuments: 'Do you have supporting documents to upload?',
    need_hwf: 'Will you be using help with fees to pay for this application?',
    hwf_referenceNumber: 'Help with fees reference number',
  },
  change: 'Change',
  cancel: 'Cancel',
  continue:"Submit Application",
  errors: {},
};

export const cy = {
  section: 'Check your answers -welsh',
  caseNumber: 'Rhif yr achos ',
  application: 'application -welsh',
  sectionTitles: {},
  keys: {
    applicationList: 'What are you applying for? -welsh',
    cancelDelayHearing: 'Which hearing are you applying to delay or cancel? -welsh',
    agreementForRequest: 'Does the other person in the case agree with the date change? -welsh',
    informOther:"Can the respondent be informed about the application? -welsh",
    uploadedApplicationForms: 'Document uploaded -welsh',
    hasSupportingDocuments: 'Do you have supporting documents to upload? -welsh',
    need_hwf: 'Will you be using help with fees to pay for this application? -welsh',
    hwf_referenceNumber: 'Help with fees reference number -welsh',
  },
  change: 'Change -welsh',
  cancel: 'Cancel -welsh',
  continue:"Submit Application -welsh",
  errors: {},
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '/',
    text: l => l.cancel,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const userCase = populateUserCase(content.userCase!);
  const request = content.additionalData!.req;
  const caseData = request.session.userCase;
  const { applicationType, applicationReason } = request.params;
  const partyType = getCasePartyType(caseData, request.session.user.id);
  const applicationDetails = getApplicationDetails(
    applicationType,
    applicationReason,
    caseData.caseTypeOfApplication,
    partyType,
    content.language,
    request.session.applicationSettings
  );
  const translations = languages[content.language];


  return {
    ...translations,
    form,
    sections: [summaryList(content.language==='en'?en:cy, userCase, applicationDetails,content.language)]
  };
};
