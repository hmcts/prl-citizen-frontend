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
  if (
    keepDetailsPrivate?.confidentiality === 'Yes' &&
    keepDetailsPrivate?.otherPeopleKnowYourContactDetails &&
    keepDetailsPrivate?.confidentialityList.length >= 1
  ) {
    status = SectionStatus.COMPLETED;
  } else if (
    keepDetailsPrivate?.confidentiality === 'Yes' &&
    keepDetailsPrivate?.otherPeopleKnowYourContactDetails &&
    keepDetailsPrivate?.confidentialityList.length === 0
  ) {
    status = SectionStatus.IN_PROGRESS;
  } else if (keepDetailsPrivate?.confidentiality || keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = SectionStatus.COMPLETED;
  }
  return status;
};

export const getYourApplication = (): SectionStatus => {
  return SectionStatus.DOWNLOAD;
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

export const getViewAllHearingsFromTheCourt = (userCase: CaseWithId): SectionStatus => {
  if (userCase && userCase.hearingCollection && userCase.hearingCollection.length > 0) {
    return SectionStatus.READY_TO_VIEW;
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
  let flagChild = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flagChild = true;
  }
  return flagChild;
};

export const getRespondentAllegationsOfHarmAndViolence = (userCase: CaseWithId): boolean => {
  let flagHarmViolence = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flagHarmViolence = true;
  }
  return flagHarmViolence;
};

export const getViewAllDocuments = (): SectionStatus => {
  return SectionStatus.READY_TO_VIEW;
};

export const getUploadDocuments = (): SectionStatus => {
  return SectionStatus.TO_DO;
};

export const getCurrentOrOtherProceedingsStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.proceedingsStart === YesOrNo.NO && userCase?.proceedingsStartOrder === YesOrNo.NO) {
    return SectionStatus.COMPLETED;
  }

  if (userCase?.proceedingsStart === YesOrNo.YES && userCase?.proceedingsStartOrder === YesOrNo.YES) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.proceedingsStart || userCase?.proceedingsStartOrder) {
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

export const getFinalApplicationStatus = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  let result = SectionStatus.READY_TO_VIEW;

  if (!userCase?.finalDocument?.document_binary_url) {
    return SectionStatus.NOT_AVAILABLE_YET;
  }

  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (
      respondent?.value.user.idamId === userIdamId &&
      respondent?.value?.response?.citizenFlags?.isApplicationViewed === YesOrNo.YES
    ) {
      result = SectionStatus.VIEW;
    }
  });

  return result;
};

export const getCheckAllegationOfHarmStatus = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  let status = SectionStatus.DOWNLOAD;

  if (!userCase?.c1ADocument?.document_binary_url) {
    return SectionStatus.NOT_AVAILABLE_YET;
  }

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

export const getRespondentSupportYourNeedsDetails = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (
    userCase?.attendingToCourt &&
    userCase?.languageRequirements &&
    userCase?.safetyArrangements &&
    userCase?.reasonableAdjustments &&
    userCase?.docsSupport &&
    userCase?.helpCommunication &&
    userCase?.courtHearing &&
    userCase?.courtComfort &&
    userCase?.travellingToCourt
  ) {
    return SectionStatus.COMPLETED;
  }
  if (
    userCase?.attendingToCourt ||
    userCase?.hearingDetails ||
    userCase?.languageRequirements ||
    userCase?.languageDetails ||
    userCase?.safetyArrangements ||
    userCase?.safetyArrangementsDetails ||
    userCase?.reasonableAdjustments ||
    userCase?.docsSupport ||
    userCase?.docsDetails ||
    userCase?.largePrintDetails ||
    userCase?.otherDetails ||
    userCase?.helpCommunication ||
    userCase?.signLanguageDetails ||
    userCase?.describeOtherNeed ||
    userCase?.courtHearing ||
    userCase?.supportWorkerDetails ||
    userCase?.familyProviderDetails ||
    userCase?.therapyDetails ||
    userCase?.communicationSupportOther ||
    userCase?.courtComfort ||
    userCase?.lightingProvideDetails ||
    userCase?.otherProvideDetails ||
    userCase?.travellingToCourt ||
    userCase?.parkingDetails ||
    userCase?.differentChairDetails ||
    userCase?.travellingOtherDetails
  ) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getRespondentPartyDetailsCa = (userCase: Partial<CaseWithId>, userId: string): Respondent | undefined => {
  for (let i = 0; i < userCase.respondents!.length; i++) {
    if (userCase.respondents![i].value.user.idamId === userId) {
      return userCase.respondents![i];
    }
  }
  return undefined;
};

export const getResponseStatus = (userCase: Partial<CaseWithId> | undefined, userId: string): SectionStatus => {
  const respondent1 = userCase?.respondents?.find(respondent => {
    if (respondent.value.user.idamId === userId) {
      return respondent;
    }
  });
  if (
    respondent1?.value.response.citizenInternationalElements &&
    respondent1?.value.response.consent &&
    respondent1?.value.response.currentOrPreviousProceedings &&
    respondent1?.value.response.keepDetailsPrivate &&
    respondent1?.value.response.miam &&
    respondent1?.value.response.legalRepresentation &&
    respondent1?.value.response.safetyConcerns &&
    respondent1?.value.response.supportYouNeed
  ) {
    return SectionStatus.COMPLETED;
  }
  if (
    respondent1?.value.response.citizenInternationalElements ||
    respondent1?.value.response.consent ||
    respondent1?.value.response.currentOrPreviousProceedings ||
    respondent1?.value.response.keepDetailsPrivate ||
    respondent1?.value.response.miam ||
    respondent1?.value.response.legalRepresentation ||
    respondent1?.value.response.safetyConcerns ||
    respondent1?.value.response.supportYouNeed
  ) {
    return SectionStatus.IN_PROGRESS;
  }

  return SectionStatus.TO_DO;
};

export const isApplicationResponded = (userCase: Partial<CaseWithId>, userId: string): boolean => {
  if (userCase?.citizenResponseC7DocumentList?.length) {
    return !!userCase.respondents?.find(respondent => {
      if (respondent.value.user.idamId === userId) {
        return userCase.citizenResponseC7DocumentList!.find(
          responseDocument => responseDocument.value.createdBy === respondent.id
        );
      }
    });
  }

  return false;
};
