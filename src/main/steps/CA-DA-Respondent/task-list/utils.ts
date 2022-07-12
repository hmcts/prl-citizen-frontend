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
  return SectionStatus.TO_DO;
};

export const getSupportYourNeedsDetails = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.respondentHelpCommunication && userCase?.respondentDescribeOtherNeed && userCase?.respondentCourtComfort 
    && userCase?.respondentOtherProvideDetails && userCase?.respondentCourtHearing && userCase?.respondentCommSupportOther 
    && userCase?.respondentDocsSupport && userCase?.respondentOtherDetails && userCase?.respondentLangRequirements 
    && userCase?.respondentLangDetails && userCase?.respondentReasonableAdjustments && userCase?.respondentSafetyArrangements
    && userCase?.respondentSafetyArrangementsDetails && userCase?.respondentTravellingToCourt && userCase?.respondentTravellingOtherDetails 
    && userCase?.respondentUnableCourtProceedings && userCase?.respondentCourtProceedingDetails && userCase?.startAlternative 
    && userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.respondentHelpCommunication || userCase?.respondentDescribeOtherNeed || userCase?.respondentCourtComfort 
    || userCase?.respondentOtherProvideDetails || userCase?.respondentCourtHearing || userCase?.respondentCommSupportOther 
    || userCase?.respondentDocsSupport || userCase?.respondentOtherDetails || userCase?.respondentLangRequirements 
    || userCase?.respondentLangDetails || userCase?.respondentReasonableAdjustments || userCase?.respondentSafetyArrangements
    || userCase?.respondentSafetyArrangementsDetails || userCase?.respondentTravellingToCourt || userCase?.respondentTravellingOtherDetails 
    || userCase?.respondentUnableCourtProceedings || userCase?.respondentCourtProceedingDetails || userCase?.startAlternative 
    || userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};