import { CaseWithId } from '../../../app/case/case';
import { SectionStatus } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getSupportYourNeedsDetails = (userCase: CaseWithId): SectionStatus => {
  if (
    userCase?.respondentAttendingToCourt &&
    userCase?.respondentLangRequirements &&
    userCase?.respondentSpecialArrangements &&
    userCase?.respondentReasonableAdjustments &&
    userCase?.respondentDocsSupport &&
    userCase?.respondentHelpCommunication &&
    userCase?.respondentCourtHearing &&
    userCase?.respondentCourtComfort &&
    userCase?.respondentTravellingToCourt
  ) {
    return SectionStatus.COMPLETED;
  }
  if (
    userCase?.respondentAttendingToCourt ||
    userCase?.noHearingDetails ||
    userCase?.respondentLangRequirements ||
    userCase?.respondentLangDetails ||
    userCase?.respondentSpecialArrangements ||
    userCase?.respondentSpecialArrangementsDetails ||
    userCase?.respondentReasonableAdjustments ||
    userCase?.respondentDocsSupport ||
    userCase?.respondentDocsDetails ||
    userCase?.respondentLargePrintDetails ||
    userCase?.respondentOtherDetails ||
    userCase?.respondentHelpCommunication ||
    userCase?.respondentSignLanguageDetails ||
    userCase?.respondentDescribeOtherNeed ||
    userCase?.respondentCourtHearing ||
    userCase?.respondentSupportWorkerDetails ||
    userCase?.respondentFamilyDetails ||
    userCase?.respondentTherapyDetails ||
    userCase?.respondentCommSupportOther ||
    userCase?.respondentCourtComfort ||
    userCase?.respondentLightingDetails ||
    userCase?.respondentOtherProvideDetails ||
    userCase?.respondentTravellingToCourt ||
    userCase?.respondentParkingDetails ||
    userCase?.respondentDifferentChairDetails ||
    userCase?.respondentTravellingOtherDetails
  ) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};
