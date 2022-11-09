import { CaseWithId } from '../../../app/case/case';
import { Respondent, SectionStatus, YesOrNo } from '../../../app/case/definition';

export const getLegalRepresentationStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.legalRepresentation) {
    return SectionStatus.COMPLETED;
  }
  return SectionStatus.TO_DO;
};

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

export const getMiamStatus = (userCase: Partial<CaseWithId> | undefined, userIdamId: string): SectionStatus => {
  let status = SectionStatus.TO_DO;

  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (respondent?.value.user?.idamId === userIdamId) {
      const miam = respondent?.value?.response?.miam;
      if (miam?.attendedMiam || miam?.willingToAttendMiam || miam?.reasonNotAttendingMiam) {
        status = SectionStatus.IN_PROGRESS;
      }

      if (
        miam?.attendedMiam === YesOrNo.YES ||
        (miam?.attendedMiam === YesOrNo.NO && miam?.willingToAttendMiam === YesOrNo.YES) ||
        (miam?.attendedMiam === YesOrNo.NO &&
          miam?.willingToAttendMiam === YesOrNo.NO &&
          miam?.reasonNotAttendingMiam !== '')
      ) {
        status = SectionStatus.COMPLETED;
      }
    }
  });

  return status;
};

export const getInternationalFactorsStatus = (
  userCase: Partial<CaseWithId> | undefined,
  userIdamId: string
): SectionStatus => {
  let statusFlag = SectionStatus.TO_DO;

  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (respondent?.value.user?.idamId === userIdamId) {
      const internationalElements = respondent?.value?.response?.citizenInternationalElements;
      if (
        internationalElements?.childrenLiveOutsideOfEnWl ||
        internationalElements?.childrenLiveOutsideOfEnWlDetails ||
        internationalElements?.parentsAnyOneLiveOutsideEnWl ||
        internationalElements?.parentsAnyOneLiveOutsideEnWlDetails ||
        internationalElements?.anotherPersonOrderOutsideEnWl ||
        internationalElements?.anotherPersonOrderOutsideEnWlDetails ||
        internationalElements?.anotherCountryAskedInformation ||
        internationalElements?.anotherCountryAskedInformationDetaails
      ) {
        statusFlag = SectionStatus.IN_PROGRESS;
      }

      let flagStart = false;
      let flagParents = false;
      let flagJurisdication = false;
      let flagRequest = false;

      if (internationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.NO) {
        flagStart = true;
      }
      if (internationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.NO) {
        flagParents = true;
      }
      if (internationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.NO) {
        flagJurisdication = true;
      }
      if (internationalElements?.anotherCountryAskedInformation === YesOrNo.NO) {
        flagRequest = true;
      }

      if (internationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.YES) {
        if (internationalElements?.childrenLiveOutsideOfEnWlDetails) {
          flagStart = true;
        }
      }
      if (internationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.YES) {
        if (internationalElements?.parentsAnyOneLiveOutsideEnWlDetails) {
          flagParents = true;
        }
      }
      if (internationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.YES) {
        if (internationalElements?.anotherPersonOrderOutsideEnWlDetails) {
          flagJurisdication = true;
        }
      }
      if (internationalElements?.anotherCountryAskedInformation === YesOrNo.YES) {
        if (internationalElements?.anotherCountryAskedInformationDetaails) {
          flagRequest = true;
        }
      }

      if (flagStart && flagParents && flagJurisdication && flagRequest) {
        statusFlag = SectionStatus.COMPLETED;
      }
    }
  });

  return statusFlag;
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
    userCase?.supervisionOrderOption ||
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

export const getAllegationOfHarmStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase.yourchildconcernsstart === 'No' || userCase.yourchildconcernsstart === 'Yes') {
    return SectionStatus.COMPLETED;
  }
  // if(userCase.cameoutofallegationsharmwithNo){
  //   return SectionStatus.COMPLETED;
  // }
  return SectionStatus.NOT_AVAILABLE_YET;
};

// export const setVarandGetNextStepofAllegationharm = (userCase: Partial<CaseWithId>) : PageLink => {
//   userCase.cameoutofallegationsharmwithNo = true;
//   return RESPONDENT_TASK_LIST_URL;
// }