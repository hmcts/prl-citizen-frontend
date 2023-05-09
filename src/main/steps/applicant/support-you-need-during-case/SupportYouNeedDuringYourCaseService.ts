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

export const prepareRequest = (userCase: CaseWithId): ReasonableAdjustmentsSupport => {
  const {
    attendingToCourt,
    hearingDetails,
    helpCommunication,
    describeOtherNeed,
    describeSignLanguageDetails,
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
    describeSignLanguageDetails,
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
      delete request.describeSignLanguageDetails;
      delete request.describeOtherNeed;
    }

    if (!reasonableAdjustments.includes(HEARING_SUPPORT)) {
      delete request.supportWorkerDetails;
      delete request.familyProviderDetails;
      delete request.therapyDetails;
      delete request.communicationSupportOther;
    }

    if (!reasonableAdjustments.includes(HEARING_COMFORT)) {
      delete request.lightingProvideDetails;
      delete request.otherProvideDetails;
    }

    if (!reasonableAdjustments.includes(TRAVELLING_HELP)) {
      delete request.parkingDetails;
      delete request.differentChairDetails;
      delete request.travellingOtherDetails;
    }
  }

  // looping over docsSupport array
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

  // looping over helpCommunication array
  if (Array.isArray(helpCommunication)) {
    if (!helpCommunication?.includes(SIGN_LANGUAGE)) {
      delete request.describeSignLanguageDetails;
    }
    if (!helpCommunication?.includes(OTHER)) {
      delete request.describeOtherNeed;
    }
  }

  // looping over courtHearing array
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

  // looping over courtComfort array
  if (Array.isArray(courtComfort)) {
    if (!courtComfort?.includes(APPROPRIATE_LIGHTING)) {
      delete request.lightingProvideDetails;
    }
    if (!courtComfort?.includes(OTHER)) {
      delete request.otherProvideDetails;
    }
  }

  // looping over travellingToCourt array
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
    lightingProvideDetails,
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
    helpCommunication: helpCommunication,
    describeOtherNeed: describeOtherNeed,
    courtComfort: courtComfort,
    otherProvideDetails: otherProvideDetails,
    courtHearing: courtHearing,
    communicationSupportOther: communicationSupportOther,
    docsSupport: docsSupport,
    otherDetails: otherDetails,
    languageRequirements: languageRequirements,
    describeSignLanguageDetails: describeSignLanguageDetails,
    reasonableAdjustments: reasonableAdjustments,
    safetyArrangements: safetyArrangements,
    safetyArrangementsDetails: safetyArrangementsDetails,
    travellingToCourt: travellingToCourt,
    travellingOtherDetails: travellingOtherDetails,
    attendingToCourt: attendingToCourt,
    hearingDetails: hearingDetails,
    signLanguageDetails: signLanguageDetails,
    lightingProvideDetails: lightingProvideDetails,
    supportWorkerDetails: supportWorkerDetails,
    familyProviderDetails: familyProviderDetails,
    therapyDetails: therapyDetails,
    docsDetails: docsDetails,
    largePrintDetails: largePrintDetails,
    parkingDetails: parkingDetails,
    differentChairDetails: differentChairDetails,
    languageDetails: languageDetails,
  });

  return supportYouNeed;
};
