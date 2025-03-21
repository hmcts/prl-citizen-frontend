import { ProgressBarConfigType } from '../../definitions';

const en = {
  complete: 'is completed',
  inProgress: 'is in progress',
  notStarted: 'is not yet started',
  [ProgressBarConfigType.C100_CASE_CREATION]: {
    childrenPostCode: {
      label: 'Childs<br/>postcode',
      ariaLabel: 'Childs postcode',
    },
    screeningSection: {
      label: 'Parties<br/>agreement',
      ariaLabel: 'Parties agreement',
    },
    consentOrder: {
      label: 'Consent order',
      ariaLabel: 'Consent order',
    },
    miam: {
      label: 'MIAM',
      ariaLabel: 'MIAM',
    },
    typeOfOrder: {
      label: 'Type<br/>of<br/>order',
      ariaLabel: 'Type of order',
    },
    otherProceedings: {
      label: 'Other<br/>proceedings',
      ariaLabel: 'Other proceedings',
    },
    urgencyAndWithoutNotice: {
      label: 'Hearing<br/>urgency',
      ariaLabel: 'Hearing urgency',
    },
    people: {
      label: 'People',
      ariaLabel: 'People',
    },
    safetyConcerns: {
      label: 'Safety<br/>concerns',
      ariaLabel: 'Safety concerns',
    },
    internationalElements: {
      label: 'International<br/>elements',
      ariaLabel: 'International elements',
    },
    reasonableAdjustments: {
      label: 'Court<br/>support',
      ariaLabel: 'Court support',
    },
    helpWithFees: {
      label: 'Payment',
      ariaLabel: 'Payment',
    },
  },
  [ProgressBarConfigType.C100_CASE_PROGRESSION]: {
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
  [ProgressBarConfigType.FL401_CASE_PROGRESSION]: {
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
  [ProgressBarConfigType.C100_CASE_CREATION]: {
    childrenPostCode: {
      label: 'Cod post<br/> plant',
      ariaLabel: 'Cod post plant',
    },
    screeningSection: {
      label: 'Cytundeb<br/>partïon',
      ariaLabel: 'Cytundeb partïon',
    },
    consentOrder: {
      label: 'Gorchymyn caniatâd',
      ariaLabel: 'Gorchymyn caniatâd',
    },
    miam: {
      label: 'MIAM',
      ariaLabel: 'MIAM',
    },
    typeOfOrder: {
      label: 'Math o orchymyn',
      ariaLabel: 'Math o orchymyn',
    },
    otherProceedings: {
      label: 'Achosion eraill',
      ariaLabel: 'Achosion eraill',
    },
    urgencyAndWithoutNotice: {
      label: 'Pa mor frys yw’r cais',
      ariaLabel: 'Pa mor frys yw’r cais',
    },
    people: {
      label: 'Pobl',
      ariaLabel: 'Pobl',
    },
    safetyConcerns: {
      label: 'Pryderon diogelwch',
      ariaLabel: 'Pryderon diogelwch',
    },
    internationalElements: {
      label: 'Elfennau rhyngwladol',
      ariaLabel: 'Elfennau rhyngwladol',
    },
    reasonableAdjustments: {
      label: 'Cefnogaeth llys',
      ariaLabel: 'Cefnogaeth llys',
    },
    helpWithFees: {
      label: 'Taliad',
      ariaLabel: 'Taliad',
    },
  },
  [ProgressBarConfigType.C100_CASE_PROGRESSION]: {
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
  [ProgressBarConfigType.FL401_CASE_PROGRESSION]: {
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
