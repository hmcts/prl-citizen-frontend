import { CaseWithId } from '../../../app/case/case';
import { Respondent, SectionStatus, YesOrNo } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  let status = SectionStatus.TO_DO;
  let keepDetailsPrivate;
  if (userCase?.caseTypeOfApplication === 'C100') {
    userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value.user?.idamId === userIdamId) {
        keepDetailsPrivate = respondent?.value?.response?.keepDetailsPrivate;
      }
    });
  } else {
    keepDetailsPrivate = userCase?.respondentsFL401?.response?.keepDetailsPrivate;
  }
  if (keepDetailsPrivate?.confidentiality && keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = SectionStatus.COMPLETED;
  } else if (keepDetailsPrivate?.confidentiality || keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = SectionStatus.IN_PROGRESS;
  }
  return status;
};

export const getConfirmOrEditYourContactDetails = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  const status = SectionStatus.TO_DO;
  let resp;
  if (userCase?.caseTypeOfApplication === 'C100') {
    userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value.user?.idamId === userIdamId) {
        resp = respondent?.value;
      }
    });
  } else {
    resp = userCase?.respondentsFL401;
  }

  if (resp?.firstName && resp?.lastName && resp?.dateOfBirth && resp?.placeOfBirth) {
    return SectionStatus.COMPLETED;
  }
  if (resp?.firstName || resp?.lastName || resp?.dateOfBirth || resp?.placeOfBirth) {
    return SectionStatus.IN_PROGRESS;
  }
  return status;
};

export const getConsentToApplicationStatus = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  let status = SectionStatus.TO_DO;
  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (respondent?.value.user?.idamId === userIdamId) {
      const consent = respondent?.value?.response?.consent;
      if (consent?.consentToTheApplication && consent?.applicationReceivedDate && consent?.permissionFromCourt) {
        status = SectionStatus.COMPLETED;
      } else if (consent?.consentToTheApplication || consent?.applicationReceivedDate || consent?.permissionFromCourt) {
        status = SectionStatus.IN_PROGRESS;
      }
    }
  });
  return status;
};

export const getMiamStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.miamStart && userCase?.miamWillingness) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.miamStart || userCase?.miamWillingness) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getCheckAllegationOfHarmStatus = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  let status = SectionStatus.DOWNLOAD;
  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (
      respondent?.value.user?.idamId === userIdamId &&
      respondent?.value?.response?.citizenFlags?.isAllegationOfHarmViewed === YesOrNo.YES
    ) {
      status = SectionStatus.VIEW;
    }
  });
  return status;
};

export const getInternationalFactorsStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (
    ((userCase?.start === YesOrNo.YES && userCase?.iFactorsStartProvideDetails) || userCase?.start === YesOrNo.NO) &&
    ((userCase?.parents === YesOrNo.YES && userCase?.iFactorsParentsProvideDetails) ||
      userCase?.parents === YesOrNo.NO) &&
    ((userCase?.jurisdiction === YesOrNo.YES && userCase?.iFactorsJurisdictionProvideDetails) ||
      userCase?.jurisdiction === YesOrNo.NO) &&
    ((userCase?.request === YesOrNo.YES && userCase?.iFactorsRequestProvideDetails) || userCase?.request === YesOrNo.NO)
  ) {
    return SectionStatus.COMPLETED;
  }

  if (userCase?.start || userCase?.parents || userCase?.request || userCase?.jurisdiction) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getViewAllOrdersFromTheCourt = (userCase: CaseWithId): SectionStatus => {
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    return SectionStatus.READY_TO_VIEW;
  }
  return SectionStatus.NOT_AVAILABLE_YET;
};

export const getViewAllOrdersFromTheCourtAllDocuments = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};

export const getRespondentResponseToRequestForChildArrangements = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};

export const getRespondentAllegationsOfHarmAndViolence = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};

export const getViewAllDocuments = (): SectionStatus => {
  return SectionStatus.READY_TO_VIEW;
};

export const getCurrentOrOtherProceedingsStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (
    userCase?.proceedingsStart &&
    userCase?.proceedingsStartOrder &&
    userCase?.emergencyOrderOptions &&
    userCase?.supervisionOrderOption &&
    userCase?.careOrderOptions &&
    userCase?.childAbductionOrderOption &&
    userCase?.caOrderOption &&
    userCase?.financialOrderOption &&
    userCase?.nonmolestationOrderOption &&
    userCase?.occupationalOrderOptions &&
    userCase?.marraigeOrderOptions &&
    userCase?.restrainingOrderOptions &&
    userCase?.injuctiveOrderOptions &&
    userCase?.underTakingOrderOptions
  ) {
    return SectionStatus.COMPLETED;
  }
  if (
    userCase?.proceedingsStart ||
    userCase?.proceedingsStartOrder ||
    userCase?.emergencyOrderOptions ||
    userCase?.supervisionOrderOption ||
    userCase?.careOrderOptions ||
    userCase?.childAbductionOrderOption ||
    userCase?.caOrderOption ||
    userCase?.financialOrderOption ||
    userCase?.nonmolestationOrderOption ||
    userCase?.occupationalOrderOptions ||
    userCase?.marraigeOrderOptions ||
    userCase?.restrainingOrderOptions ||
    userCase?.injuctiveOrderOptions ||
    userCase?.underTakingOrderOptions
  ) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};
export const getYourSafetyStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.safetyConcerns) {
    return SectionStatus.COMPLETED;
  }
  return SectionStatus.TO_DO;
};
