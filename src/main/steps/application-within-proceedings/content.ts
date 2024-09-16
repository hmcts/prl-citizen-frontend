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
    reasonText: 'Gofyn i ohirio neu ganslo dyddiad gwrandawiad',
  },
  [AWPApplicationReason.REQUEST_MORE_TIME]: {
    reasonText: 'Gofyn am ragor o amser i wneud yr hyn y mae gorchymyn llys yn eich cyfarwyddo i wneud',
  },
  [AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME]: {
    reasonText: 'Gorchymyn Trefniadau Plant Byw Gyda neu Treulio Amser Gyda',
  },
  [AWPApplicationReason.PROHIBITED_STEPS_ORDER]: {
    reasonText: 'Gorchymyn Camau Gwaharddedig',
  },
  [AWPApplicationReason.SPECIFIC_ISSUE_ORCDER]: {
    reasonText: 'Gorchymyn Mater Penodol',
  },
  [AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER]: {
    reasonText: 'Gorfodi Gorchymyn Trefniadau Plant',
  },
  [AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER]: {
    reasonText: 'Gwneud cais i newid, ymestyn neu ganslo gorchymyn rhag molestu neu orchymyn anheddu',
  },
  [AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED]: {
    reasonText: 'Gofyn i gael cyflwyno tystiolaeth nad yw’r llys wedi gofyn amdani',
  },
  [AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE]: {
    reasonText: 'Gofyn i gael rhannu dogfennau gyda rhywun arall',
  },
  [AWPApplicationReason.JOIN_OR_LEAVE_CASE]: {
    reasonText: 'Gofyn i gael ymuno ag achos neu adael achos',
  },
  [AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION]: {
    reasonText: 'Gwneud cais i dynnu cais yn ôl',
  },
  [AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT]: {
    reasonText: 'Gofyn i’r llys benodi arbenigwr (megis gweithiwr iechyd proffesiynol neu seicolegydd plant)',
  },
  [AWPApplicationReason.PERMISSION_FOR_APPLICATION]: {
    reasonText: 'Cael caniatâd i wneud cais os yw’r llys wedi’ch atal rhag gwneud hynny yn y gorffennol',
  },
  [AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY]: {
    reasonText: 'Gofyn am orchymyn sy’n ymwneud â phlentyn',
  },
  [AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD]: {
    reasonText: 'Gofyn am orchymyn sy’n ymwneud â phlentyn',
  },
  [AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY]: {
    reasonText: 'Gofyn i’r llys ddanfon papurau i’r parti arall',
  },
  [AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD]: {
    reasonText: 'Gofyn i’r llys orchymyn bod rhywun yn darparu gwybodaeth am leoliad plentyn',
  },
  [AWPApplicationReason.APPEAL_COURT_ORDER]: {
    reasonText: 'Apelio yn erbyn gorchymyn llys neu ofyn am ganiatâd i apelio',
  },
  [AWPApplicationReason.YOU_ACCUSED_SOMEONE]: {
    reasonText:
      'Gofyn i’r llys atal caniatáu cwestiynu unigolyn yn bersonol pan fydd honiadau o gam-drin wedi’u gwneud',
  },
  [AWPApplicationReason.ACCUSED_BY_SOMEONE]: {
    reasonText:
      'Gofyn i’r llys atal caniatáu cwestiynu unigolyn yn bersonol pan fydd honiadau o gam-drin wedi’u gwneud',
  },
  [AWPApplicationReason.ORDER_AUTHORISING_SEARCH]: {
    reasonText:
      'Gofyn am orchymyn i awdurdodi chwilio am blentyn, cymryd cyfrifoldeb dros blentyn a throsglwyddo plentyn',
  },
  [AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS]: {
    reasonText: 'Gwneud cais am orchymyn i dyst fynychu’r llys',
  },
  [AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY]: {
    reasonText: 'Gofyn i’r llys orchymyn bod rhywun yn darparu gwybodaeth am leoliad plentyn',
  },
  [AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT]: {
    reasonText: 'Gwneud cais i’r llys godi gwarant i arestio',
  },
};

export const languages = {
  en,
  cy,
};
