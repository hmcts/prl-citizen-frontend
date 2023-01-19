import { Applicant, Respondent, Response } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const setSupportDetails = (response: Response, req: AppRequest): Response => {
  response = {
    supportYouNeed: {
      attendingToCourt: req.session.userCase?.attendingToCourt,
      hearingDetails: req.session.userCase?.hearingDetails,

      helpCommunication: req.session.userCase?.helpCommunication,
      describeOtherNeed: req.session.userCase?.describeOtherNeed,
      signLanguageDetails: req.session.userCase?.describeSignLanguageDetails,

      courtComfort: req.session.userCase?.courtComfort,
      lightingDetails: req.session.userCase?.lightingProvideDetails,
      otherProvideDetails: req.session.userCase?.otherProvideDetails,

      courtHearing: req.session.userCase?.courtHearing,
      supportWorkerDetails: req.session.userCase?.supportWorkerDetails,
      therapyDetails: req.session.userCase.therapyDetails,
      familyProviderDetails: req.session.userCase?.familyProviderDetails,
      communicationSupportOther: req.session.userCase?.communicationSupportOther,

      docsSupport: req.session.userCase.docsSupport,
      docsDetails: req.session.userCase.docsDetails,
      largePrintDetails: req.session.userCase.largePrintDetails,
      otherDetails: req.session.userCase.otherDetails,

      languageRequirements: req.session.userCase.languageRequirements,
      languageDetails: req.session.userCase?.languageDetails,

      reasonableAdjustments: req.session.userCase.reasonableAdjustments,

      safetyArrangements: req.session.userCase.safetyArrangements,
      safetyArrangementsDetails: req.session.userCase.safetyArrangementsDetails,

      travellingToCourt: req.session.userCase.travellingToCourt,
      parkingDetails: req.session.userCase.parkingDetails,
      differentChairDetails: req.session.userCase.differentChairDetails,
      travellingOtherDetails: req.session.userCase.travellingOtherDetails,
    },
  };
  return response;
};

export const getSupportDetails = (respondent: Respondent | Applicant, req: AppRequest): AppRequest => {
  req.session.userCase.communicationSupportOther = respondent.value.response.supportYouNeed?.communicationSupportOther;
  req.session.userCase.courtComfort = respondent.value.response.supportYouNeed?.courtComfort;
  req.session.userCase.courtHearing = respondent.value.response.supportYouNeed?.courtHearing;
  req.session.userCase.describeOtherNeed = respondent.value.response.supportYouNeed?.describeOtherNeed;
  req.session.userCase.docsSupport = respondent.value.response.supportYouNeed?.docsSupport;
  req.session.userCase.helpCommunication = respondent.value.response.supportYouNeed?.helpCommunication;
  req.session.userCase.languageDetails = respondent.value.response.supportYouNeed?.languageDetails;
  req.session.userCase.otherDetails = respondent.value.response.supportYouNeed?.otherDetails;
  req.session.userCase.otherProvideDetails = respondent.value.response.supportYouNeed?.otherProvideDetails;
  req.session.userCase.reasonableAdjustments = respondent.value.response.supportYouNeed?.reasonableAdjustments;
  req.session.userCase.languageRequirements = respondent.value.response.supportYouNeed?.languageRequirements;
  req.session.userCase.safetyArrangements = respondent.value.response.supportYouNeed?.safetyArrangements;
  req.session.userCase.safetyArrangementsDetails = respondent.value.response.supportYouNeed?.safetyArrangementsDetails;
  req.session.userCase.travellingOtherDetails = respondent.value.response.supportYouNeed?.travellingOtherDetails;
  req.session.userCase.travellingToCourt = respondent.value.response.supportYouNeed?.travellingToCourt;

  return req;
};
