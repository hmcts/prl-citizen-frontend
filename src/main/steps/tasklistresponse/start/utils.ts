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

  if (resp.firstName && 
    resp.lastName && 
    resp.placeOfBirth && 
    resp.address.AddressLine1 &&
    resp.phoneNumber && 
    resp.email && 
    resp.dateOfBirth) {
    return SectionStatus.COMPLETED;
  }
  if (resp.firstName || 
    resp.lastName || 
    resp.placeOfBirth || 
    resp.phoneNumber || 
    resp.dateOfBirth || 
    resp.address.AddressLine1 ||
    resp.email) {
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
      statusFlag =
        internationalElements?.childrenLiveOutsideOfEnWl ||
        internationalElements?.childrenLiveOutsideOfEnWlDetails ||
        internationalElements?.parentsAnyOneLiveOutsideEnWl ||
        internationalElements?.parentsAnyOneLiveOutsideEnWlDetails ||
        internationalElements?.anotherPersonOrderOutsideEnWl ||
        internationalElements?.anotherPersonOrderOutsideEnWlDetails ||
        internationalElements?.anotherCountryAskedInformation ||
        internationalElements?.anotherCountryAskedInformationDetaails
          ? SectionStatus.IN_PROGRESS
          : statusFlag;

      let flagStart = false;
      let flagParents = false;
      let flagJurisdication = false;
      let flagRequest = false;
      flagStart = !!(
        internationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.NO ||
        (internationalElements?.childrenLiveOutsideOfEnWl === YesOrNo.YES &&
          internationalElements?.childrenLiveOutsideOfEnWlDetails)
      );
      flagParents = !!(
        internationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.NO ||
        (internationalElements?.parentsAnyOneLiveOutsideEnWl === YesOrNo.YES &&
          internationalElements?.parentsAnyOneLiveOutsideEnWlDetails)
      );
      flagJurisdication = !!(
        internationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.NO ||
        (internationalElements?.anotherPersonOrderOutsideEnWl === YesOrNo.YES &&
          internationalElements?.anotherPersonOrderOutsideEnWlDetails)
      );
      flagRequest = !!(
        internationalElements?.anotherCountryAskedInformation === YesOrNo.NO ||
        (internationalElements?.anotherCountryAskedInformation === YesOrNo.YES &&
          internationalElements?.anotherCountryAskedInformationDetaails)
      );
      statusFlag = flagStart && flagParents && flagJurisdication && flagRequest ? SectionStatus.COMPLETED : statusFlag;
    }
  });

  return statusFlag;
};

export const getCurrentOrOtherProceedingsStatus = (userCase: Partial<CaseWithId> | undefined): SectionStatus => {
  if (userCase?.proceedingsStart && userCase?.proceedingsStartOrder) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.proceedingsStart?.match('No') && userCase?.proceedingsStartOrder?.match('No')) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.proceedingsStart?.match('Yes') && userCase?.proceedingsStartOrder?.match('Yes')) {
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

export const getAllegationOfHarmStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase.PRL_c1A_haveSafetyConcerns === YesOrNo.NO || userCase.PRL_c1A_haveSafetyConcerns === YesOrNo.YES) {
    return SectionStatus.COMPLETED;
  }
  return SectionStatus.TO_DO;
};
