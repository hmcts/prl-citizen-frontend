import { AWPApplicationReason } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS } from '../../../steps/urls';
import { getApplicationDetails } from '../utils';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  caseNumber: 'Case number',
  startNow: 'Start now',
  caption: 'Make a {applicationType} application',
  [AWPApplicationReason.DELAY_CANCEL_HEARING_DATE]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'You will not have to pay a fee if the hearing is more than 14 days away and the other person in the case agrees to your request.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.REQUEST_MORE_TIME]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.PROHIBITED_STEPS_ORDER]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.SPECIFIC_ISSUE_ORCDER]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to enforce a Child Arrangements Order.',
    ],
  },
  [AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to apply to change, extend or cancel a non-molestation order or occupation order.',
    ],
  },
  [AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.JOIN_OR_LEAVE_CASE]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.PERMISSION_FOR_APPLICATION]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce.',
      'Fees can be up to {applicationFee} depending on the information you provide.',
    ],
  },
  [AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY]: {
    contents: ['You will have to pay a fee of {applicationFee} to request an order relating to a child.'],
  },
  [AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD]: {
    contents: ['You will have to pay a fee of {applicationFee} to request an order relating to a child.'],
  },
  [AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to ask the court to deliver papers to the other party.',
    ],
  },
  [AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask the court to order someone to provide information on where a child is.',
    ],
  },
  [AWPApplicationReason.APPEAL_COURT_ORDER]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to appeal a court order or ask for permission to appeal.',
    ],
  },
  [AWPApplicationReason.YOU_ACCUSED_SOMEONE]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask the court to prevent questioning in person when accusations of abuse have been made.',
    ],
  },
  [AWPApplicationReason.ACCUSED_BY_SOMEONE]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask the court to prevent questioning in person when accusations of abuse have been made.',
    ],
  },
  [AWPApplicationReason.ORDER_AUTHORISING_SEARCH]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask for an order authorising search for, taking charge of and delivery of a child.',
    ],
  },
  [AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS]: {
    contents: [
      'You will need to pay a fee of {applicationFee} for your request to ask the court to order a witness to attend or bring in documents.',
    ],
  },
  [AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to request the court acts when someone in the case is disobeying a court order.',
    ],
  },
  [AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT]: {
    contents: ['You will have to pay a fee of {applicationFee} to request the court issues an arrest warrant.'],
  },
  helpWithFees: {
    title: 'Get help paying court fees',
    contents: [
      'You can check the help with fees guidance on <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.',
    ],
  },
};

const cy: typeof en = {
  caseNumber: 'Rhif yr achos',
  startNow: 'Dechrau nawr',
  caption: 'Gwneud cais {applicationType}',
  [AWPApplicationReason.DELAY_CANCEL_HEARING_DATE]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Ni fydd rhaid i chi dalu ffi os yw’r gwrandawiad mwy na 14 diwrnod i ffwrdd ac mae’r unigolyn arall yn yr achos yn cytuno â’ch cais.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.REQUEST_MORE_TIME]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.PROHIBITED_STEPS_ORDER]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.SPECIFIC_ISSUE_ORCDER]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to enforce a Child Arrangements Order. - welsh',
    ],
  },
  [AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to apply to change, extend or cancel a non-molestation order or occupation order. - welsh',
    ],
  },
  [AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.JOIN_OR_LEAVE_CASE]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.PERMISSION_FOR_APPLICATION]: {
    contents: [
      'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
      'Gall y ffi fod yn hyd at {applicationFee} yn dibynnu ar yr wybodaeth a ddarperir gennych.',
    ],
  },
  [AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY]: {
    contents: ['You will have to pay a fee of {applicationFee} to request an order relating to a child. - welsh'],
  },
  [AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD]: {
    contents: ['You will have to pay a fee of {applicationFee} to request an order relating to a child. - welsh'],
  },
  [AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to ask the court to deliver papers to the other party. - welsh',
    ],
  },
  [AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask the court to order someone to provide information on where a child is. - welsh',
    ],
  },
  [AWPApplicationReason.APPEAL_COURT_ORDER]: {
    contents: [
      'You will have to pay a fee of {applicationFee} for your request to appeal a court order or ask for permission to appeal. - welsh',
    ],
  },
  [AWPApplicationReason.YOU_ACCUSED_SOMEONE]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask the court to prevent questioning in person when accusations of abuse have been made. - welsh',
    ],
  },
  [AWPApplicationReason.ACCUSED_BY_SOMEONE]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask the court to prevent questioning in person when accusations of abuse have been made. - welsh',
    ],
  },
  [AWPApplicationReason.ORDER_AUTHORISING_SEARCH]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to ask for an order authorising search for, taking charge of and delivery of a child. - welsh',
    ],
  },
  [AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS]: {
    contents: [
      'You will need to pay a fee of {applicationFee} for your request to ask the court to order a witness to attend or bring in documents. - welsh',
    ],
  },
  [AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY]: {
    contents: [
      'You will have to pay a fee of {applicationFee} to request the court acts when someone in the case is disobeying a court order. - welsh',
    ],
  },
  [AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT]: {
    contents: ['You will have to pay a fee of {applicationFee} to request the court issues an arrest warrant. - welsh'],
  },
  helpWithFees: {
    title: 'Help i dalu ffioedd llys',
    contents: [
      'Gallwch wirio’r cyfarwyddyd ar help i dalu ffioedd ar <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (yn agor mewn tab newydd)</a> i ganfod a ydych yn gymwys i gael cymorth.',
    ],
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  startNow: {
    classes: 'govuk-!-margin-top-6',
    text: l => l.startNow,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
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
    request.session
  );

  return {
    ...translations,
    breadcrumb: {
      id: 'requestTheCourtForChange',
      href: applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, { pageNumber: '1' }),
    },
    caption: interpolate(translations.caption, { applicationType: applicationDetails!.applicationType }),
    title: applicationDetails!.reasonText,
    contents: translations[applicationDetails!.applicationReason].contents.map(_content =>
      interpolate(_content, { applicationFee: applicationDetails!.applicationFee })
    ),
    form,
  };
};
