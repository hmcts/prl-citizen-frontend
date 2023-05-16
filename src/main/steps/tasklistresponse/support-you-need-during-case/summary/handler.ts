import { CaseWithId } from '../../../../app/case/case';
import { ReasonableAdjustments } from '../../../../app/case/definition';
import {
  ANIMAL,
  APPROPRIATE_LIGHTING,
  COMM_HELP,
  DIFFERENT_CHAIR,
  DOCS_FORMAT,
  DOCS_PRINT,
  FAMILY_MEMBER,
  HEARING_COMFORT,
  HEARING_SUPPORT,
  LANGUAGE_INTERPRETER,
  LARGE_PRINT_DOCS,
  NO_HEARINGS,
  OTHER,
  PARKING_SPACE,
  SIGN_LANGUAGE,
  SUPPORT_WORKER,
  TRAVELLING_HELP,
} from '../../../../steps/constants';
import {
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_TRAVELLING_TO_COURT,
} from '../../../../steps/urls';

import { urls } from './content';

export function filterSelectedUrls(userCase: Partial<CaseWithId>): void {
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, { docsSupport: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { docsDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { largePrintDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: CA_DA_DOCUMENTS_SUPPORT });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, { helpCommunication: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { describeSignLanguageDetails: CA_DA_COMMUNICATION_HELP });
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

  if (!userCase?.attendingToCourt?.includes(NO_HEARINGS)) {
    userCase.hearingDetails = '';
  }

  if (!userCase?.languageRequirements?.includes(LANGUAGE_INTERPRETER)) {
    userCase.languageDetails = '';
  }
  if (!userCase?.safetyArrangements?.includes(OTHER)) {
    userCase.safetyArrangementsDetails = '';
  }
  //resonable adjustment
  if (!userCase?.reasonableAdjustments?.includes(DOCS_FORMAT)) {
    delete userCase.docsSupport;
  }
  if (!userCase?.reasonableAdjustments?.includes(COMM_HELP)) {
    delete userCase.helpCommunication;
  }
  if (!userCase?.reasonableAdjustments?.includes(HEARING_SUPPORT)) {
    delete userCase.courtHearing;
  }
  if (!userCase?.reasonableAdjustments?.includes(HEARING_COMFORT)) {
    delete userCase.courtComfort;
  }
  if (!userCase?.reasonableAdjustments?.includes(TRAVELLING_HELP)) {
    delete userCase.travellingToCourt;
  }
  //docSupport
  if (!userCase?.docsSupport?.includes(DOCS_PRINT)) {
    userCase.docsDetails = '';
  }
  if (!userCase?.docsSupport?.includes(LARGE_PRINT_DOCS)) {
    userCase.largePrintDetails = '';
  }
  if (!userCase?.docsSupport?.includes(OTHER)) {
    userCase.otherDetails = '';
  }
  //comunication help
  if (!userCase?.helpCommunication?.includes(SIGN_LANGUAGE)) {
    userCase.describeSignLanguageDetails = '';
  }
  if (!userCase?.helpCommunication?.includes(OTHER)) {
    userCase.describeOtherNeed = '';
  }
  //Hearing Support
  if (!userCase?.courtHearing?.includes(SUPPORT_WORKER)) {
    userCase.supportWorkerDetails = '';
  }
  if (!userCase?.courtHearing?.includes(FAMILY_MEMBER)) {
    userCase.familyProviderDetails = '';
  }
  if (!userCase?.courtHearing?.includes(ANIMAL)) {
    userCase.therapyDetails = '';
  }
  if (!userCase?.courtHearing?.includes(OTHER)) {
    userCase.communicationSupportOther = '';
  }
  //court comfort
  if (!userCase?.courtComfort?.includes(APPROPRIATE_LIGHTING)) {
    userCase.lightingProvideDetails = '';
  }
  if (!userCase?.courtComfort?.includes(OTHER)) {
    userCase.otherProvideDetails = '';
  }
  //travel help
  if (!userCase?.travellingToCourt?.includes(PARKING_SPACE)) {
    userCase.parkingDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes(DIFFERENT_CHAIR)) {
    userCase.differentChairDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes(OTHER)) {
    userCase.travellingOtherDetails = '';
  }
}
