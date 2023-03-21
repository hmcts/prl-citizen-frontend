import { CaseType } from '../../../../../app/case/definition';

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
  complete: 'is completed - welsh',
  inProgress: 'is in progress - welsh',
  notStarted: 'is not yet started - welsh',
  [CaseType.C100]: {
    applicationSubmitted: {
      label: " Cais wedi'i<br/> gyflwyno",
      ariaLabel: 'Application submitted stage - welsh',
    },
    cafcassSafetyChecks: {
      label: 'Gwiriadau diogelwch<br/> plant Cafcass',
      ariaLabel: 'Cafcass child safety checks stage - welsh',
    },
    responseSubmitted: {
      label: "Ymateb wedi'i<br/> gyflwyno",
      ariaLabel: 'Response submitted stage - welsh',
    },
    hearingAndCourtOrders: {
      label: 'Gwrandawiadau a<br/> gorchmynion llys',
      ariaLabel: 'Hearings and court orders stage - welsh',
    },
    caseClosed: {
      label: 'Achos wedi’i gau',
      ariaLabel: 'Case closed stage - welsh',
    },
  },
  [CaseType.FL401]: {
    caseOpened: {
      label: 'Case<br/> opened',
      ariaLabel: 'Case opened stage - welsh',
    },
    hearingAndCourtOrders: {
      label: 'Gwrandawiadau a<br/> gorchmynion llys',
      ariaLabel: 'Hearings and court orders stage - welsh',
    },
    finalOrder: {
      label: 'Final order',
      ariaLabel: 'Final order stage - welsh',
    },
    caseClosed: {
      label: 'Achos wedi’i gau',
      ariaLabel: 'Case closed stage - welsh',
    },
  },
};

export const languages = {
  en,
  cy,
};
