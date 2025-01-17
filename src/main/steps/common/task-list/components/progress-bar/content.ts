import { CaseType } from '../../../../../app/case/definition';

const en = {
  complete: 'is completed',
  inProgress: 'is in progress',
  notStarted: 'is not yet started',
  ['C100-case-creation']: {
    childrenPostCode: {
      label: 'Children<br/>postcode',
      ariaLabel: 'Children postcode',
    },
    screeningSection: {
      label: 'Screening<br/>questions',
      ariaLabel: 'Screening questions',
    },
    miam: {
      label: 'MIAM',
      ariaLabel: 'MIAM',
    },
    typeOfOrder:{
      label: 'Type<br/>of<br/>order',
      ariaLabel: 'Type of order',
    },
    otherProceedings:{
      label: 'Other<br/>Proceedings',
      ariaLabel: 'Other Proceedings',
    },
    urgencyAndWithoutNotice:{
      label: 'Urgency<br/>&<br/>Without notice',
      ariaLabel: 'Urgency and Without notice',
    },
    people:{
      label: 'People',
      ariaLabel: 'People',
    },
    safetyConcerns:{
      label: 'Safety<br/>concerns',
      ariaLabel: 'Safety concerns',
    },
    internationalElements:{
      label: 'International<br/>elements',
      ariaLabel: 'International elements',
    },
    reasonableAdjustments:{
      label: 'Reasonable<br/>adjustments',
      ariaLabel: 'Reasonable adjustments',
    },
    helpWithFees:{
      label: 'Help<br/>with<br/>fees',
      ariaLabel: 'Help with fees',
    },
    reviewAnswers:{
      label: 'Review<br/>answers',
      ariaLabel: 'Review answers',
    }
  },
  [CaseType.C100]: {
    applicationSubmitted: {
      label: 'Application<br/> submitted',
      ariaLabel: 'Application submitted stage',
    },
    cafcassSafetyChecks: {
      label: 'Cafcass child<br/> safety checks',
      ariaLabel: 'Cafcass child safety checks stage',
    },
    responseSubmitted: {
      label: 'Response<br/> submitted',
      ariaLabel: 'Response submitted stage',
    },
    hearingAndCourtOrders: {
      label: 'Hearings and<br/> court orders',
      ariaLabel: 'Hearings and court orders stage',
    },
    caseClosed: {
      label: 'Case closed',
      ariaLabel: 'Case closed stage',
    },
  },
  [CaseType.FL401]: {
    caseOpened: {
      label: 'Case<br/> opened',
      ariaLabel: 'Case opened stage',
    },
    hearingAndCourtOrders: {
      label: 'Hearings and<br/> court orders',
      ariaLabel: 'Hearings and court orders stage',
    },
    finalOrder: {
      label: 'Final order',
      ariaLabel: 'Final order stage',
    },
    caseClosed: {
      label: 'Case closed',
      ariaLabel: 'Case closed stage',
    },
  },
};

const cy: typeof en = {
  complete: 'wedi’i gwblhau',
  inProgress: 'ar y gweill',
  notStarted: 'heb ddechrau eto',
  ['C100-case-creation']: {
    childrenPostCode: {
      label: 'Children<br/>postcode - welsh',
      ariaLabel: 'Children postcode - welsh',
    },
    screeningSection: {
      label: 'Screening<br/>questions - welsh',
      ariaLabel: 'Screening questions - welsh',
    },
    miam: {
      label: 'MIAM - welsh',
      ariaLabel: 'MIAM - welsh',
    },
    typeOfOrder:{
      label: 'Type<br/>of<br/>order - welsh',
      ariaLabel: 'Type of order - welsh',
    },
    otherProceedings:{
      label: 'Other<br/>Proceedings - welsh',
      ariaLabel: 'Other Proceedings - welsh',
    },
    urgencyAndWithoutNotice:{
      label: 'Urgency<br/>&<br/>Without notice - welsh',
      ariaLabel: 'Urgency and Without notice - welsh',
    },
    people:{
      label: 'People - welsh',
      ariaLabel: 'People - welsh',
    },
    safetyConcerns:{
      label: 'Safety<br/>concerns - welsh',
      ariaLabel: 'Safety concerns - welsh',
    },
    internationalElements:{
      label: 'International<br/>elements - welsh',
      ariaLabel: 'International elements - welsh',
    },
    reasonableAdjustments:{
      label: 'Reasonable<br/>adjustments - welsh',
      ariaLabel: 'Reasonable adjustments - welsh',
    },
    helpWithFees:{
      label: 'Help<br/>with<br/>fees - welsh',
      ariaLabel: 'Help with fees - welsh',
    },
    reviewAnswers:{
      label: 'Review<br/>answers - welsh',
      ariaLabel: 'Review answers - welsh',
    }
  },
  [CaseType.C100]: {
    applicationSubmitted: {
      label: "Cais wedi'i<br/> gyflwyno",
      ariaLabel: 'Cam cais wedi’i gyflwyno',
    },
    cafcassSafetyChecks: {
      label: 'Gwiriadau diogelwch<br/> plant Cafcass',
      ariaLabel: 'Cam gwiriadau diogelwch plant Cafcass',
    },
    responseSubmitted: {
      label: "Ymateb wedi'i<br/> gyflwyno",
      ariaLabel: 'Cam ymateb wedi’i gyflwyno',
    },
    hearingAndCourtOrders: {
      label: 'Gwrandawiadau <br/>a<br/> gorchmynion llys',
      ariaLabel: 'Cam gwrandawiadau a gorchmynion llys',
    },
    caseClosed: {
      label: 'Achos wedi’i <br/>gau',
      ariaLabel: 'Cam achos wedi’i gau',
    },
  },
  [CaseType.FL401]: {
    caseOpened: {
      label: 'Achos<br/> wedi’i agor',
      ariaLabel: 'Cam achos wedi’i agor',
    },
    hearingAndCourtOrders: {
      label: 'Gwrandawiadau a<br/> gorchmynion llys',
      ariaLabel: 'Cam gwrandawiadau a gorchmynion llys',
    },
    finalOrder: {
      label: 'Gorchymyn terfynol',
      ariaLabel: 'Cam gorchymyn terfynol',
    },
    caseClosed: {
      label: 'Achos wedi’i gau',
      ariaLabel: 'Cam achos wedi’i gau',
    },
  },
};

export const languages = {
  en,
  cy,
};
