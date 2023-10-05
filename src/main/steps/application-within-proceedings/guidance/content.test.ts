/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { AWPApplicationReason } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { interpolate } from '../../common/string-parser';

import { generateContent } from './content';

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
  caseNumber: 'Case number - welsh',
  startNow: 'Start now -  welsh',
  caption: 'Make a {applicationType} application - welsh',
  [AWPApplicationReason.DELAY_CANCEL_HEARING_DATE]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'You will not have to pay a fee if the hearing is more than 14 days away and the other person in the case agrees to your request. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.REQUEST_MORE_TIME]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.PROHIBITED_STEPS_ORDER]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.SPECIFIC_ISSUE_ORCDER]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
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
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.JOIN_OR_LEAVE_CASE]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
    ],
  },
  [AWPApplicationReason.PERMISSION_FOR_APPLICATION]: {
    contents: [
      'If you can get the other person in the case to agree to your request, the fee you may have to pay will reduce. - welsh',
      'Fees can be up to {applicationFee} depending on the information you provide. - welsh',
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
    title: 'Get help paying court fees - welsh',
    contents: [
      'You can check the help with fees guidance on <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (opens in a new tab)</a> to find out if you are eligible for support. - welsh',
    ],
  },
};

describe('help with fees content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          applicationType: 'C2',
          applicationReason: 'delay-or-cancel-hearing-date',
        },
        session: {
          userCase: {
            id: '1234',
            caseTypeOfApplication: 'FL401',
            caseInvites: [],
            respondents: '',
            respondentsFL401: '',
          },
          user: {
            id: '1234',
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    en.caption = interpolate(en.caption, {
      applicationType: commonContent.additionalData?.req.params.applicationType,
    });
    cy.caption = interpolate(cy.caption, {
      applicationType: commonContent.additionalData?.req.params.applicationType,
    });
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(form?.startNow?.text(generatedContent)).toBe(en.startNow);
  });
});
