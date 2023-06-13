import { AWPApplicationReason } from '../../app/case/definition';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  [AWPApplicationReason.DELAY_CANCEL_HEARING_DATE]: {
    reasonText: 'Ask to delay or cancel a hearing date',
  },
  [AWPApplicationReason.REQUEST_MORE_TIME]: {
    reasonText: 'Request more time to do what is required by a court order',
  },
  [AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME]: {
    reasonText: 'Child arrangements live with, or spend time with, order',
  },
  [AWPApplicationReason.PROHIBITED_STEPS_ORDER]: {
    reasonText: 'Prohibited steps order',
  },
  [AWPApplicationReason.SPECIFIC_ISSUE_ORCDER]: {
    reasonText: 'Specific issue order',
  },
  [AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER]: {
    reasonText: 'Enforce a Child Arrangements Order',
  },
  [AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER]: {
    reasonText: 'Apply to change, extend or cancel a non-molestation order or occupation order',
  },
  [AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED]: {
    reasonText: 'Ask to submit evidence the court has not requested',
  },
  [AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE]: {
    reasonText: 'Ask to share documents with someone else',
  },
  [AWPApplicationReason.JOIN_OR_LEAVE_CASE]: {
    reasonText: 'Ask to join or leave a case',
  },
  [AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION]: {
    reasonText: 'Request to withdraw an application',
  },
  [AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT]: {
    reasonText: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist)',
  },
  [AWPApplicationReason.PERMISSION_FOR_APPLICATION]: {
    reasonText: 'Get permission for an application if the court previously stopped you',
  },
  [AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY]: {
    reasonText: 'Request an order relating to a child',
  },
  [AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD]: {
    reasonText: 'Request an order relating to a child',
  },
  [AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY]: {
    reasonText: 'Ask the court to deliver papers to the other party',
  },
  [AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD]: {
    reasonText: 'Ask the court to order someone to provide information on where a child is',
  },
  [AWPApplicationReason.APPEAL_COURT_ORDER]: {
    reasonText: 'Appeal a court order or ask for permission to appeal',
  },
  [AWPApplicationReason.YOU_ACCUSED_SOMEONE]: {
    reasonText: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
  },
  [AWPApplicationReason.ACCUSED_BY_SOMEONE]: {
    reasonText: 'Ask the court to prevent questioning in person when accusations of abuse have been made',
  },
  [AWPApplicationReason.ORDER_AUTHORISING_SEARCH]: {
    reasonText: 'Ask for an order authorising search for, taking charge of and delivery of a child',
  },
  [AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS]: {
    reasonText: 'Make a request to order a witness to attend court',
  },
  [AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY]: {
    reasonText: 'Request the court acts when someone in the case is disobeying a court order',
  },
  [AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT]: {
    reasonText: 'Request the court issues an arrest warrant',
  },
};

const cy: typeof en = {
  [AWPApplicationReason.DELAY_CANCEL_HEARING_DATE]: {
    reasonText: 'Ask to delay or cancel a hearing date - welsh',
  },
  [AWPApplicationReason.REQUEST_MORE_TIME]: {
    reasonText: 'Request more time to do what is required by a court order - welsh',
  },
  [AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME]: {
    reasonText: 'Child arrangements live with, or spend time with, order - welsh',
  },
  [AWPApplicationReason.PROHIBITED_STEPS_ORDER]: {
    reasonText: 'Prohibited steps order - welsh',
  },
  [AWPApplicationReason.SPECIFIC_ISSUE_ORCDER]: {
    reasonText: 'Specific issue order - welsh',
  },
  [AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER]: {
    reasonText: 'Enforce a Child Arrangements Order - welsh',
  },
  [AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER]: {
    reasonText: 'Apply to change, extend or cancel a non-molestation order or occupation order - welsh',
  },
  [AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED]: {
    reasonText: 'Ask to submit evidence the court has not requested - welsh',
  },
  [AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE]: {
    reasonText: 'Ask to share documents with someone else - welsh',
  },
  [AWPApplicationReason.JOIN_OR_LEAVE_CASE]: {
    reasonText: 'Ask to join or leave a case - welsh',
  },
  [AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION]: {
    reasonText: 'Request to withdraw an application - welsh',
  },
  [AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT]: {
    reasonText: 'Ask the court to appoint an expert (such as a medical professional or a child psychologist) - welsh',
  },
  [AWPApplicationReason.PERMISSION_FOR_APPLICATION]: {
    reasonText: 'Get permission for an application if the court previously stopped you - welsh',
  },
  [AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY]: {
    reasonText: 'Request the court grants you parental responsibility - welsh',
  },
  [AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD]: {
    reasonText: 'Request the court appoints a guardian for the child - welsh',
  },
  [AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY]: {
    reasonText: 'Ask the court to deliver papers to the other party - welsh',
  },
  [AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD]: {
    reasonText: 'Ask the court to order someone to provide information on where a child is - welsh',
  },
  [AWPApplicationReason.APPEAL_COURT_ORDER]: {
    reasonText: 'Appeal a court order or ask for permission to appeal - welsh',
  },
  [AWPApplicationReason.YOU_ACCUSED_SOMEONE]: {
    reasonText: 'Ask the court to prevent questioning in person when accusations of abuse have been made - welsh',
  },
  [AWPApplicationReason.ACCUSED_BY_SOMEONE]: {
    reasonText: 'Ask the court to prevent questioning in person when accusations of abuse have been made - welsh',
  },
  [AWPApplicationReason.ORDER_AUTHORISING_SEARCH]: {
    reasonText: 'Ask for an order authorising search for, taking charge of and delivery of a child - welsh',
  },
  [AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS]: {
    reasonText: 'Make a request to order a witness to attend court - welsh',
  },
  [AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY]: {
    reasonText: 'Request the court acts when someone in the case is disobeying a court order - welsh',
  },
  [AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT]: {
    reasonText: 'Request the court issues an arrest warrant - welsh',
  },
};

export const languages = {
  en,
  cy,
};
