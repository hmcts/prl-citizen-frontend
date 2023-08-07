import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import {
  APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
} from '../../urls';
import { getApplicationDetails } from '../utils';

import { summaryList } from './mainUtil';

export const enContent = {
  section: 'Check your answers',
  caseNumber: 'Case number',
  application: 'application',
  sectionTitles: {},
  keys: {
    awp_applicationList: 'What are you applying for?',
    awp_cancelDelayHearing: 'Which hearing are you applying to delay or cancel?',
    awp_agreementForRequest: 'Does the other person in the case agree with the date change?',
    awp_uploadedApplicationForms: 'Document uploaded',
    //Do you have supporting documents to upload?
    awp_need_hwf: 'Will you be using help with fees to pay for this application?',
    awp_hwf_referenceNumber: 'Help with fees reference number',
  },
  change: 'Change',
  cancel: 'Cancel',
  errors: {},
};

export const cyContent: typeof enContent = {
  section: 'Check your answers -welsh',
  caseNumber: 'Rhif yr achos ',
  application: 'application -welsh',
  sectionTitles: {},
  keys: {
    awp_applicationList: 'What are you applying for?',
    awp_cancelDelayHearing: 'Which hearing are you applying to delay or cancel?',
    awp_agreementForRequest: 'Does the other person in the case agree with the date change?',
    awp_uploadedApplicationForms: 'Document uploaded',
    //Do you have supporting documents to upload?
    awp_need_hwf: 'Will you be using help with fees to pay for this application?',
    awp_hwf_referenceNumber: 'Help with fees reference number',
  },
  change: 'Change',
  cancel: 'Cancel',
  errors: {},
};

const urls = {
  awp_applicationList: APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  awp_uploadedApplicationForms: APPLICATION_WITHIN_PROCEEDINGS_UPLOAD_YOUR_APPLICATION,
  awp_cancelDelayHearing: APPLICATION_WITHIN_PROCEEDINGS_DELAY_CANCEL_SELECT_HEARING,
  awp_agreementForRequest: APPLICATION_WITHIN_PROCEEDINGS_AGREEMENT_FOR_REQUEST,
  awp_need_hwf: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES,
  awp_hwf_referenceNumber: APPLICATION_WITHIN_PROCEEDINGS_HELP_WITH_FEES_REFERENCE,
};
const en = (content: CommonContent) => {
  const userCase = content.userCase!;
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

  return {
    ...enContent,
    language: content.language,
    sections: [summaryList(enContent, userCase, applicationDetails, urls, content.language)],
  };
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
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

  return {
    ...cyContent,
    language: content.language,
    sections: [summaryList(cyContent, userCase, applicationDetails, urls, content.language)],
  };
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
  const translations = languages[content.language](content);

  return {
    ...translations,
    form,
  };
};
