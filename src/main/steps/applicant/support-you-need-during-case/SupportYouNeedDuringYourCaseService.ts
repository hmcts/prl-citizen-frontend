import { Applicant, Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const setSupportDetailsApplicant = (applicant: Applicant, req: AppRequest): Respondent => {
  applicant.value.response = {
    supportYouNeed: {
      communicationSupportOther: req.session.userCase?.communicationSupportOther,
      courtComfort: req.session.userCase?.courtComfort,
      courtHearing: req.session.userCase?.courtHearing,
      courtProceedingProvideDetails: req.session.userCase?.courtProceedingProvideDetails,
      describeOtherNeed: req.session.userCase?.describeOtherNeed,
      docsSupport: req.session.userCase.docsSupport,
      helpCommunication: req.session.userCase?.helpCommunication,
      languageDetails: req.session.userCase?.languageDetails,
      otherDetails: req.session.userCase.otherDetails,
      otherProvideDetails: req.session.userCase?.otherProvideDetails,
      unableForCourtProceedings: req.session.userCase?.unableForCourtProceedings,
      reasonableAdjustments: req.session.userCase.reasonableAdjustments,
      languageRequirements: req.session.userCase.languageRequirements,
      safetyArrangements: req.session.userCase.safetyArrangements,
      safetyArrangementsDetails: req.session.userCase.safetyArrangementsDetails,
      travellingOtherDetails: req.session.userCase.travellingOtherDetails,
      travellingToCourt: req.session.userCase.travellingToCourt,
    },
  };
  return applicant;
};

export const setSupportDetailsRespondent = (respondent: Respondent, req: AppRequest): Respondent => {
  respondent.value.response = {
    supportYouNeed: {
      docsSupport: req.session.userCase.respondentDocsSupport,
      respondentDocsDetails: req.session.userCase.respondentDocsDetails,
      respondentLargePrintDetails: req.session.userCase.respondentLargePrintDetails,
      otherDetails: req.session.userCase.respondentOtherDetails,
      languageDetails: req.session.userCase?.respondentLangDetails,
      languageRequirements: req.session.userCase.respondentLangRequirements,
      reasonableAdjustments: req.session.userCase.respondentReasonableAdjustments,
      travellingOtherDetails: req.session.userCase.respondentTravellingOtherDetails,
      travellingToCourt: req.session.userCase.respondentTravellingToCourt,
      respondentDifferentChairDetails: req.session.userCase.respondentDifferentChairDetails,
      respondentParkingDetails: req.session.userCase.respondentParkingDetails,
      respondentTherapyDetails: req.session.userCase.respondentTherapyDetails,
      attendingToCourt: req.session.userCase.respondentAttendingToCourt,
      hearingDetails: req.session.userCase.respondentHearingDetails,
      helpCommunication: req.session.userCase?.respondentHelpCommunication,
      communicationSupportOther: req.session.userCase?.respondentCommSupportOther,
      respondentSignLanguageDetails: req.session.userCase.respondentSignLanguageDetails,
      courtComfort: req.session.userCase?.respondentCourtComfort,
      otherProvideDetails: req.session.userCase?.respondentOtherProvideDetails,
      respondentLightingDetails: req.session.userCase?.respondentLightingDetails,
      courtHearing: req.session.userCase?.respondentCourtHearing,
      respondentSupportWorkerDetails: req.session.userCase?.respondentSupportWorkerDetails,
      respondentFamilyDetails: req.session.userCase?.respondentFamilyDetails,
      describeOtherNeed: req.session.userCase?.respondentDescribeOtherNeed,
      safetyArrangements: req.session.userCase.respondentSpecialArrangements,
      safetyArrangementsDetails: req.session.userCase.respondentSpecialArrangementsDetails,
    },
  };
  return respondent;
};

export const getSupportDetails = (respondent: Respondent | Applicant, req: AppRequest): AppRequest => {
  req.session.userCase.communicationSupportOther = respondent.value.response.supportYouNeed?.communicationSupportOther;
  req.session.userCase.courtComfort = respondent.value.response.supportYouNeed?.courtComfort;
  req.session.userCase.courtHearing = respondent.value.response.supportYouNeed?.courtHearing;
  req.session.userCase.courtProceedingProvideDetails =
    respondent.value.response.supportYouNeed?.courtProceedingProvideDetails;
  req.session.userCase.describeOtherNeed = respondent.value.response.supportYouNeed?.describeOtherNeed;
  req.session.userCase.docsSupport = respondent.value.response.supportYouNeed?.docsSupport;
  req.session.userCase.helpCommunication = respondent.value.response.supportYouNeed?.helpCommunication;
  req.session.userCase.languageDetails = respondent.value.response.supportYouNeed?.languageDetails;
  req.session.userCase.otherDetails = respondent.value.response.supportYouNeed?.otherDetails;
  req.session.userCase.otherProvideDetails = respondent.value.response.supportYouNeed?.otherProvideDetails;
  req.session.userCase.unableForCourtProceedings = respondent.value.response.supportYouNeed?.unableForCourtProceedings;
  req.session.userCase.reasonableAdjustments = respondent.value.response.supportYouNeed?.reasonableAdjustments;
  req.session.userCase.languageRequirements = respondent.value.response.supportYouNeed?.languageRequirements;
  req.session.userCase.safetyArrangements = respondent.value.response.supportYouNeed?.safetyArrangements;
  req.session.userCase.safetyArrangementsDetails = respondent.value.response.supportYouNeed?.safetyArrangementsDetails;
  req.session.userCase.travellingOtherDetails = respondent.value.response.supportYouNeed?.travellingOtherDetails;
  req.session.userCase.travellingToCourt = respondent.value.response.supportYouNeed?.travellingToCourt;

  return req;
};
