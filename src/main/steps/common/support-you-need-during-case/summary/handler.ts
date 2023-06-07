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

export const filterSelectedUrls = (userCase: CaseWithId, urls: object, userId: string): void => {
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
};

const processReasonableAdjustmentData = (userCase: Partial<CaseWithId>) => {
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
};

const processCourtComfortData = (userCase: Partial<CaseWithId>) => {
  if (!userCase?.courtComfort?.includes('appropriatelighting')) {
    userCase.lightingProvideDetails = '';
  }
  if (!userCase?.courtComfort?.includes('other')) {
    userCase.otherProvideDetails = '';
  }
};

const processTravelHelpData = (userCase: Partial<CaseWithId>) => {
  if (!userCase?.travellingToCourt?.includes('parkingspace')) {
    userCase.parkingDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes('differentchair')) {
    userCase.differentChairDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes('other')) {
    userCase.travellingOtherDetails = '';
  }
};

const processHearingSupportData = (userCase: Partial<CaseWithId>) => {
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
};

const processCommunicationHelpData = (userCase: Partial<CaseWithId>) => {
  if (!userCase?.helpCommunication?.includes('signlanguage')) {
    userCase.signLanguageDetails = '';
  }
  if (!userCase?.helpCommunication?.includes('other')) {
    userCase.describeOtherNeed = '';
  }
};

const processDocSupportData = (userCase: Partial<CaseWithId>) => {
  if (!userCase?.docsSupport?.includes('docsprint')) {
    userCase.docsDetails = '';
  }
  if (!userCase?.docsSupport?.includes('largeprintdocs')) {
    userCase.largePrintDetails = '';
  }
  if (!userCase?.docsSupport?.includes('other')) {
    userCase.otherDetails = '';
  }
};

const reasonableAdjustment = (userCase: CaseWithId, urls: object, userId: string) => {
  const partyType = getCasePartyType(userCase, userId);

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, getDocumentSupportUrls(partyType));
  }
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, getCommunicationHelpUrls(partyType));
  }
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, getCourtHearingSupportUrls(partyType));
  }
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_COMFORT)) {
    Object.assign(urls, getCourtHearingComfortUrls(partyType));
  }
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.TRAVELLING_TO_COURT)) {
    Object.assign(urls, getTravellingToCourtUrls(partyType));
  }
};

const getDocumentSupportUrls = (partyType: PartyType): object => {
  return partyType === PartyType.RESPONDENT
    ? {
        docsSupport: CA_DA_DOCUMENTS_SUPPORT,
        docsDetails: CA_DA_DOCUMENTS_SUPPORT,
        largePrintDetails: CA_DA_DOCUMENTS_SUPPORT,
        otherDetails: CA_DA_DOCUMENTS_SUPPORT,
      }
    : {
        docsSupport: DOCUMENTS_SUPPORT,
        docsDetails: DOCUMENTS_SUPPORT,
        largePrintDetails: DOCUMENTS_SUPPORT,
        otherDetails: DOCUMENTS_SUPPORT,
      };
};

const getCommunicationHelpUrls = (partyType: PartyType): object => {
  return partyType === PartyType.RESPONDENT
    ? {
        helpCommunication: CA_DA_COMMUNICATION_HELP,
        signLanguageDetails: CA_DA_COMMUNICATION_HELP,
        describeOtherNeed: CA_DA_COMMUNICATION_HELP,
      }
    : {
        helpCommunication: COMMUNICATION_HELP,
        signLanguageDetails: COMMUNICATION_HELP,
        describeOtherNeed: COMMUNICATION_HELP,
      };
};

const getCourtHearingSupportUrls = (partyType: PartyType): object => {
  return partyType === PartyType.RESPONDENT
    ? {
        courtHearing: CA_DA_COURT_HEARING_SUPPORT,
        supportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT,
        familyProviderDetails: CA_DA_COURT_HEARING_SUPPORT,
        therapyDetails: CA_DA_COURT_HEARING_SUPPORT,
        communicationSupportOther: CA_DA_COURT_HEARING_SUPPORT,
      }
    : {
        courtHearing: COURT_HEARING_SUPPORT,
        supportWorkerDetails: COURT_HEARING_SUPPORT,
        familyProviderDetails: COURT_HEARING_SUPPORT,
        therapyDetails: COURT_HEARING_SUPPORT,
        communicationSupportOther: COURT_HEARING_SUPPORT,
      };
};

const getCourtHearingComfortUrls = (partyType: PartyType): object => {
  return partyType === PartyType.RESPONDENT
    ? {
        courtComfort: CA_DA_COURT_HEARING_COMFORT,
        lightingProvideDetails: CA_DA_COURT_HEARING_COMFORT,
        otherProvideDetails: CA_DA_COURT_HEARING_COMFORT,
      }
    : {
        courtComfort: COURT_HEARING_COMFORT,
        lightingProvideDetails: COURT_HEARING_COMFORT,
        otherProvideDetails: COURT_HEARING_COMFORT,
      };
};

const getTravellingToCourtUrls = (partyType: PartyType): object => {
  return partyType === PartyType.RESPONDENT
    ? {
        travellingToCourt: CA_DA_TRAVELLING_TO_COURT,
        parkingDetails: CA_DA_TRAVELLING_TO_COURT,
        differentChairDetails: CA_DA_TRAVELLING_TO_COURT,
        travellingOtherDetails: CA_DA_TRAVELLING_TO_COURT,
      }
    : {
        travellingToCourt: TRAVELLING_TO_COURT,
        parkingDetails: TRAVELLING_TO_COURT,
        differentChairDetails: TRAVELLING_TO_COURT,
        travellingOtherDetails: TRAVELLING_TO_COURT,
      };
};
