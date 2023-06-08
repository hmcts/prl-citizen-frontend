/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../app/case/case';
import { PartyDetails, ReasonableAdjustmentsSupport } from '../../../app/case/definition';
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
} from '../../../steps/constants';

export const prepareSupportYouNeedDuringCaseRequest = (userCase: CaseWithId): ReasonableAdjustmentsSupport => {
  const {
    attendingToCourt,
    hearingDetails,
    helpCommunication,
    describeOtherNeed,
    signLanguageDetails,
    courtComfort,
    lightingProvideDetails,
    otherProvideDetails,
    courtHearing,
    supportWorkerDetails,
    therapyDetails,
    familyProviderDetails,
    communicationSupportOther,
    docsSupport,
    docsDetails,
    largePrintDetails,
    otherDetails,
    languageRequirements,
    languageDetails,
    reasonableAdjustments,
    safetyArrangements,
    safetyArrangementsDetails,
    travellingToCourt,
    parkingDetails,
    differentChairDetails,
    travellingOtherDetails,
  } = userCase;

  const request: ReasonableAdjustmentsSupport = {};
  Object.assign(request, {
    attendingToCourt,
    hearingDetails,
    helpCommunication,
    describeOtherNeed,
    signLanguageDetails,
    courtComfort,
    lightingDetails: lightingProvideDetails,
    otherProvideDetails,
    courtHearing,
    supportWorkerDetails,
    therapyDetails,
    familyProviderDetails,
    communicationSupportOther,
    docsSupport,
    docsDetails,
    largePrintDetails,
    otherDetails,
    languageRequirements,
    languageDetails,
    reasonableAdjustments,
    safetyArrangements,
    safetyArrangementsDetails,
    travellingToCourt,
    parkingDetails,
    differentChairDetails,
    travellingOtherDetails,
  });

  // data cleanup
  if (!attendingToCourt?.includes(NO_HEARINGS)) {
    delete request.hearingDetails;
  }

  if (!languageRequirements?.includes(LANGUAGE_INTERPRETER)) {
    delete request.languageDetails;
  }

  if (!safetyArrangements?.includes(OTHER)) {
    delete request.safetyArrangementsDetails;
  }

  // doing a loop over reasonableAdjustments array and checking what's selected from the checkbox
  if (Array.isArray(reasonableAdjustments)) {
    if (!reasonableAdjustments.includes(DOCS_FORMAT)) {
      delete request.docsDetails;
      delete request.largePrintDetails;
      delete request.otherDetails;
    }

    if (!reasonableAdjustments.includes(COMM_HELP)) {
      delete request.signLanguageDetails;
      delete request.describeOtherNeed;
    }

    if (!reasonableAdjustments.includes(HEARING_SUPPORT)) {
      delete request.supportWorkerDetails;
      delete request.familyProviderDetails;
      delete request.therapyDetails;
      delete request.communicationSupportOther;
    }

    if (!reasonableAdjustments.includes(HEARING_COMFORT)) {
      delete request.lightingDetails;
      delete request.otherProvideDetails;
    }

    if (!reasonableAdjustments.includes(TRAVELLING_HELP)) {
      delete request.parkingDetails;
      delete request.differentChairDetails;
      delete request.travellingOtherDetails;
    }
  }

  // looping over docsSupport array
  dataCleanupDocSupport(docsSupport, request);

  // looping over helpCommunication array
  dataCleanupCommunication(helpCommunication, request);

  // looping over courtHearing array
  dataCleanupHearing(courtHearing, request);

  // looping over courtComfort array
  dataCleanupComfort(courtComfort, request);

  // looping over travellingToCourt array
  dataCleanupTravel(travellingToCourt, request);

  return request;
};

export const mapSupportYouNeedDetails = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const supportYouNeed = {};
  const {
    helpCommunication,
    describeOtherNeed,
    courtComfort,
    otherProvideDetails,
    courtHearing,
    communicationSupportOther,
    docsSupport,
    otherDetails,
    languageRequirements,
    describeSignLanguageDetails,
    reasonableAdjustments,
    safetyArrangements,
    safetyArrangementsDetails,
    travellingToCourt,
    travellingOtherDetails,
    attendingToCourt,
    hearingDetails,
    signLanguageDetails,
    lightingDetails,
    supportWorkerDetails,
    familyProviderDetails,
    therapyDetails,
    docsDetails,
    largePrintDetails,
    parkingDetails,
    differentChairDetails,
    languageDetails,
  } = partyDetails?.response?.supportYouNeed ?? {};

  Object.assign(supportYouNeed, {
    helpCommunication,
    describeOtherNeed,
    courtComfort,
    otherProvideDetails,
    courtHearing,
    communicationSupportOther,
    docsSupport,
    otherDetails,
    languageRequirements,
    describeSignLanguageDetails,
    reasonableAdjustments,
    safetyArrangements,
    safetyArrangementsDetails,
    travellingToCourt,
    travellingOtherDetails,
    attendingToCourt,
    hearingDetails,
    signLanguageDetails,
    lightingProvideDetails: lightingDetails,
    supportWorkerDetails,
    familyProviderDetails,
    therapyDetails,
    docsDetails,
    largePrintDetails,
    parkingDetails,
    differentChairDetails,
    languageDetails,
  });

  return supportYouNeed;
};
function dataCleanupTravel(travellingToCourt: string[] | undefined, request: ReasonableAdjustmentsSupport) {
  if (Array.isArray(travellingToCourt)) {
    if (!travellingToCourt?.includes(PARKING_SPACE)) {
      delete request.parkingDetails;
    }
    if (!travellingToCourt?.includes(DIFFERENT_CHAIR)) {
      delete request.differentChairDetails;
    }
    if (!travellingToCourt?.includes(OTHER)) {
      delete request.travellingOtherDetails;
    }
  }
}

function dataCleanupComfort(courtComfort: string[] | undefined, request: ReasonableAdjustmentsSupport) {
  if (Array.isArray(courtComfort)) {
    if (!courtComfort?.includes(APPROPRIATE_LIGHTING)) {
      delete request.lightingDetails;
    }
    if (!courtComfort?.includes(OTHER)) {
      delete request.otherProvideDetails;
    }
  }
}

function dataCleanupHearing(courtHearing: string[] | undefined, request: ReasonableAdjustmentsSupport) {
  if (Array.isArray(courtHearing)) {
    if (!courtHearing?.includes(SUPPORT_WORKER)) {
      delete request.supportWorkerDetails;
    }
    if (!courtHearing?.includes(FAMILY_MEMBER)) {
      delete request.familyProviderDetails;
    }
    if (!courtHearing?.includes(ANIMAL)) {
      delete request.therapyDetails;
    }
    if (!courtHearing?.includes(OTHER)) {
      delete request.communicationSupportOther;
    }
  }
}

function dataCleanupCommunication(helpCommunication: string[] | undefined, request: ReasonableAdjustmentsSupport) {
  if (Array.isArray(helpCommunication)) {
    if (!helpCommunication?.includes(SIGN_LANGUAGE)) {
      delete request.signLanguageDetails;
    }
    if (!helpCommunication?.includes(OTHER)) {
      delete request.describeOtherNeed;
    }
  }
}

function dataCleanupDocSupport(docsSupport: string[] | undefined, request: ReasonableAdjustmentsSupport) {
  if (Array.isArray(docsSupport)) {
    if (!docsSupport?.includes(DOCS_PRINT)) {
      delete request.docsDetails;
    }
    if (!docsSupport?.includes(LARGE_PRINT_DOCS)) {
      delete request.largePrintDetails;
    }
    if (!docsSupport?.includes(OTHER)) {
      delete request.otherDetails;
    }
  }
}
