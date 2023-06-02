import { CaseWithId } from '../../../../app/case/case';
import { PartyType, ReasonableAdjustments } from '../../../../app/case/definition';
import { LANGUAGE_INTERPRETER, NO_HEARINGS } from '../../../../steps/constants';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import {
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_TRAVELLING_TO_COURT,
  COMMUNICATION_HELP,
  COURT_HEARING_COMFORT,
  COURT_HEARING_SUPPORT,
  DOCUMENTS_SUPPORT,
  TRAVELLING_TO_COURT,
} from '../../../../steps/urls';

export function filterSelectedUrls(userCase: CaseWithId, urls: object, userId: string): void {
  reasonableAdjustment(userCase, urls, userId);

  if (!userCase?.attendingToCourt?.includes(NO_HEARINGS)) {
    userCase.hearingDetails = '';
  }

  if (!userCase?.languageRequirements?.includes(LANGUAGE_INTERPRETER)) {
    userCase.languageDetails = '';
  }
  if (!userCase?.safetyArrangements?.includes('other')) {
    userCase.safetyArrangementsDetails = '';
  }
  //resonable adjustment
  processReasonableAdjustmentData(userCase);
}
function processReasonableAdjustmentData(userCase: Partial<CaseWithId>) {
  if (!userCase?.reasonableAdjustments?.includes('docsformat')) {
    delete userCase.docsSupport;
  }
  if (!userCase?.reasonableAdjustments?.includes('commhelp')) {
    delete userCase.helpCommunication;
  }
  if (!userCase?.reasonableAdjustments?.includes('hearingsupport')) {
    delete userCase.courtHearing;
  }
  if (!userCase?.reasonableAdjustments?.includes('hearingcomfort')) {
    delete userCase.courtComfort;
  }
  if (!userCase?.reasonableAdjustments?.includes('travellinghelp')) {
    delete userCase.travellingToCourt;
  }
  //docSupport
  processDocSupportData(userCase);
  //comunication help
  processCommunicationHelpData(userCase);
  //Hearing Support
  processHearingSupportData(userCase);
  //court comfort
  processCourtComfortData(userCase);
  //travel help
  processTravelHelpData(userCase);
}
function processCourtComfortData(userCase: Partial<CaseWithId>) {
  if (!userCase?.courtComfort?.includes('appropriatelighting')) {
    userCase.lightingProvideDetails = '';
  }
  if (!userCase?.courtComfort?.includes('other')) {
    userCase.otherProvideDetails = '';
  }
}

function processTravelHelpData(userCase: Partial<CaseWithId>) {
  if (!userCase?.travellingToCourt?.includes('parkingspace')) {
    userCase.parkingDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes('differentchair')) {
    userCase.differentChairDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes('other')) {
    userCase.travellingOtherDetails = '';
  }
}

function processHearingSupportData(userCase: Partial<CaseWithId>) {
  if (!userCase?.courtHearing?.includes('supportworker')) {
    userCase.supportWorkerDetails = '';
  }
  if (!userCase?.courtHearing?.includes('familymember')) {
    userCase.familyProviderDetails = '';
  }
  if (!userCase?.courtHearing?.includes('animal')) {
    userCase.therapyDetails = '';
  }
  if (!userCase?.courtHearing?.includes('other')) {
    userCase.communicationSupportOther = '';
  }
}
function processCommunicationHelpData(userCase: Partial<CaseWithId>) {
  if (!userCase?.helpCommunication?.includes('signlanguage')) {
    userCase.signLanguageDetails = '';
  }
  if (!userCase?.helpCommunication?.includes('other')) {
    userCase.describeOtherNeed = '';
  }
}
function processDocSupportData(userCase: Partial<CaseWithId>) {
  if (!userCase?.docsSupport?.includes('docsprint')) {
    userCase.docsDetails = '';
  }
  if (!userCase?.docsSupport?.includes('largeprintdocs')) {
    userCase.largePrintDetails = '';
  }
  if (!userCase?.docsSupport?.includes('other')) {
    userCase.otherDetails = '';
  }
}

function reasonableAdjustment(userCase: CaseWithId, urls: object, userId: string) {
  const partyType = getCasePartyType(userCase, userId);
  if (partyType === PartyType.RESPONDENT) {
    respondentUrls(urls, userCase);
  } else if (partyType === PartyType.APPLICANT) {
    applicantUrls(urls, userCase);
  }
}

function respondentUrls(urls: object, userCase: CaseWithId) {
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, { docsSupport: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { docsDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { largePrintDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: CA_DA_DOCUMENTS_SUPPORT });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, { helpCommunication: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { signLanguageDetails: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { describeOtherNeed: CA_DA_COMMUNICATION_HELP });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, { courtHearing: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { supportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { familyProviderDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { therapyDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { communicationSupportOther: CA_DA_COURT_HEARING_SUPPORT });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_COMFORT)) {
    Object.assign(urls, { courtComfort: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { lightingProvideDetails: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { otherProvideDetails: CA_DA_COURT_HEARING_COMFORT });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.TRAVELLING_TO_COURT)) {
    Object.assign(urls, { travellingToCourt: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { parkingDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { differentChairDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { travellingOtherDetails: CA_DA_TRAVELLING_TO_COURT });
  }
}

function applicantUrls(urls: object, userCase: CaseWithId) {
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, { docsSupport: DOCUMENTS_SUPPORT });
    Object.assign(urls, { docsDetails: DOCUMENTS_SUPPORT });
    Object.assign(urls, { largePrintDetails: DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: DOCUMENTS_SUPPORT });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, { helpCommunication: COMMUNICATION_HELP });
    Object.assign(urls, { signLanguageDetails: COMMUNICATION_HELP });
    Object.assign(urls, { describeOtherNeed: COMMUNICATION_HELP });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, { courtHearing: COURT_HEARING_SUPPORT });
    Object.assign(urls, { supportWorkerDetails: COURT_HEARING_SUPPORT });
    Object.assign(urls, { familyProviderDetails: COURT_HEARING_SUPPORT });
    Object.assign(urls, { therapyDetails: COURT_HEARING_SUPPORT });
    Object.assign(urls, { communicationSupportOther: COURT_HEARING_SUPPORT });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_COMFORT)) {
    Object.assign(urls, { courtComfort: COURT_HEARING_COMFORT });
    Object.assign(urls, { lightingProvideDetails: COURT_HEARING_COMFORT });
    Object.assign(urls, { otherProvideDetails: COURT_HEARING_COMFORT });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.TRAVELLING_TO_COURT)) {
    Object.assign(urls, { travellingToCourt: TRAVELLING_TO_COURT });
    Object.assign(urls, { parkingDetails: TRAVELLING_TO_COURT });
    Object.assign(urls, { differentChairDetails: TRAVELLING_TO_COURT });
    Object.assign(urls, { travellingOtherDetails: TRAVELLING_TO_COURT });
  }
}
