import { CaseWithId } from '../../../app/case/case';
import { Respondent, SectionStatus, YesOrNo } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getConfirmOrEditYourContactDetails = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.applicant1FullName && userCase?.applicant1DateOfBirth && userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.applicant1FullName || userCase?.applicant1DateOfBirth || userCase?.applicant1PlaceOfBirth) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getConsentToApplicationStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.doYouConsent && userCase?.applicationReceivedDate && userCase?.courtPermission) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.doYouConsent || userCase?.applicationReceivedDate || userCase?.courtPermission) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getMiamStatus = (userCase: Partial<CaseWithId> | undefined, userIdamId: string): SectionStatus => {
  let status = SectionStatus.TO_DO;

  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (respondent?.value.user?.idamId === userIdamId) {
      const miam = respondent?.value?.response?.miam;
      if (miam?.attendedMiam && miam?.willingToAttendMiam) {
        status = SectionStatus.COMPLETED;
      } else if (miam?.attendedMiam || miam?.willingToAttendMiam) {
        status = SectionStatus.IN_PROGRESS;
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
        ((internationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.YES &&
          internationalElements?.childrenLiveOutsideOfEnWlDetails) ||
          internationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.NO) &&
        ((internationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.YES &&
          internationalElements?.parentsAnyOneLiveOutsideEnWlDetails) ||
          internationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.NO) &&
        ((internationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.YES &&
          internationalElements?.anotherPersonOrderOutsideEnWlDetails) ||
          internationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.NO) &&
        ((internationalElements?.anotherCountryAskedInformation === YesOrNo.YES &&
          internationalElements?.anotherCountryAskedInformationDetaails) ||
          internationalElements?.anotherCountryAskedInformation === YesOrNo.NO)
      ) {
        statusFlag = SectionStatus.COMPLETED;
      }

      if (
        internationalElements?.childrenLiveOutsideOfEnWl ||
        internationalElements?.parentsAnyOneLiveOutsideEnWl ||
        internationalElements?.anotherPersonOrderOutsideEnWl ||
        internationalElements?.anotherCountryAskedInformation
      ) {
        statusFlag = SectionStatus.IN_PROGRESS;
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
