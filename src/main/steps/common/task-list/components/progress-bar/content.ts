import { CaseType } from '../../../../../app/case/definition';
console.info('** FOR SONAR **');
const en = {
  complete: 'is completed',
  inProgress: 'is in progress',
  notStarted: 'is not yet started',
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
